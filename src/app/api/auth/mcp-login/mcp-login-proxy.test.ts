import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CLIENT_IP_HEADERS, KNOWN_DEVICE_COOKIE, handleMcpLogin, parseAllowedOrigins } from "./mcp-login-proxy";

const PROD_MCP = "https://mcp.rocketfeast.com";
const STAGING_MCP = "https://staging-mcp.rocketfeast.com";
const DEVICE_TOKEN = "rfkd1.eyJ2IjoxfQ.c2lnbmF0dXJl";
const DEVICE_SET_COOKIE = `${KNOWN_DEVICE_COOKIE}=${DEVICE_TOKEN}; Max-Age=7776000; Path=/; Expires=Sun, 28 Dec 2026 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax`;
const CLIENT_IP_SECRET = "0123456789abcdef0123456789abcdef-test-only";

type FetchArgs = [string, RequestInit];

function loginRequest(body: unknown, headers: Record<string, string> = {}): Request {
    return new Request("https://rocketfeast.com/api/auth/mcp-login", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: typeof body === "string" ? body : JSON.stringify(body),
    });
}

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> | [string, string][] = {}): Response {
    const h = new Headers(headers);
    h.set("Content-Type", "application/json");
    return new Response(JSON.stringify(body), { status, headers: h });
}

function mockFetch(response: Response | (() => Promise<Response>)) {
    return vi.fn(async (..._args: FetchArgs) => (typeof response === "function" ? response() : response));
}

function sentHeaders(fetchImpl: ReturnType<typeof mockFetch>): Headers {
    return new Headers(fetchImpl.mock.calls[0][1].headers);
}

const credentials = { email: "staff@example.com", password: "correct horse", state: "state-1" };

afterEach(() => {
    vi.restoreAllMocks();
});

