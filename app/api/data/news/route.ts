import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, count } = body;
    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: topic (string)" }, { status: 400 });
    }

    const messages = [
      { role: "system" as const, content: "You are a news analyst. Provide recent news and developments on the given topic. Include headlines, sources, sentiment, and key takeaways. Return as JSON array." },
      { role: "user" as const, content: `Provide ${count || 5} recent news items about: ${topic}` },
    ];

    const result = await chat(messages, 2048);
    return NextResponse.json({ success: true, topic, news: result.content, provider: result.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
