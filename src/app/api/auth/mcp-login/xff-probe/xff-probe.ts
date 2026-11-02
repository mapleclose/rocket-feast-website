/**
 * One-time measurement of X-Forwarded-For at this server, to choose
 * MCP_LOGIN_CLIENT_IP_XFF_HOPS. Delete this route in the same change that sets the value.
 *
 * Amplify hosts this site with no staging copy, and this app has no service role, so its
 * server logs go nowhere. The answer therefore goes back to the caller, who is the only
 * person whose address is involved. The response holds positions and booleans, never an
 * address, and nothing is logged.
 *
 * Positions count from the right, starting at 1, which is what the setting counts.
 * - callerFromRight: where the IP the caller says is theirs was found.
 * - sentinelFromRight: where XFF_PROBE_SENTINEL was found, when the caller sends it as
 *   their own X-Forwarded-For. It sits one left of the first trusted entry, or is absent
 *   if the platform discards what clients send.
 */
import { isIP } from "node:net";
import { CLIENT_IP_SECRET_MIN_LENGTH, type ResolveClientIpSecret } from "../mcp-login-proxy";

/** From TEST-NET-3 (RFC 5737), so it can never be a real client. */
export const XFF_PROBE_SENTINEL = "203.0.113.77";

type Env = Record<string, string | undefined>;

export interface XffProbeOptions {
    env: Env;
    resolveSecret: ResolveClientIpSecret;
}

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}

/** 1-based position from the right of the rightmost match: entries further left are client-supplied. */
function positionFromRight(entries: string[], target: string | null): number | null {
    if (!target) return null;
    const index = entries.lastIndexOf(target);
    return index === -1 ? null : entries.length - index;
}

async function requestedCaller(request: Request): Promise<unknown> {
    try {
        const body: unknown = await request.json();
        return typeof body === "object" && body !== null ? (body as { caller?: unknown }).caller : undefined;
    } catch {
        return undefined;
    }
}

export async function handleXffProbe(request: Request, { env, resolveSecret }: XffProbeOptions): Promise<Response> {
    const caller = await requestedCaller(request);
    if (caller !== undefined && (typeof caller !== "string" || isIP(caller) === 0)) {
        return json({ error: "caller must be an IP address" }, 400);
    }

    const header = request.headers.get("x-forwarded-for");
    const entries = header ? header.split(",").map((entry) => entry.trim()) : [];
    const hops = env.MCP_LOGIN_CLIENT_IP_XFF_HOPS?.trim();
    const secret = await resolveSecret(env);

    return json({
        entries: entries.length,
        callerFromRight: positionFromRight(entries, caller ?? null),
        sentinelFromRight: positionFromRight(entries, XFF_PROBE_SENTINEL),
        hopsConfigured: hops ? Number(hops) : null,
        runtimeConfigLoaded: Boolean(env.MCP_LOGIN_CLIENT_IP_SECRET_ID),
        signing: Boolean(secret && secret.length >= CLIENT_IP_SECRET_MIN_LENGTH),
        viewerAddressHeader: request.headers.has("cloudfront-viewer-address"),
    });
}
