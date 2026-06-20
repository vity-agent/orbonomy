import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";
import { llmCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, task } = body;
    if (!text || typeof text !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: text (string)" }, { status: 400 });
    }

    const classifyTask = task || "sentiment";
    const cacheKey = `classify:${classifyTask}:${text}`;
    const cached = llmCache.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    const taskPrompts: Record<string, string> = {
      sentiment: "Analyze the sentiment of the text. Return JSON: {\"sentiment\": \"positive|negative|neutral\", \"confidence\": 0.0-1.0}",
      intent: "Detect the user intent. Return JSON: {\"intent\": \"...\" , \"confidence\": 0.0-1.0}",
      toxicity: "Check for toxicity. Return JSON: {\"toxic\": true/false, \"severity\": \"none|low|medium|high\", \"categories\": [...]}",
      language: "Detect the language. Return JSON: {\"language\": \"...\" , \"confidence\": 0.0-1.0}",
    };

    const systemPrompt = taskPrompts[classifyTask] || taskPrompts.sentiment;

    const messages = [
      { role: "system" as const, content: `You are a text classifier. ${systemPrompt} Return ONLY valid JSON.` },
      { role: "user" as const, content: text },
    ];

    const result = await chat(messages, 256);
    const response = { success: true, task: classifyTask, result: result.content, provider: result.provider };
    llmCache.set(cacheKey, response);
    return NextResponse.json(response);
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
