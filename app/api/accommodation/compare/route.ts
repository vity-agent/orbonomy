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

    const hotels = await searchHotels({ location, checkin, checkout, budget, limit: 10 });
    if (hotels.results.length === 0) {
      return NextResponse.json({ success: true, comparison: [], message: "No hotels found" });
    }

    const hotelSummary = hotels.results.map((h: Record<string, unknown>) =>
      `${h.name} - $${h.price_per_night}/night, Rating: ${h.rating}, Reviews: ${h.review_count}`
    ).join("\n");

    const messages = [
      { role: "system" as const, content: "You are a travel advisor. Compare these hotels and recommend the best options based on value, rating, and price. Be concise." },
      { role: "user" as const, content: `Compare these hotels in ${location}:\n${hotelSummary}` },
    ];

    const analysis = await chat(messages, 1024);
    return NextResponse.json({ success: true, hotels: hotels.results, analysis: analysis.content, provider: analysis.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
