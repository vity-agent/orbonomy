import { NextRequest, NextResponse } from "next/server";
import { searchHotels } from "@/lib/hotels";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { location, checkin, checkout, budget } = body;
    if (!location || typeof location !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: location (string)" }, { status: 400 });
    }

    const hotels = await searchHotels({ location, checkin, checkout, budget, limit: 15 });

    const messages = [
      { role: "system" as const, content: "You are a travel deals expert. Analyze these hotels and identify the best value-for-money options. Consider price, rating, and location." },
      { role: "user" as const, content: JSON.stringify(hotels.results).slice(0, 4000) },
    ];

    const analysis = await chat(messages, 1024);
    return NextResponse.json({ success: true, deals: hotels.results, recommendations: analysis.content, provider: analysis.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
