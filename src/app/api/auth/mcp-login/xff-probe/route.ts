import { resolveClientIpSecret } from "../client-ip-secret";
import { handleXffProbe } from "./xff-probe";

// Reads the runtime environment and the request's own X-Forwarded-For. POST, so no
// cache can answer it and no crawler can reach it by following a link.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    return handleXffProbe(request, { env: process.env, resolveSecret: resolveClientIpSecret });
}