describe("mcp_url allow-list", () => {
    it("rejects the phishing attack URL with 400 and never contacts it", async () => {
        const fetchImpl = mockFetch(jsonResponse({ redirect: "https://evil.example/cb" }));
        const res = await handleMcpLogin(loginRequest({ ...credentials, mcp_url: "https://attacker.example" }), { env: {}, fetch: fetchImpl });

        expect(res.status).toBe(400);
        expect(fetchImpl).not.toHaveBeenCalled();
        const body = await res.json();
        expect(JSON.stringify(body)).not.toContain("correct horse");
    });

    it.each([
        ["look-alike host", "https://mcp.rocketfeast.com.attacker.example"],
        ["userinfo trick", "https://mcp.rocketfeast.com@attacker.example"],
        ["credentials in URL", "https://user:pass@mcp.rocketfeast.com"],
        ["http downgrade", "http://mcp.rocketfeast.com"],
        ["other port", "https://mcp.rocketfeast.com:8443"],
        ["path suffix", "https://mcp.rocketfeast.com/evil"],
        ["query", "https://mcp.rocketfeast.com?x=1"],
        ["fragment", "https://mcp.rocketfeast.com#x"],
        ["internal metadata", "http://169.254.169.254"],
        ["localhost", "http://localhost:3100"],
        ["not a URL", "mcp.rocketfeast.com"],
        ["javascript scheme", "javascript:alert(1)"],
        ["non-string", 42],
        ["missing", undefined],
    ])("rejects %s with 400", async (_label, mcpUrl) => {
        const fetchImpl = mockFetch(jsonResponse({}));
        const res = await handleMcpLogin(loginRequest({ ...credentials, mcp_url: mcpUrl }), { env: {}, fetch: fetchImpl });

        expect(res.status).toBe(400);
        expect(fetchImpl).not.toHaveBeenCalled();
    });

    it.each([
        ["production", PROD_MCP, `${PROD_MCP}/login`],
        ["production with trailing slash", `${PROD_MCP}/`, `${PROD_MCP}/login`],
        ["production, upper-case host", "https://MCP.RocketFeast.com", `${PROD_MCP}/login`],
        ["staging", STAGING_MCP, `${STAGING_MCP}/login`],
    ])("allows the default %s origin", async (_label, mcpUrl, expectedTarget) => {
        const fetchImpl = mockFetch(jsonResponse({ needs_otp: true, step1_token: "s1" }));
        const res = await handleMcpLogin(loginRequest({ ...credentials, mcp_url: mcpUrl }), { env: {}, fetch: fetchImpl });

        expect(res.status).toBe(200);
        expect(fetchImpl).toHaveBeenCalledTimes(1);
        expect(fetchImpl.mock.calls[0][0]).toBe(expectedTarget);
        expect(await res.json()).toEqual({ needs_otp: true, step1_token: "s1" });
    });

    it("uses MCP_LOGIN_ALLOWED_ORIGINS instead of the defaults when set", async () => {
        const env = { MCP_LOGIN_ALLOWED_ORIGINS: " https://mcp.example.test , not a url " };
        const allowed = mockFetch(jsonResponse({}));
        expect((await handleMcpLogin(loginRequest({ ...credentials, mcp_url: "https://mcp.example.test" }), { env, fetch: allowed })).status).toBe(200);

        const prod = mockFetch(jsonResponse({}));
        expect((await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }), { env, fetch: prod })).status).toBe(400);
        expect(prod).not.toHaveBeenCalled();
    });

    it("parses only exact origins from the env list", () => {
        expect(parseAllowedOrigins(undefined)).toEqual([PROD_MCP, STAGING_MCP]);
        expect(parseAllowedOrigins("")).toEqual([PROD_MCP, STAGING_MCP]);
        expect(parseAllowedOrigins("https://a.test/path, http://b.test:8080, ftp://c.test, junk")).toEqual(["http://b.test:8080"]);
    });

    it("forwards only the known login fields, as JSON", async () => {
        const fetchImpl = mockFetch(jsonResponse({}));
        await handleMcpLogin(loginRequest({ otp: "123456", step1_token: "s1", state: "st", mcp_url: PROD_MCP, extra: "x", email: 5 }), {
            env: {},
            fetch: fetchImpl,
        });

        const init = fetchImpl.mock.calls[0][1];
        expect(init.method).toBe("POST");
        expect(JSON.parse(init.body as string)).toEqual({ otp: "123456", step1_token: "s1", state: "st" });
        expect(sentHeaders(fetchImpl).get("content-type")).toBe("application/json");
    });

    it("rejects a body that is not a JSON object with 400", async () => {
        const fetchImpl = mockFetch(jsonResponse({}));
        expect((await handleMcpLogin(loginRequest("not json"), { env: {}, fetch: fetchImpl })).status).toBe(400);
        expect((await handleMcpLogin(loginRequest("[1]"), { env: {}, fetch: fetchImpl })).status).toBe(400);
        expect(fetchImpl).not.toHaveBeenCalled();
    });
});

