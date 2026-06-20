import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { location, topic, date_range } = body;
    if (!location && !topic) {
      return NextResponse.json({ success: false, error: "Provide at least location or topic" }, { status: 400 });
    }

    const messages = [
      { role: "system" as const, content: "You are an event discovery assistant. Find and list upcoming events based on the criteria. Include event names, dates, venues, descriptions. Return as JSON array." },
      { role: "user" as const, content: `Find events. Location: ${location || "anywhere"}. Topic: ${topic || "any"}. Date range: ${date_range || "upcoming"}` },
    ];

    const result = await chat(messages, 2048);
    return NextResponse.json({ success: true, events: result.content, provider: result.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
