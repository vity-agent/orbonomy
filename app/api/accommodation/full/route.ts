import { NextRequest, NextResponse } from "next/server";
import { searchHotels, getHotelDetails } from "@/lib/hotels";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { location, checkin, checkout, adults, budget, preferences } = body;
    if (!location || typeof location !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: location (string)" }, { status: 400 });
    }

    const hotels = await searchHotels({ location, checkin, checkout, adults, budget, limit: 10 });

    const hotelSummary = hotels.results.slice(0, 5).map((h: Record<string, unknown>) =>
      `${h.name} - $${h.price_per_night}/night, Rating: ${h.rating}/10, Reviews: ${h.review_count}`
    ).join("\n");

    const messages = [
      { role: "system" as const, content: "You are a comprehensive travel advisor. Provide: 1) Top 3 hotel recommendations with reasons, 2) Nearby attractions, 3) Local tips, 4) Budget breakdown estimate. Format as JSON." },
      { role: "user" as const, content: `Destination: ${location}\nDates: ${checkin || "flexible"} to ${checkout || "flexible"}\nGuests: ${adults || 2}\nBudget: ${budget || "moderate"}\nPreferences: ${preferences || "none"}\nAvailable hotels:\n${hotelSummary}` },
    ];

    const analysis = await chat(messages, 3000);
    return NextResponse.json({
      success: true,
      recommendations: analysis.content,
      hotels: hotels.results,
      provider: analysis.provider,
    });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
