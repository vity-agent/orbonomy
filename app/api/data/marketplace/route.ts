import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, platform, category } = body;
    if (!query || typeof query !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: query (string)" }, { status: 400 });
    }

    const messages = [
      { role: "system" as const, content: "You are a marketplace research assistant. Search and compare listings across marketplaces. Provide prices, sellers, ratings, and recommendations. Return as JSON." },
      { role: "user" as const, content: `Search for: ${query}. Platform: ${platform || "general"}. Category: ${category || "all"}` },
    ];

    const result = await chat(messages, 2048);
    return NextResponse.json({ success: true, query, results: result.content, provider: result.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