describe("upstream call", () => {
    it("never follows redirects", async () => {
        const fetchImpl = mockFetch(jsonResponse({}));
        await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }), { env: {}, fetch: fetchImpl });
        expect(fetchImpl.mock.calls[0][1].redirect).toBe("manual");
    });

    it("answers 502 when the MCP answers with a redirect", async () => {
        const fetchImpl = mockFetch(new Response(null, { status: 307, headers: { Location: "https://attacker.example/login" } }));
        const res = await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }), { env: {}, fetch: fetchImpl });
        expect(res.status).toBe(502);
    });

    it("answers 502 when the MCP is unreachable or answers non-JSON", async () => {
        const down = vi.fn(async () => {
            throw new TypeError("fetch failed");
        });
        expect((await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }), { env: {}, fetch: down })).status).toBe(502);

        const html = mockFetch(new Response("<html>bad gateway</html>", { status: 200 }));
        expect((await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }), { env: {}, fetch: html })).status).toBe(502);
    });

    it("answers 502 instead of relaying a script redirect", async () => {
        for (const redirect of ["javascript:alert(document.cookie)", " JavaScript:alert(1)", "data:text/html,<script>1</script>", "vbscript:x", "/relative"]) {
            const fetchImpl = mockFetch(jsonResponse({ redirect }));
            const res = await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }), { env: {}, fetch: fetchImpl });
            expect(res.status, redirect).toBe(502);
        }
    });

    it("relays OAuth client redirects, including native-app schemes", async () => {
        for (const redirect of [
            "https://claude.ai/api/mcp/auth_callback?code=c&state=s",
            "http://127.0.0.1:33418/callback?code=c",
            "cursor://anysphere.cursor-mcp/oauth/callback?code=c",
        ]) {
            const fetchImpl = mockFetch(jsonResponse({ redirect }));
            const res = await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }), { env: {}, fetch: fetchImpl });
            expect(res.status, redirect).toBe(200);
            expect(await res.json()).toEqual({ redirect });
        }
    });

    it("marks responses as not cacheable", async () => {
        const fetchImpl = mockFetch(jsonResponse({ needs_otp: true }));
        const res = await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }), { env: {}, fetch: fetchImpl });
        expect(res.headers.get("cache-control")).toBe("no-store");
    });
});

describe("status passthrough", () => {
    it("passes a 429 through with its Retry-After and body", async () => {
        const body = { error: "Too many sign-in attempts. Please try again in 9 minutes.", code: "RATE_LIMITED", retry_after_seconds: 540 };
        const fetchImpl = mockFetch(jsonResponse(body, 429, { "Retry-After": "540", "X-Internal": "nope" }));
        const res = await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }), { env: {}, fetch: fetchImpl });

        expect(res.status).toBe(429);
        expect(res.headers.get("retry-after")).toBe("540");
        expect(res.headers.get("x-internal")).toBeNull();
        expect(await res.json()).toEqual(body);
    });

    it("passes a 403 through with its Retry-After and body", async () => {
        const body = { error: "Account not activated", code: "ACCOUNT_NOT_ACTIVATED" };
        const fetchImpl = mockFetch(jsonResponse(body, 403, { "Retry-After": "Wed, 30 Sep 2026 07:28:00 GMT" }));
        const res = await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }), { env: {}, fetch: fetchImpl });

        expect(res.status).toBe(403);
        expect(res.headers.get("retry-after")).toBe("Wed, 30 Sep 2026 07:28:00 GMT");
        expect(await res.json()).toEqual(body);
    });

    it.each([401, 400, 502])("passes a %i through with its body", async (status) => {
        const fetchImpl = mockFetch(jsonResponse({ error: "nope" }, status));
        const res = await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }), { env: {}, fetch: fetchImpl });
        expect(res.status).toBe(status);
        expect(await res.json()).toEqual({ error: "nope" });
    });
});

