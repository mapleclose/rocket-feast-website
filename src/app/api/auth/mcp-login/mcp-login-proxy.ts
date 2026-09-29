/**
 * Server-side proxy from the rocketfeast.com login page to the MCP `/login` endpoint.
 *
 * The MCP OAuth flow sends staff to `rocketfeast.com/login?state=…&mcp_url=…`. The page
 * posts the email, password and OTP here, and this proxy posts them to the MCP. Because
 * `mcp_url` arrives from the browser, it is only a *selector*: it must name one of the
 * origins in the server-side allow-list, and the request always goes to that allow-listed
 * origin's `/login`. Anything else is answered 400 before a single byte leaves the server,
 * so a link on the real domain cannot send credentials to another host.
 *
 * Also handled here:
 * - Known-device cookie (rocket-feast-mcp#153): only `__Host-rf_mcp_device` is forwarded
 *   to the MCP as `Cookie`, and only the MCP's `Set-Cookie` for that name is relayed back.
 * - Status passthrough: the MCP's status, body and `Retry-After` (429/403 etc.) are relayed.
 * - Signed client IP (optional, `MCP_LOGIN_CLIENT_IP_SECRET`): lets the MCP key its login
 *   rate limit on the browser's IP instead of this server's. See CLIENT_IP_HEADERS.
 *
 * Never log cookies, credentials, tokens or the signing secret.
 */
import { createHmac } from "node:crypto";
import { isIP } from "node:net";

export const DEFAULT_ALLOWED_ORIGINS = ["https://mcp.rocketfeast.com", "https://staging-mcp.rocketfeast.com"];

/** Set by the MCP after a full sign-in (rocket-feast-mcp#153). `__Host-`: Secure, Path=/, no Domain. */
export const KNOWN_DEVICE_COOKIE = "__Host-rf_mcp_device";
/** Same shape check as the MCP and API (`rfkd1.<b64url>.<b64url>`, at most 512 characters). */
const DEVICE_TOKEN_SHAPE = /^rfkd1\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;
const DEVICE_TOKEN_MAX_LENGTH = 512;

/**
 * Signed client-IP headers. The MCP must trust them only when the HMAC verifies with the
 * shared secret and the timestamp is fresh; otherwise it keys on the connection IP as today.
 * signature = hex(HMAC-SHA256(secret, `rf-mcp-login-client-ip:v1:${timestamp}:${ip}`)).
 */
export const CLIENT_IP_HEADERS = {
    ip: "x-rf-login-client-ip",
    timestamp: "x-rf-login-client-ip-ts",
    signature: "x-rf-login-client-ip-sig",
} as const;
const CLIENT_IP_SIGNATURE_CONTEXT = "rf-mcp-login-client-ip:v1";
const CLIENT_IP_SECRET_MIN_LENGTH = 32;

const FORWARDED_FIELDS = ["email", "password", "otp", "step1_token", "state"] as const;
const UPSTREAM_TIMEOUT_MS = 15_000;
/** Schemes that run script when assigned to `window.location.href`. */
const SCRIPT_SCHEMES = new Set(["javascript:", "data:", "vbscript:", "blob:", "file:"]);

type Env = Record<string, string | undefined>;
type FetchLike = (input: string, init: RequestInit) => Promise<Response>;

export interface McpLoginOptions {
    env?: Env;
    fetch?: FetchLike;
    now?: () => number;
}

/** Exact origins from a comma-separated env value; the production and staging MCPs when unset. */
export function parseAllowedOrigins(raw: string | undefined): string[] {
    if (!raw || raw.trim() === "") return [...DEFAULT_ALLOWED_ORIGINS];
    const origins: string[] = [];
    for (const entry of raw.split(",")) {
        const origin = exactOrigin(entry.trim());
        if (origin && !origins.includes(origin)) origins.push(origin);
    }
    return origins;
}

