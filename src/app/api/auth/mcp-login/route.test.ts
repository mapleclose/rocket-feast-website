import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

function post(body: unknown, headers: Record<string, string> = {}) {
    return new NextRequest("https://rocketfeast.com/api/auth/mcp-login", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(body),
    });
}

afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
});

describe("POST /api/auth/mcp-login", () => {
    it("rejects a phishing mcp_url with 400 and never posts the credentials to it", async () => {
        const fetchSpy = vi.fn(async () => new Response(JSON.stringify({ redirect: "https://attacker.example/done" }), { status: 200 }));
        vi.stubGlobal("fetch", fetchSpy);

        const res = await POST(post({ email: "staff@example.com", password: "pw", state: "s", mcp_url: "https://attacker.example" }));

        expect(res.status).toBe(400);
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("proxies to the production MCP without following redirects", async () => {
        const fetchSpy = vi.fn(async (..._args: [string, RequestInit]) => new Response(JSON.stringify({ needs_otp: true }), { status: 200 }));
        vi.stubGlobal("fetch", fetchSpy);

        const res = await POST(post({ email: "staff@example.com", password: "pw", state: "s", mcp_url: "https://mcp.rocketfeast.com" }));

        expect(res.status).toBe(200);
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(fetchSpy.mock.calls[0][0]).toBe("https://mcp.rocketfeast.com/login");
        expect(fetchSpy.mock.calls[0][1].redirect).toBe("manual");
    });

    it("honours MCP_LOGIN_ALLOWED_ORIGINS from the server environment", async () => {
        vi.stubEnv("MCP_LOGIN_ALLOWED_ORIGINS", "https://mcp.example.test");
        const fetchSpy = vi.fn(async () => new Response("{}", { status: 200 }));
        vi.stubGlobal("fetch", fetchSpy);

        expect((await POST(post({ state: "s", mcp_url: "https://mcp.rocketfeast.com" }))).status).toBe(400);
        expect((await POST(post({ state: "s", mcp_url: "https://mcp.example.test" }))).status).toBe(200);
    });
});