describe("known-device cookie", () => {
    it("forwards only the known-device cookie to the MCP", async () => {
        const fetchImpl = mockFetch(jsonResponse({}));
        await handleMcpLogin(
            loginRequest({ ...credentials, mcp_url: PROD_MCP }, { Cookie: `_ga=GA1.1; session=secret; ${KNOWN_DEVICE_COOKIE}=${DEVICE_TOKEN}; theme=dark` }),
            { env: {}, fetch: fetchImpl },
        );
        expect(sentHeaders(fetchImpl).get("cookie")).toBe(`${KNOWN_DEVICE_COOKIE}=${DEVICE_TOKEN}`);
    });

    it("sends no Cookie without the known-device cookie, or with a malformed one", async () => {
        for (const cookie of [
            undefined,
            "session=secret",
            `${KNOWN_DEVICE_COOKIE}=not-a-token`,
            `rf_mcp_device=${DEVICE_TOKEN}`,
            `${KNOWN_DEVICE_COOKIE}=rfkd1.${"a".repeat(600)}.b`,
        ]) {
            const fetchImpl = mockFetch(jsonResponse({}));
            await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }, cookie ? { Cookie: cookie } : {}), { env: {}, fetch: fetchImpl });
            expect(sentHeaders(fetchImpl).has("cookie"), String(cookie)).toBe(false);
        }
    });

    it("relays the MCP's known-device Set-Cookie unchanged and drops any other", async () => {
        const fetchImpl = mockFetch(
            jsonResponse({ redirect: "https://claude.ai/api/mcp/auth_callback?code=c" }, 200, [
                ["Set-Cookie", "other=1; Path=/; HttpOnly"],
                ["Set-Cookie", DEVICE_SET_COOKIE],
                ["Set-Cookie", `${KNOWN_DEVICE_COOKIE}x=1; Path=/`],
            ]),
        );
        const res = await handleMcpLogin(loginRequest({ otp: "123456", step1_token: "s1", state: "st", mcp_url: PROD_MCP }), { env: {}, fetch: fetchImpl });

        expect(res.status).toBe(200);
        expect(res.headers.getSetCookie()).toEqual([DEVICE_SET_COOKIE]);
    });

    it("relays the known-device Set-Cookie on an error status too", async () => {
        const fetchImpl = mockFetch(jsonResponse({ error: "x" }, 429, [["Set-Cookie", DEVICE_SET_COOKIE]]));
        const res = await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }), { env: {}, fetch: fetchImpl });
        expect(res.headers.getSetCookie()).toEqual([DEVICE_SET_COOKIE]);
    });

    it("never logs cookies or credentials", async () => {
        const logged: unknown[] = [];
        for (const level of ["log", "info", "warn", "error", "debug"] as const) {
            vi.spyOn(console, level).mockImplementation((...args: unknown[]) => void logged.push(args));
        }
        const cookieHeader = { Cookie: `${KNOWN_DEVICE_COOKIE}=${DEVICE_TOKEN}` };
        const flows: Array<[unknown, Parameters<typeof mockFetch>[0]]> = [
            [{ ...credentials, mcp_url: "https://attacker.example" }, jsonResponse({})],
            [{ ...credentials, mcp_url: PROD_MCP }, jsonResponse({ ok: true }, 200, [["Set-Cookie", DEVICE_SET_COOKIE]])],
            [{ ...credentials, mcp_url: PROD_MCP }, jsonResponse({ error: "x" }, 429)],
            [{ ...credentials, mcp_url: PROD_MCP }, () => Promise.reject(new Error(`boom ${DEVICE_TOKEN} correct horse`))],
            [{ ...credentials, mcp_url: PROD_MCP }, jsonResponse({ redirect: "javascript:1" })],
        ];
        for (const [body, response] of flows) {
            await handleMcpLogin(loginRequest(body, cookieHeader), { env: { MCP_LOGIN_CLIENT_IP_SECRET: CLIENT_IP_SECRET }, fetch: mockFetch(response) });
        }

        const text = JSON.stringify(logged);
        for (const secret of [DEVICE_TOKEN, "correct horse", "staff@example.com", CLIENT_IP_SECRET]) {
            expect(text).not.toContain(secret);
        }
    });
});

