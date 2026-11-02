import { afterEach, describe, expect, it, vi } from "vitest";
import { createClientIpSecretResolver } from "./client-ip-secret";

const SECRET = "0123456789abcdef0123456789abcdef-test-only";
const ROTATED = "fedcba9876543210fedcba9876543210-test-only";
const ENV = { MCP_LOGIN_CLIENT_IP_SECRET_ID: "rocket-feast/website/secret", MCP_LOGIN_CLIENT_IP_SECRET_REGION: "ap-southeast-2" };

function clock(start = 1_000_000) {
    const state = { now: start };
    return { now: () => state.now, advance: (ms: number) => (state.now += ms) };
}

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("client-IP secret resolver", () => {
    it("prefers a secret already in the environment and never calls AWS", async () => {
        const fetchSecret = vi.fn(async () => SECRET);
        const resolve = createClientIpSecretResolver({ fetchSecret });

        await expect(resolve({ ...ENV, MCP_LOGIN_CLIENT_IP_SECRET: ROTATED })).resolves.toBe(ROTATED);
        expect(fetchSecret).not.toHaveBeenCalled();
    });

    it("stays off without a secret id, so local and test runs never call AWS", async () => {
        const fetchSecret = vi.fn(async () => SECRET);
        const resolve = createClientIpSecretResolver({ fetchSecret });

        await expect(resolve({})).resolves.toBeUndefined();
        expect(fetchSecret).not.toHaveBeenCalled();
    });

    it("reads the configured secret id in the configured region", async () => {
        const fetchSecret = vi.fn(async () => SECRET);
        const resolve = createClientIpSecretResolver({ fetchSecret });

        await expect(resolve(ENV)).resolves.toBe(SECRET);
        expect(fetchSecret).toHaveBeenCalledWith("rocket-feast/website/secret", "ap-southeast-2");
    });

    it("caches the value, then picks up a rotated value after the lifetime", async () => {
        const time = clock();
        const fetchSecret = vi.fn(async () => SECRET);
        const resolve = createClientIpSecretResolver({ fetchSecret, now: time.now, ttlMs: 1_000 });

        await resolve(ENV);
        time.advance(999);
        await expect(resolve(ENV)).resolves.toBe(SECRET);
        expect(fetchSecret).toHaveBeenCalledTimes(1);

        fetchSecret.mockResolvedValue(ROTATED);
        time.advance(1);
        await expect(resolve(ENV)).resolves.toBe(ROTATED);
        expect(fetchSecret).toHaveBeenCalledTimes(2);
    });

    it("shares one in-flight read across concurrent logins", async () => {
        const fetchSecret = vi.fn(async () => SECRET);
        const resolve = createClientIpSecretResolver({ fetchSecret });

        const values = await Promise.all([resolve(ENV), resolve(ENV), resolve(ENV)]);

        expect(values).toEqual([SECRET, SECRET, SECRET]);
        expect(fetchSecret).toHaveBeenCalledTimes(1);
    });

    it("fails open: a read failure resolves to no secret and is not retried on every login", async () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const time = clock();
        const fetchSecret = vi.fn(async (): Promise<string> => {
            throw new Error(`AccessDenied for ${SECRET}`);
        });
        const resolve = createClientIpSecretResolver({ fetchSecret, now: time.now, failureTtlMs: 1_000 });

        await expect(resolve(ENV)).resolves.toBeUndefined();
        await expect(resolve(ENV)).resolves.toBeUndefined();
        expect(fetchSecret).toHaveBeenCalledTimes(1);

        time.advance(1_000);
        await expect(resolve(ENV)).resolves.toBeUndefined();
        expect(fetchSecret).toHaveBeenCalledTimes(2);
        expect(JSON.stringify(warn.mock.calls)).not.toContain(SECRET);
    });

    it("keeps the last good value when a refresh fails", async () => {
        vi.spyOn(console, "warn").mockImplementation(() => {});
        const time = clock();
        const fetchSecret = vi.fn(async () => SECRET);
        const resolve = createClientIpSecretResolver({ fetchSecret, now: time.now, ttlMs: 1_000, failureTtlMs: 500 });

        await resolve(ENV);
        fetchSecret.mockRejectedValue(new Error("throttled"));
        time.advance(1_000);

        await expect(resolve(ENV)).resolves.toBe(SECRET);
        expect(fetchSecret).toHaveBeenCalledTimes(2);
    });

    it("gives up on a slow read so a login is never held up", async () => {
        vi.useFakeTimers();
        vi.spyOn(console, "warn").mockImplementation(() => {});
        const fetchSecret = vi.fn(() => new Promise<string>(() => {}));
        const resolve = createClientIpSecretResolver({ fetchSecret, timeoutMs: 1_500 });

        const pending = resolve(ENV);
        await vi.advanceTimersByTimeAsync(1_500);

        await expect(pending).resolves.toBeUndefined();
    });

    it("treats an empty stored value as no secret", async () => {
        vi.spyOn(console, "warn").mockImplementation(() => {});
        const resolve = createClientIpSecretResolver({ fetchSecret: vi.fn(async () => "") });

        await expect(resolve(ENV)).resolves.toBeUndefined();
    });
});
