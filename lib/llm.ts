import type { ChatMessage, LLMResponse } from "./types";

const MIMO_BASE_URL = "https://api.xiaomimimo.com/v1";
const NIM_BASE_URL = "https://integrate.api.nvidia.com/v1";

async function callLLM(
  baseUrl: string,
  apiKey: string,
  model: string,
  messages: ChatMessage[],
  maxTokens: number = 1024,
): Promise<string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers,
    body: JSON.stringify({ model, messages, max_tokens: maxTokens, temperature: 0.3 }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LLM API failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

export async function chat(messages: ChatMessage[], maxTokens?: number): Promise<LLMResponse> {
  const mimoKey = process.env.MIMO_API_KEY;
  if (mimoKey && !mimoKey.startsWith("your-")) {
    try {
      const content = await callLLM(MIMO_BASE_URL, mimoKey, "mimo-v2-flash", messages, maxTokens);
      return { content, provider: "mimo" };
    } catch (e) {
      console.warn(`[MiMo] Failed, trying NIM: ${e}`);
    }
  }

  const nimKey = process.env.NIM_API_KEY || "";
  try {
    const content = await callLLM(NIM_BASE_URL, nimKey, "meta/llama-3.1-8b-instruct", messages, maxTokens);
    return { content, provider: "nim" };
  } catch (e) {
    console.error(`[NIM] Failed: ${e}`);
  }

  throw new Error("No LLM provider available. Set MIMO_API_KEY or NIM_API_KEY.");
}

export async function chatWithModel(
  messages: ChatMessage[],
  model: "flash" | "pro" = "flash",
  maxTokens?: number,
): Promise<LLMResponse> {
  if (model === "pro") {
    const mimoKey = process.env.MIMO_API_KEY;
    if (mimoKey && !mimoKey.startsWith("your-")) {
      try {
        const content = await callLLM(MIMO_BASE_URL, mimoKey, "mimo-v2-pro", messages, maxTokens);
        return { content, provider: "mimo" };
      } catch {
        // fall through to flash
      }
    }
  }
  return chat(messages, maxTokens);
}
