import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";
import { llmCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;
    if (!text || typeof text !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: text (string)" }, { status: 400 });
    }

    const cacheKey = `summarize:${text.slice(0, 200)}`;
    const cached = llmCache.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    const messages = [
      { role: "system" as const, content: "You are a summarization expert. Create a clear, concise summary that captures the key points. Use bullet points for multiple items." },
      { role: "user" as const, content: text },
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
