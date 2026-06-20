import { NextRequest, NextResponse } from "next/server";
import { getSummary } from "@/lib/wikipedia";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, lang } = body;
    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: topic (string)" }, { status: 400 });
    }
    const summary = await getSummary(topic, lang || "en");
    return NextResponse.json({ success: true, summary });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
