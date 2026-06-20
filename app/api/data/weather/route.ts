import { NextRequest, NextResponse } from "next/server";
import { dataCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { latitude, longitude, days } = body;
    if (latitude === undefined || longitude === undefined) {
      return NextResponse.json({ success: false, error: "Missing required fields: latitude, longitude" }, { status: 400 });
    }

    const cacheKey = `weather:${latitude}:${longitude}`;
    const cached = dataCache.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&forecast_days=${days || 7}&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) return NextResponse.json({ success: false, error: "Weather API error" }, { status: 502 });

    const data = await res.json();
    const response = { success: true, data };
    dataCache.set(cacheKey, response);
    return NextResponse.json(response);
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
