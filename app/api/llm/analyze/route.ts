import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";
import { llmCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: prompt (string)" }, { status: 400 });
    }

    const cacheKey = `analyze:${prompt.slice(0, 200)}`;
    const cached = llmCache.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    const messages = [
      { role: "system" as const, content: "You are an expert analyst. Analyze the input thoroughly and provide structured insights. Consider multiple angles and provide actionable conclusions." },
      { role: "user" as const, content: prompt },
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
