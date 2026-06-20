import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";
import { llmCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, style, tone, preserve_meaning } = body;
    if (!text || typeof text !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: text (string)" }, { status: 400 });
    }

    const rewriteStyle = style || "professional";
    const cacheKey = `rewrite:${rewriteStyle}:${tone || ""}:${text}`;
    const cached = llmCache.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    let instruction = `Rewrite the following text in a ${rewriteStyle} style`;
    if (tone) instruction += ` with a ${tone} tone`;
    if (preserve_meaning !== false) instruction += `. Preserve the original meaning exactly`;
    instruction += `. Return ONLY the rewritten text.`;

    const messages = [
      { role: "system" as const, content: instruction },
      { role: "user" as const, content: text },
    ];

    const result = await chat(messages, 2048);
    const response = { success: true, rewritten: result.content, style: rewriteStyle, provider: result.provider };
    llmCache.set(cacheKey, response);
    return NextResponse.json(response);
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
