import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";
import { llmCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, language } = body;
    if (!text || typeof text !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: text (string)" }, { status: 400 });
    }

    const cacheKey = `code:${language || "any"}:${text.slice(0, 100)}`;
    const cached = llmCache.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    const langHint = language ? `The code is written in ${language}. ` : "";
    const messages = [
      { role: "system" as const, content: `You are an expert code reviewer. ${langHint}Analyze the code for bugs, security issues, performance problems, and style improvements. Be specific and actionable.` },
      { role: "user" as const, content: text },
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
