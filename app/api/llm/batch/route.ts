import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, model, system_prompt } = body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: "Missing required field: items (array, max 10)" }, { status: 400 });
    }
    if (items.length > 10) {
      return NextResponse.json({ success: false, error: "Maximum 10 items allowed" }, { status: 400 });
    }

    const sysPrompt = system_prompt || "You are a helpful assistant. Respond concisely and accurately.";
    const results: Array<{ id: string; output: string; provider: string }> = [];

    for (const item of items) {
      const messages = [
        { role: "system" as const, content: sysPrompt },
        { role: "user" as const, content: item.prompt },
      ];
      const result = await chat(messages, 1024);
      results.push({ id: item.id, output: result.content, provider: result.provider });
    }

    return NextResponse.json({ success: true, results, count: results.length });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
