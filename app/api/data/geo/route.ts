import { NextRequest, NextResponse } from "next/server";
import { dataCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, format } = body;
    if (!query || typeof query !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: query (string)" }, { status: 400 });
    }

    const cacheKey = `geo:${query}`;
    const cached = dataCache.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
    const res = await fetch(url);
    if (!res.ok) return NextResponse.json({ success: false, error: "Geocoding API error" }, { status: 502 });

    const data = await res.json();
    const response = {
      success: true,
      results: (data.results || []).map((r: Record<string, unknown>) => ({
        name: r.name, country: r.country, latitude: r.latitude, longitude: r.longitude,
        elevation: r.elevation, timezone: r.timezone, population: r.population,
      })),
    };
    dataCache.set(cacheKey, response);
    return NextResponse.json(response);
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
