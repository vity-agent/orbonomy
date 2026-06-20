import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, region } = body;
    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: topic (string)" }, { status: 400 });
    }

    const messages = [
      { role: "system" as const, content: "You are a trends analyst. Identify and analyze current trends related to the topic. Include trend direction, key drivers, predictions, and data points. Return as JSON." },
      { role: "user" as const, content: `Analyze trends for: ${topic}. Region: ${region || "global"}` },
    ];

    const result = await chat(messages, 2048);
    return NextResponse.json({ success: true, topic, trends: result.content, provider: result.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
