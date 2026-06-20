import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, category, filters } = body;
    if (!query || typeof query !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: query (string)" }, { status: 400 });
    }

    const messages = [
      { role: "system" as const, content: "You are a product catalog assistant. Search for products and provide structured results with names, descriptions, prices, categories, and availability. Return as JSON array." },
      { role: "user" as const, content: `Search catalog: ${query}. Category: ${category || "all"}. Filters: ${JSON.stringify(filters || {})}` },
    ];

    const result = await chat(messages, 2048);
    return NextResponse.json({ success: true, query, catalog: result.content, provider: result.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
