import { NextResponse } from "next/server";
export async function POST() {
  const pricing = {
  "accommodation": {
    "search": 0.05,
    "details": 0.02,
    "compare": 0.1,
    "nearby": 0.03,
    "reviews": 0.05,
    "deals": 0.05,
    "itinerary": 0.25,
    "full": 0.5
  },
  "llm": {
    "chat": 0.02,
    "think": 0.05,
    "search": 0.03,
    "code": 0.08,
    "translate": 0.02,
    "summarize": 0.05,
    "extract": 0.07,
    "analyze": 0.1,
    "generate": 0.05,
    "rewrite": 0.02,
    "classify": 0.03,
    "pipeline": 0.15,
    "batch": 0.1
  },
  "content": {
    "draft": 0.15,
    "longform": 0.15,
    "broadcast": 0.15,
    "bulletin": 0.15,
    "digest": 0.15,
    "distill": 0.08,
    "reword": 0.08,
    "shift-tone": 0.08,
    "snippet": 0.08,
    "headline": 0.08,
    "audit": 0.08,
    "clean": 0.03,
    "vibe-check": 0.03
  },
  "factcheck": {
    "verify": 0.1,
    "search": 0.02,
    "summary": 0.02,
    "claims": 0.03
  },
  "data": {
    "geo": 0.03,
    "finance": 0.05,
    "news": 0.03,
    "weather": 0.02,
    "crypto": 0.05,
    "dns": 0.02,
    "whois": 0.03,
    "company": 0.05,
    "events": 0.03,
    "trends": 0.05,
    "marketplace": 0.05,
    "catalog": 0.03
  }
};
  return NextResponse.json({ success: true, pricing, currency: "USD", payment: "USDC on Base" });
}
