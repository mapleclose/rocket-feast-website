/**
 * Reads the secret that signs the client IP sent to the MCP (see CLIENT_IP_HEADERS in
 * mcp-login-proxy.ts).
 *
 * Amplify keeps its environment variables out of the server runtime unless they are
 * written to .env.production at build time, which would put the secret in the build
 * artifact. So the value stays in Secrets Manager, and the Amplify SSR compute role reads
 * it at runtime. .env.production names the secret and holds no value.
 *
 * Signing is optional, so nothing here may stand in the way of a login: every failure
 * resolves to the last good value or to no secret, and the MCP then keys on its socket IP.
 *
 * Never log the secret, or an error that could quote it.
 */
type Env = Record<string, string | undefined>;
type FetchSecret = (secretId: string, region: string | undefined) => Promise<string>;

/** A rotated value reaches the website within this long. */
const SECRET_TTL_MS = 5 * 60_000;
/** Without this, a missing role or secret would slow every login by the read timeout. */
const FAILURE_RETRY_MS = 60_000;
const READ_TIMEOUT_MS = 1_500;

export interface ClientIpSecretResolverOptions {
    fetchSecret?: FetchSecret;
    now?: () => number;
    ttlMs?: number;
    failureTtlMs?: number;
    timeoutMs?: number;
}

/** Loaded on first use, so a page render or a process with no secret id never loads the SDK. */
async function readFromSecretsManager(secretId: string, region: string | undefined): Promise<string> {
    const { GetSecretValueCommand, SecretsManagerClient } = await import("@aws-sdk/client-secrets-manager");
    const client = new SecretsManagerClient({ region, maxAttempts: 2 });
    const { SecretString } = await client.send(new GetSecretValueCommand({ SecretId: secretId }));
    return SecretString ?? "";
}

function withTimeout(read: Promise<string>, timeoutMs: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error("timed out")), timeoutMs);
        read.then(resolve, reject).finally(() => clearTimeout(timer));
    });
}

export function createClientIpSecretResolver(options: ClientIpSecretResolverOptions = {}) {
    const fetchSecret = options.fetchSecret ?? readFromSecretsManager;
    const now = options.now ?? Date.now;
    const ttlMs = options.ttlMs ?? SECRET_TTL_MS;
    const failureTtlMs = options.failureTtlMs ?? FAILURE_RETRY_MS;
    const timeoutMs = options.timeoutMs ?? READ_TIMEOUT_MS;

    let value: string | undefined;
    let nextReadAt = 0;
    let inFlight: Promise<string | undefined> | null = null;

    async function refresh(secretId: string, region: string | undefined): Promise<string | undefined> {
        try {
            const read = await withTimeout(fetchSecret(secretId, region), timeoutMs);
            if (read === "") throw new Error("empty secret");
            value = read;
            nextReadAt = now() + ttlMs;
        } catch {
            console.warn("[mcp-login] could not read the client-IP secret; using the last value if there is one");
            nextReadAt = now() + failureTtlMs;
        }
        return value;
    }

    return async function resolveClientIpSecret(env: Env): Promise<string | undefined> {
        if (env.MCP_LOGIN_CLIENT_IP_SECRET) return env.MCP_LOGIN_CLIENT_IP_SECRET;
        const secretId = env.MCP_LOGIN_CLIENT_IP_SECRET_ID;
        if (!secretId) return undefined;
        if (now() < nextReadAt) return value;

        inFlight ??= refresh(secretId, env.MCP_LOGIN_CLIENT_IP_SECRET_REGION).finally(() => {
            inFlight = null;
        });
        return inFlight;
    };
}

export const resolveClientIpSecret = createClientIpSecretResolver();
