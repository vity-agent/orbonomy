import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";
import { llmCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, target, source } = body;
    if (!text || typeof text !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: text (string)" }, { status: 400 });
    }
    if (!target || typeof target !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: target (string)" }, { status: 400 });
    }

    const cacheKey = `translate:${target}:${text}`;
    const cached = llmCache.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    const src = source ? ` from ${source}` : "";
    const messages = [
      { role: "system" as const, content: `You are a professional translator. Translate the following text${src} to ${target}. Return ONLY the translation, no explanations.` },
      { role: "user" as const, content: text },
    ];

    const result = await chat(messages, 2048);
    const response = { success: true, translation: result.content, target, provider: result.provider };
    llmCache.set(cacheKey, response);
    return NextResponse.json(response);
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
