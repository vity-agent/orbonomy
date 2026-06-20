import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({
    success: true,
    name: "Orbonomy",
    version: "1.0.0",
    description: "Unified AI-powered API platform — 50+ endpoints across accommodation, LLM, content, fact-checking, and data services.",
    chain: "Base (eip155:8453)",
    currency: "USDC",
    facilitator: "PayAI",
    total_endpoints: 57,
    categories: ["accommodation", "llm", "content", "factcheck", "data", "utility"],
  });
}
