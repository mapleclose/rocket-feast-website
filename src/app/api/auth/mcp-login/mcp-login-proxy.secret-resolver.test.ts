import { describe, expect, it, vi } from "vitest";
import { CLIENT_IP_HEADERS, handleMcpLogin } from "./mcp-login-proxy";

const SECRET = "0123456789abcdef0123456789abcdef-test-only";
const credentials = { email: "staff@example.com", password: "correct horse", state: "state-1", mcp_url: "https://mcp.rocketfeast.com" };

function loginRequest(headers: Record<string, string> = {}): Request {
    return new Request("https://rocketfeast.com/api/auth/mcp-login", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(credentials),
    });
}

function okFetch() {
    return vi.fn(async (..._args: [string, RequestInit]) => new Response(JSON.stringify({ needs_otp: true }), { status: 200 }));
}

function sent(fetchImpl: ReturnType<typeof okFetch>): Headers {
    return new Headers(fetchImpl.mock.calls[0][1].headers);
}

describe("signing with a resolved secret", () => {
    it("signs with the secret from the resolver when the environment has none", async () => {
        const fetchImpl = okFetch();
        const resolveSecret = vi.fn(async () => SECRET);

        await handleMcpLogin(loginRequest({ "x-forwarded-for": "198.51.100.7" }), { env: {}, fetch: fetchImpl, resolveSecret });

        expect(sent(fetchImpl).get(CLIENT_IP_HEADERS.ip)).toBe("198.51.100.7");
        expect(sent(fetchImpl).get(CLIENT_IP_HEADERS.signature)).toMatch(/^[0-9a-f]{64}$/);
    });

    it("sends the login unsigned when no secret is available", async () => {
        const fetchImpl = okFetch();

        const res = await handleMcpLogin(loginRequest({ "x-forwarded-for": "198.51.100.7" }), {
            env: {},
            fetch: fetchImpl,
            resolveSecret: async () => undefined,
        });

        expect(res.status).toBe(200);
        expect(sent(fetchImpl).has(CLIENT_IP_HEADERS.ip)).toBe(false);
    });

    it("does not read the secret for a rejected mcp_url", async () => {
        const resolveSecret = vi.fn(async () => SECRET);
        const request = new Request("https://rocketfeast.com/api/auth/mcp-login", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-forwarded-for": "198.51.100.7" },
            body: JSON.stringify({ ...credentials, mcp_url: "https://attacker.example" }),
        });

        await handleMcpLogin(request, { env: {}, fetch: okFetch(), resolveSecret });

        expect(resolveSecret).not.toHaveBeenCalled();
    });

    it("does not read the secret when there is no usable client IP", async () => {
        const resolveSecret = vi.fn(async () => SECRET);

        await handleMcpLogin(loginRequest(), { env: {}, fetch: okFetch(), resolveSecret });

        expect(resolveSecret).not.toHaveBeenCalled();
    });
});
