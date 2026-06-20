import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, fields, format } = body;
    if (!text || typeof text !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: text (string)" }, { status: 400 });
    }

    const fieldList = Array.isArray(fields) ? fields.join(", ") : "all relevant structured data";
    const fmt = format || "json";

    const messages = [
      { role: "system" as const, content: `You are a data extraction expert. Extract the following fields from the text: ${fieldList}. Return as valid ${fmt}. Return ONLY the structured data, no explanations.` },
      { role: "user" as const, content: text },
    ];

    const result = await chat(messages, 2048);
    return NextResponse.json({ success: true, extracted: result.content, format: fmt, provider: result.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
