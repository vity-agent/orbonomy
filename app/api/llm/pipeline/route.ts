import { NextRequest, NextResponse } from "next/server";
import { chatWithModel } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { initial_input, steps } = body;
    if (!initial_input || typeof initial_input !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: initial_input (string)" }, { status: 400 });
    }
    if (!steps || !Array.isArray(steps) || steps.length === 0) {
      return NextResponse.json({ success: false, error: "Missing required field: steps (array, max 5)" }, { status: 400 });
    }
    if (steps.length > 5) {
      return NextResponse.json({ success: false, error: "Maximum 5 steps allowed" }, { status: 400 });
    }

    const results: Array<{ id: string; output: string; provider: string }> = [];
    let currentInput = initial_input;

    for (const step of steps) {
      let prompt = step.prompt;
      if (step.use_previous) {
        prompt = prompt.replace(/\{\{(\w+)\}\}/g, (_: string, id: string) => {
          const prev = results.find(r => r.id === id);
          return prev ? prev.output : `{{${id}}}`;
        });
      }

      const messages = [
        { role: "system" as const, content: "You are a processing step in a pipeline. Complete the task precisely." },
        { role: "user" as const, content: `${prompt}\n\nInput: ${currentInput}` },
      ];

      const result = await chatWithModel(messages, step.model || "flash", 2048);
      results.push({ id: step.id, output: result.content, provider: result.provider });
      currentInput = result.content;
    }

    return NextResponse.json({ success: true, steps: results, final_output: currentInput });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
