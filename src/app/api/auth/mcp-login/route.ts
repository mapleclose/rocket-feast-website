import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { mcp_url, ...loginPayload } = body;

    if (!mcp_url) {
        return NextResponse.json({ error: "Missing mcp_url parameter" }, { status: 400 });
    }

    try {
        const res = await fetch(`${mcp_url}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginPayload),
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch {
        return NextResponse.json({ error: "Failed to connect to MCP server" }, { status: 502 });
    }
}
