import { NextRequest, NextResponse } from "next/server";
import { dataCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids, vs_currencies } = body;
    if (!ids || typeof ids !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: ids (string, comma-separated)" }, { status: 400 });
    }

    const cacheKey = `crypto:${ids}`;
    const cached = dataCache.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=${vs_currencies || "usd"}&include_24hr_change=true&include_market_cap=true`;
    const res = await fetch(url);
    if (!res.ok) return NextResponse.json({ success: false, error: "Crypto API error" }, { status: 502 });

    const data = await res.json();
    const response = { success: true, data };
    dataCache.set(cacheKey, response);
    return NextResponse.json(response);
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
