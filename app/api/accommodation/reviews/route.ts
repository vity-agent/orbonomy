import { NextRequest, NextResponse } from "next/server";
import { getHotelDetails } from "@/lib/hotels";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { hotel_id, reviews_text } = body;

    let reviewsContent = reviews_text || "";
    if (hotel_id && !reviewsContent) {
      const details = await getHotelDetails(String(hotel_id));
      reviewsContent = JSON.stringify(details).slice(0, 3000);
    }

    if (!reviewsContent) {
      return NextResponse.json({ success: false, error: "Provide hotel_id or reviews_text" }, { status: 400 });
    }

    const messages = [
      { role: "system" as const, content: "Analyze the reviews and provide: overall sentiment, top 3 pros, top 3 cons, key themes, and a recommendation score (1-10). Return as JSON." },
      { role: "user" as const, content: reviewsContent },
    ];

    const result = await chat(messages, 1024);
    return NextResponse.json({ success: true, summary: result.content, provider: result.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
