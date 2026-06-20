import { NextRequest, NextResponse } from "next/server";
import { searchHotels } from "@/lib/hotels";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { destination, days, budget, interests, checkin, checkout } = body;
    if (!destination || typeof destination !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: destination (string)" }, { status: 400 });
    }

    const hotels = await searchHotels({ location: destination, checkin, checkout, budget, limit: 5 });
    const hotelInfo = hotels.results.length > 0
      ? hotels.results.map((h: Record<string, unknown>) => `${h.name} - $${h.price_per_night}/night`).join("\n")
      : "No specific hotels found";

    const messages = [
      { role: "system" as const, content: "You are a travel itinerary planner. Create a detailed day-by-day itinerary including accommodation, activities, meals, and transport. Be practical and budget-conscious." },
      { role: "user" as const, content: `Plan a ${days || 3}-day trip to ${destination}. Budget: ${budget || "moderate"}. Interests: ${interests || "general sightseeing"}. Available hotels:\n${hotelInfo}` },
    ];

    const result = await chat(messages, 3000);
    return NextResponse.json({ success: true, itinerary: result.content, hotels: hotels.results, provider: result.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
