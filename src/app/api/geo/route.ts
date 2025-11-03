import { NextRequest, NextResponse } from "next/server";
import type { Region } from "@/types/locale";

export const runtime = "edge";

/**
 * API route to detect user's region based on IP address
 * Uses Vercel's geo headers when deployed, falls back to global for local dev
 */
export async function GET(request: NextRequest) {
    // Get country code from Vercel's geo headers (available in production)
    // Note: request.geo is available in Vercel deployment but not in type definitions
    const country = request.headers.get("x-vercel-ip-country");

    // Map country codes to our regions
    const region: Region = country === "TH" ? "th" : "global";

    return NextResponse.json({
        region,
        country: country || "US",
        detected: !!country,
    });
}