describe("signed client IP (behind MCP_LOGIN_CLIENT_IP_SECRET)", () => {
    const NOW = 1_790_000_000_000;

    function sign(ip: string, ts: string) {
        return createHmac("sha256", CLIENT_IP_SECRET).update(`rf-mcp-login-client-ip:v1:${ts}:${ip}`).digest("hex");
    }

    it("sends no client-IP headers when the secret is not configured", async () => {
        const fetchImpl = mockFetch(jsonResponse({}));
        await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }, { "X-Forwarded-For": "203.0.113.7" }), { env: {}, fetch: fetchImpl });
        const headers = sentHeaders(fetchImpl);
        for (const name of Object.values(CLIENT_IP_HEADERS)) expect(headers.has(name)).toBe(false);
        expect(headers.has("x-forwarded-for")).toBe(false);
    });

    it("sends no client-IP headers when the secret is too short to be safe", async () => {
        const fetchImpl = mockFetch(jsonResponse({}));
        await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }, { "X-Forwarded-For": "203.0.113.7" }), {
            env: { MCP_LOGIN_CLIENT_IP_SECRET: "short" },
            fetch: fetchImpl,
        });
        expect(sentHeaders(fetchImpl).has(CLIENT_IP_HEADERS.ip)).toBe(false);
    });

    it("signs the right-most X-Forwarded-For entry by default, ignoring client-supplied entries", async () => {
        const fetchImpl = mockFetch(jsonResponse({}));
        await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }, { "X-Forwarded-For": "1.1.1.1, 198.51.100.4, 203.0.113.7" }), {
            env: { MCP_LOGIN_CLIENT_IP_SECRET: CLIENT_IP_SECRET },
            fetch: fetchImpl,
            now: () => NOW,
        });
        const headers = sentHeaders(fetchImpl);
        const ts = String(Math.floor(NOW / 1000));
        expect(headers.get(CLIENT_IP_HEADERS.ip)).toBe("203.0.113.7");
        expect(headers.get(CLIENT_IP_HEADERS.timestamp)).toBe(ts);
        expect(headers.get(CLIENT_IP_HEADERS.signature)).toBe(sign("203.0.113.7", ts));
    });

    it("counts trusted proxy hops from the right when configured", async () => {
        const fetchImpl = mockFetch(jsonResponse({}));
        await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }, { "X-Forwarded-For": "1.1.1.1, 2001:db8::1, 198.51.100.9" }), {
            env: { MCP_LOGIN_CLIENT_IP_SECRET: CLIENT_IP_SECRET, MCP_LOGIN_CLIENT_IP_XFF_HOPS: "2" },
            fetch: fetchImpl,
            now: () => NOW,
        });
        expect(sentHeaders(fetchImpl).get(CLIENT_IP_HEADERS.ip)).toBe("2001:db8::1");
    });

    it.each([
        ["no X-Forwarded-For", undefined, "1"],
        ["fewer entries than hops", "203.0.113.7", "2"],
        ["not an IP", "1.1.1.1, evil.example", "1"],
        ["invalid hop count", "203.0.113.7", "zero"],
    ])("sends no client-IP headers with %s", async (_label, xff, hops) => {
        const fetchImpl = mockFetch(jsonResponse({}));
        await handleMcpLogin(loginRequest({ ...credentials, mcp_url: PROD_MCP }, xff ? { "X-Forwarded-For": xff } : {}), {
            env: { MCP_LOGIN_CLIENT_IP_SECRET: CLIENT_IP_SECRET, MCP_LOGIN_CLIENT_IP_XFF_HOPS: hops },
            fetch: fetchImpl,
        });
        expect(sentHeaders(fetchImpl).has(CLIENT_IP_HEADERS.ip)).toBe(false);
    });

    it("never forwards the browser's own client-IP headers", async () => {
        const fetchImpl = mockFetch(jsonResponse({}));
        await handleMcpLogin(
            loginRequest(
                { ...credentials, mcp_url: PROD_MCP },
                {
                    [CLIENT_IP_HEADERS.ip]: "9.9.9.9",
                    [CLIENT_IP_HEADERS.timestamp]: "1",
                    [CLIENT_IP_HEADERS.signature]: "ff",
                    "X-Forwarded-For": "203.0.113.7",
                },
            ),
            { env: {}, fetch: fetchImpl },
        );
        const headers = sentHeaders(fetchImpl);
        for (const name of Object.values(CLIENT_IP_HEADERS)) expect(headers.has(name)).toBe(false);
    });
});
