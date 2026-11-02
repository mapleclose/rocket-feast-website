import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// This repository is public and .env.production is committed. It carries only
// non-secret settings; the signing secret is read from Secrets Manager at runtime.
const ALLOWED_KEYS = ["MCP_LOGIN_CLIENT_IP_SECRET_ID", "MCP_LOGIN_CLIENT_IP_SECRET_REGION", "MCP_LOGIN_CLIENT_IP_XFF_HOPS"];

function settings(): Record<string, string> {
    const lines = readFileSync(join(process.cwd(), ".env.production"), "utf8").split("\n");
    const entries = lines
        .map((line) => line.trim())
        .filter((line) => line !== "" && !line.startsWith("#"))
        .map((line) => {
            const eq = line.indexOf("=");
            return [line.slice(0, eq), line.slice(eq + 1)];
        });
    return Object.fromEntries(entries);
}

describe("committed .env.production", () => {
    it("holds only the allow-listed non-secret settings", () => {
        for (const key of Object.keys(settings())) expect(ALLOWED_KEYS).toContain(key);
    });

    it("never holds the secret itself", () => {
        expect(settings()).not.toHaveProperty("MCP_LOGIN_CLIENT_IP_SECRET");
    });

    it("names the replica in the Amplify region", () => {
        expect(settings()).toMatchObject({
            MCP_LOGIN_CLIENT_IP_SECRET_ID: "rocket-feast/website/mcp-login-client-ip-secret",
            MCP_LOGIN_CLIENT_IP_SECRET_REGION: "ap-southeast-2",
        });
    });
});