/** The origin of `value` if it is a bare http(s) origin (optionally with a trailing slash), else null. */
function exactOrigin(value: unknown): string | null {
    if (typeof value !== "string" || value === "") return null;
    let url: URL;
    try {
        url = new URL(value);
    } catch {
        return null;
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (url.username || url.password || url.pathname !== "/" || url.search || url.hash) return null;
    // Reject inputs whose raw text has extra parts that URL parsing drops (e.g. a bare "?" or "#").
    if (!/^[a-z][a-z0-9+.-]*:\/\/[^/?#@]+\/?$/i.test(value)) return null;
    return url.origin;
}

function json(body: unknown, status: number, headers?: Headers): Response {
    const h = headers ?? new Headers();
    h.set("Content-Type", "application/json");
    h.set("Cache-Control", "no-store");
    return new Response(JSON.stringify(body), { status, headers: h });
}

function knownDeviceCookie(cookieHeader: string | null): string | null {
    if (!cookieHeader) return null;
    for (const part of cookieHeader.split(";")) {
        const eq = part.indexOf("=");
        if (eq === -1 || part.slice(0, eq).trim() !== KNOWN_DEVICE_COOKIE) continue;
        const value = part.slice(eq + 1).trim();
        if (value.length <= DEVICE_TOKEN_MAX_LENGTH && DEVICE_TOKEN_SHAPE.test(value)) return `${KNOWN_DEVICE_COOKIE}=${value}`;
    }
    return null;
}

function isKnownDeviceSetCookie(setCookie: string): boolean {
    const eq = setCookie.indexOf("=");
    return eq !== -1 && setCookie.slice(0, eq).trim() === KNOWN_DEVICE_COOKIE;
}

/**
 * The client IP as seen by the Nth-from-right X-Forwarded-For entry, where N is the number
 * of proxies in front of this server that append to it (MCP_LOGIN_CLIENT_IP_XFF_HOPS,
 * default 1). Entries further left are client-supplied and never trusted.
 */
function clientIp(request: Request, env: Env): string | null {
    const hopsRaw = env.MCP_LOGIN_CLIENT_IP_XFF_HOPS?.trim() || "1";
    if (!/^[1-9]$/.test(hopsRaw)) return null;
    const hops = Number(hopsRaw);
    const xff = request.headers.get("x-forwarded-for");
    if (!xff) return null;
    const entries = xff.split(",").map((entry) => entry.trim());
    if (entries.length < hops) return null;
    const candidate = entries[entries.length - hops];
    return isIP(candidate) ? candidate : null;
}

function signedClientIpHeaders(request: Request, env: Env, now: () => number): Record<string, string> {
    const secret = env.MCP_LOGIN_CLIENT_IP_SECRET;
    if (!secret || secret.length < CLIENT_IP_SECRET_MIN_LENGTH) return {};
    const ip = clientIp(request, env);
    if (!ip) return {};
    const timestamp = String(Math.floor(now() / 1000));
    const signature = createHmac("sha256", secret).update(`${CLIENT_IP_SIGNATURE_CONTEXT}:${timestamp}:${ip}`).digest("hex");
    return { [CLIENT_IP_HEADERS.ip]: ip, [CLIENT_IP_HEADERS.timestamp]: timestamp, [CLIENT_IP_HEADERS.signature]: signature };
}

/** A redirect the login page may assign to `window.location.href`: absolute, and not a script scheme. */
function isSafeRedirect(value: unknown): boolean {
    if (typeof value !== "string" || value.trim() !== value || value === "") return false;
    let url: URL;
    try {
        url = new URL(value);
    } catch {
        return false;
    }
    return !SCRIPT_SCHEMES.has(url.protocol);
}

export async function handleMcpLogin(request: Request, options: McpLoginOptions = {}): Promise<Response> {
    const env = options.env ?? process.env;
    const fetchImpl: FetchLike = options.fetch ?? ((input, init) => fetch(input, init));
    const now = options.now ?? Date.now;

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return json({ error: "Invalid request" }, 400);
    }
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
        return json({ error: "Invalid request" }, 400);
    }
    const input = body as Record<string, unknown>;

    const requestedOrigin = exactOrigin(input.mcp_url);
    const allowedOrigins = parseAllowedOrigins(env.MCP_LOGIN_ALLOWED_ORIGINS);
    if (!requestedOrigin || !allowedOrigins.includes(requestedOrigin)) {
        console.warn("[mcp-login] rejected mcp_url that is not an allowed MCP origin");
        return json({ error: "This sign-in link is not valid. Start the connection again from your MCP client." }, 400);
    }

    const payload: Record<string, string> = {};
    for (const field of FORWARDED_FIELDS) {
        if (typeof input[field] === "string") payload[field] = input[field];
    }

    const headers: Record<string, string> = { "Content-Type": "application/json", Accept: "application/json" };
    const deviceCookie = knownDeviceCookie(request.headers.get("cookie"));
    if (deviceCookie) headers.Cookie = deviceCookie;
    Object.assign(headers, signedClientIpHeaders(request, env, now));

    let upstream: Response;
    try {
        upstream = await fetchImpl(new URL("/login", requestedOrigin).toString(), {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
            redirect: "manual",
            cache: "no-store",
            signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        });
    } catch {
        console.warn("[mcp-login] MCP request failed");
        return json({ error: "Failed to connect to MCP server" }, 502);
    }

    if (upstream.type === "opaqueredirect" || (upstream.status >= 300 && upstream.status < 400)) {
        console.warn("[mcp-login] MCP answered with a redirect; not following", { status: upstream.status });
        return json({ error: "Failed to connect to MCP server" }, 502);
    }

    let data: unknown;
    try {
        data = await upstream.json();
    } catch {
        console.warn("[mcp-login] MCP answered with a non-JSON body", { status: upstream.status });
        return json({ error: "Failed to connect to MCP server" }, 502);
    }

    if (data && typeof data === "object" && "redirect" in data && !isSafeRedirect((data as { redirect: unknown }).redirect)) {
        console.warn("[mcp-login] MCP answered with an unsafe redirect; not relaying it");
        return json({ error: "Failed to connect to MCP server" }, 502);
    }

    const responseHeaders = new Headers();
    const retryAfter = upstream.headers.get("retry-after");
    if (retryAfter) responseHeaders.set("Retry-After", retryAfter);
    for (const setCookie of upstream.headers.getSetCookie()) {
        if (isKnownDeviceSetCookie(setCookie)) responseHeaders.append("Set-Cookie", setCookie);
    }
    return json(data, upstream.status, responseHeaders);
}
