import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, max_tokens } = body;
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ success: false, error: "Missing required field: messages (array)" }, { status: 400 });
    }
    const result = await chat(messages, max_tokens || 1024);
    return NextResponse.json({ success: true, content: result.content, provider: result.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
