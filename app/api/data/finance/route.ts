import { NextRequest, NextResponse } from "next/server";
import { dataCache } from "@/lib/cache";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";
const YAHOO_HOST = "yahoo-finance15.p.rapidapi.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbol } = body;
    if (!symbol || typeof symbol !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: symbol (string)" }, { status: 400 });
    }

    const cacheKey = `finance:${symbol}`;
    const cached = dataCache.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    if (!RAPIDAPI_KEY || RAPIDAPI_KEY.startsWith("your-")) {
      return NextResponse.json({ success: false, error: "Finance API not configured" }, { status: 503 });
    }

    const res = await fetch(`https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes?ticker=${encodeURIComponent(symbol)}`, {
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": YAHOO_HOST,
      },
    });

    if (!res.ok) return NextResponse.json({ success: false, error: "Finance API error" }, { status: 502 });

    const data = await res.json();
    const response = { success: true, symbol, data: data.body || data };
    dataCache.set(cacheKey, response);
    return NextResponse.json(response);
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
