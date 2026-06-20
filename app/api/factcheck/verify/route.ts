import { NextRequest, NextResponse } from "next/server";
import { queryFacts } from "@/lib/wikidata";
import { getSummary } from "@/lib/wikipedia";
import { searchClaims } from "@/lib/factcheck";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { claim, lang } = body;
    if (!claim || typeof claim !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: claim (string)" }, { status: 400 });
    }

    const topic = claim.replace(/^(it is|i heard|they say|according to|the fact that)\s*/i, "").replace(/[.!?]+$/, "").trim();

    const [wikidataResults, wikipediaResult, factcheckResults] = await Promise.allSettled([
      queryFacts(claim),
      getSummary(topic, lang || "en"),
      searchClaims(claim),
    ]);

    const wikidata = wikidataResults.status === "fulfilled" ? wikidataResults.value : [];
    const wikipedia = wikipediaResult.status === "fulfilled" ? wikipediaResult.value : null;
    const factcheck = factcheckResults.status === "fulfilled" ? factcheckResults.value : [];

    const hasData = wikidata.length > 0 || wikipedia !== null || factcheck.length > 0;

    if (!hasData) {
      return NextResponse.json({
        success: true, verdict: "unverified", confidence: 0,
        key_facts: [], sources: [],
        explanation: "No supporting evidence found.",
        raw_data: { wikidata, wikipedia, factcheck },
      });
    }

    // Synthesize with LLM
    const wdCtx = wikidata.length > 0
      ? wikidata.map(w => `Entity: ${w.label} (${w.id})\nDescription: ${w.description}\nClaims: ${JSON.stringify(w.claims).slice(0, 500)}`).join("\n\n")
      : "No Wikidata results.";

    const wpCtx = wikipedia
      ? `Title: ${wikipedia.title}\nSummary: ${wikipedia.summary}\nURL: ${wikipedia.url}`
      : "No Wikipedia results.";

    const fcCtx = factcheck.length > 0
      ? factcheck.map(f => `Claim: ${f.text}\nRating: ${f.rating}\nSource: ${f.source}`).join("\n\n")
      : "No existing fact-checks found.";

    const messages = [
      { role: "system" as const, content: "You are a professional fact-checker. Analyze the claim against the evidence and return ONLY a JSON object: {\"verdict\":\"true|false|misleading|unverified\",\"confidence\":0.0,\"key_facts\":[\"fact1\"],\"sources\":[\"url1\"],\"explanation\":\"...\"}" },
      { role: "user" as const, content: `CLAIM: "${claim}"\n\nWIKIDATA:\n${wdCtx}\n\nWIKIPEDIA:\n${wpCtx}\n\nFACT-CHECKS:\n${fcCtx}` },
    ];

    const result = await chat(messages, 512);
    const jsonMatch = result.content.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return NextResponse.json({
      success: true,
      verdict: ["true", "false", "misleading", "unverified"].includes(parsed.verdict) ? parsed.verdict : "unverified",
      confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || 0)),
      key_facts: Array.isArray(parsed.key_facts) ? parsed.key_facts : [],
      sources: Array.isArray(parsed.sources) ? parsed.sources : [],
      explanation: parsed.explanation || "No explanation provided.",
      raw_data: { wikidata, wikipedia, factcheck },
      provider: result.provider,
    });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
