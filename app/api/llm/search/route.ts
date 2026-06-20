import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";
import { llmCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic } = body;
    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: topic (string)" }, { status: 400 });
    }

    const cacheKey = `search:${topic}`;
    const cached = llmCache.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    const messages = [
      { role: "system" as const, content: "You are a research assistant. Synthesize information from your knowledge to answer the query thoroughly. Cite sources when possible." },
      { role: "user" as const, content: topic },
    ];

    const result = await chat(messages, 1024);
    const response = { success: true, result: result.content, provider: result.provider };
    llmCache.set(cacheKey, response);
    return NextResponse.json(response);
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
