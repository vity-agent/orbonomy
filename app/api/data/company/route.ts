import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;
    if (!name || typeof name !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: name (string)" }, { status: 400 });
    }

    const messages = [
      { role: "system" as const, content: "You are a company research analyst. Provide detailed company information including: description, industry, founded year, headquarters, size, key people, products/services, recent news. Return as JSON." },
      { role: "user" as const, content: `Research this company: ${name}` },
    ];

    const result = await chat(messages, 2048);
    return NextResponse.json({ success: true, company: result.content, provider: result.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
