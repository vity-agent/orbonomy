import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";
import { llmCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, tone, style, context } = body;
    if (!text || typeof text !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: text (string)" }, { status: 400 });
    }

    const cacheKey = `text:${JSON.stringify(body)}`;
    const cached = llmCache.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    let userContent = text;
    if (tone) userContent += `\nDesired tone: ${tone}`;
    if (style) userContent += `\nDesired style: ${style}`;
    if (context) userContent += `\nContext: ${context}`;

    const messages = [
      { role: "system" as const, content: "You are a professional editor. Rephrase the text while preserving the original meaning exactly." },
      { role: "user" as const, content: userContent },
    ];

    const result = await chat(messages, 2048);
    const response = { success: true, result: result.content, provider: result.provider };
    llmCache.set(cacheKey, response);
    return NextResponse.json(response);
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
