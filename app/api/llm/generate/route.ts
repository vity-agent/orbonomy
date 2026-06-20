import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, format, schema } = body;
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: prompt (string)" }, { status: 400 });
    }

    const fmt = format || "json";
    let systemPrompt = `You are a content generator. Generate ${fmt} output based on the prompt. Return ONLY the ${fmt} content, no explanations or markdown fences.`;
    if (schema) systemPrompt += ` Follow this schema: ${JSON.stringify(schema)}`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: prompt },
    ];

    const result = await chat(messages, 2048);
    return NextResponse.json({ success: true, content: result.content, format: fmt, provider: result.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
