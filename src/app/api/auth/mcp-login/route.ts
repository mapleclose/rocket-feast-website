import { handleMcpLogin } from "./mcp-login-proxy";

// Reads server-only env (MCP_LOGIN_ALLOWED_ORIGINS, MCP_LOGIN_CLIENT_IP_*) and node:crypto.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    return handleMcpLogin(request);
}
