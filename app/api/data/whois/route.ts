import { NextRequest, NextResponse } from "next/server";
import { dataCache } from "@/lib/cache";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";
const WHOIS_HOST = "zozor54-whois-lookup-v1.p.rapidapi.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain } = body;
    if (!domain || typeof domain !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: domain (string)" }, { status: 400 });
    }

    const cacheKey = `whois:${domain}`;
    const cached = dataCache.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    if (!RAPIDAPI_KEY || RAPIDAPI_KEY.startsWith("your-")) {
      return NextResponse.json({ success: false, error: "WHOIS API not configured" }, { status: 503 });
    }

    const res = await fetch(`https://zozor54-whois-lookup-v1.p.rapidapi.com/ssl-cert-check?domain=${encodeURIComponent(domain)}`, {
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": WHOIS_HOST,
      },
    });

    if (!res.ok) return NextResponse.json({ success: false, error: "WHOIS API error" }, { status: 502 });

    const data = await res.json();
    const response = { success: true, domain, data };
    dataCache.set(cacheKey, response);
    return NextResponse.json(response);
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
