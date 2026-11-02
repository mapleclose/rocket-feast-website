import { describe, expect, it, vi } from "vitest";
import { XFF_PROBE_SENTINEL, handleXffProbe } from "./xff-probe";

const SECRET = "0123456789abcdef0123456789abcdef-test-only";
const CALLER = "198.51.100.7";
const EDGE = "192.0.2.199";

function probe(xff: string | null, body: unknown = {}, extra: Record<string, string> = {}): Request {
    const headers: Record<string, string> = { "Content-Type": "application/json", ...extra };
    if (xff !== null) headers["x-forwarded-for"] = xff;
    return new Request("https://rocketfeast.com/api/auth/mcp-login/xff-probe", {
        method: "POST",
        headers,
        body: typeof body === "string" ? body : JSON.stringify(body),
    });
}

const options = { env: {}, resolveSecret: async () => undefined };

describe("X-Forwarded-For probe", () => {
    it("reports the caller at position 1 when only CloudFront appended", async () => {
        const res = await handleXffProbe(probe(CALLER, { caller: CALLER }), options);

        expect(await res.json()).toMatchObject({ entries: 1, callerFromRight: 1, sentinelFromRight: null });
    });

    it("reports the caller at position 2 when one more proxy appended after CloudFront", async () => {
        const res = await handleXffProbe(probe(`${CALLER}, ${EDGE}`, { caller: CALLER }), options);

        expect(await res.json()).toMatchObject({ entries: 2, callerFromRight: 2, sentinelFromRight: null });
    });

    it("places a client-supplied sentinel left of the caller", async () => {
        const res = await handleXffProbe(probe(`${XFF_PROBE_SENTINEL},${CALLER}, ${EDGE}`, { caller: CALLER }), options);

        expect(await res.json()).toMatchObject({ entries: 3, callerFromRight: 2, sentinelFromRight: 3 });
    });

    it("shows when the platform discards a client-supplied entry", async () => {
        const res = await handleXffProbe(probe(EDGE, { caller: CALLER }), options);

        expect(await res.json()).toMatchObject({ entries: 1, callerFromRight: null, sentinelFromRight: null });
    });

    it("counts from the rightmost match, the only one a client cannot forge", async () => {
        const res = await handleXffProbe(probe(`${CALLER}, ${XFF_PROBE_SENTINEL}, ${CALLER}, ${EDGE}`, { caller: CALLER }), options);

        expect(await res.json()).toMatchObject({ callerFromRight: 2 });
    });

    it("handles a request with no X-Forwarded-For", async () => {
        const res = await handleXffProbe(probe(null, { caller: CALLER }), options);

        expect(await res.json()).toMatchObject({ entries: 0, callerFromRight: null, sentinelFromRight: null });
    });

    it("treats an empty or malformed body as no caller", async () => {
        const res = await handleXffProbe(probe(CALLER, "not json"), options);

        expect(res.status).toBe(200);
        expect(await res.json()).toMatchObject({ entries: 1, callerFromRight: null });
    });

    it("rejects a caller that is not an IP address", async () => {
        const res = await handleXffProbe(probe(CALLER, { caller: "not-an-ip" }), options);

        expect(res.status).toBe(400);
    });

    it("never returns or logs an address", async () => {
        const log = vi.spyOn(console, "log").mockImplementation(() => {});
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

        const res = await handleXffProbe(probe(`${XFF_PROBE_SENTINEL},${CALLER}, ${EDGE}`, { caller: CALLER }), options);
        const text = await res.text();

        expect(text).not.toContain(CALLER);
        expect(text).not.toContain(EDGE);
        expect(text).not.toContain(XFF_PROBE_SENTINEL);
        expect(log).not.toHaveBeenCalled();
        expect(warn).not.toHaveBeenCalled();
    });

    it("is not cacheable", async () => {
        const res = await handleXffProbe(probe(CALLER), options);

        expect(res.headers.get("Cache-Control")).toBe("no-store");
    });

    it("reports signing readiness as booleans, never the secret or its id", async () => {
        const secretId = "rocket-feast/website/secret";
        const res = await handleXffProbe(probe(CALLER), {
            env: { MCP_LOGIN_CLIENT_IP_SECRET_ID: secretId, MCP_LOGIN_CLIENT_IP_XFF_HOPS: "2" },
            resolveSecret: async () => SECRET,
        });
        const text = await res.text();

        expect(JSON.parse(text)).toMatchObject({ runtimeConfigLoaded: true, signing: true, hopsConfigured: 2 });
        expect(text).not.toContain(SECRET);
        expect(text).not.toContain(secretId);
    });

    it("does not report signing with a secret too short to sign with", async () => {
        const res = await handleXffProbe(probe(CALLER), { env: {}, resolveSecret: async () => "short" });

        expect(await res.json()).toMatchObject({ runtimeConfigLoaded: false, signing: false, hopsConfigured: null });
    });

    it("reports whether CloudFront-Viewer-Address reached the server, without its value", async () => {
        const present = await handleXffProbe(probe(CALLER, {}, { "cloudfront-viewer-address": `${CALLER}:46532` }), options);
        const absent = await handleXffProbe(probe(CALLER), options);

        expect(await present.clone().json()).toMatchObject({ viewerAddressHeader: true });
        expect(await present.text()).not.toContain(CALLER);
        expect(await absent.json()).toMatchObject({ viewerAddressHeader: false });
    });
});
