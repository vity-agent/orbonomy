import { NextRequest, NextResponse } from "next/server";
import { dataCache } from "@/lib/cache";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";
const YAHOO_HOST = "yahoo-finance15.p.rapidapi.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, ticker } = body;
    if (!topic && !ticker) {
      return NextResponse.json({ success: false, error: "Provide topic or ticker" }, { status: 400 });
    }

    const cacheKey = `news:${ticker || topic}`;
    const cached = dataCache.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    if (RAPIDAPI_KEY && !RAPIDAPI_KEY.startsWith("your-") && ticker) {
      // Use Yahoo Finance news for stock tickers
      const res = await fetch(`https://yahoo-finance15.p.rapidapi.com/api/v1/markets/news?ticker=${encodeURIComponent(ticker)}`, {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": YAHOO_HOST,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const response = { success: true, topic: ticker, news: data.body || data };
        dataCache.set(cacheKey, response);
        return NextResponse.json(response);
      }
    }

    // Fallback to LLM for general news
    const { chat } = await import("@/lib/llm");
    const messages = [
      { role: "system" as const, content: "You are a news analyst. Provide recent news and developments on the given topic. Include headlines, sources, sentiment, and key takeaways. Return as JSON array." },
      { role: "user" as const, content: `Provide 5 recent news items about: ${topic || ticker}` },
    ];
    const result = await chat(messages, 2048);
    return NextResponse.json({ success: true, topic: topic || ticker, news: result.content, provider: result.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
