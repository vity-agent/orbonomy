export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMResponse {
  content: string;
  provider: "mimo" | "nim";
}

export interface PipelineStep {
  id: string;
  prompt: string;
  model?: "flash" | "pro";
  use_previous?: boolean;
}

export interface BatchItem {
  id: string;
  prompt: string;
}

export interface WikidataEntity {
  id: string;
  label: string;
  description: string;
  url: string;
}

export interface WikidataResult extends WikidataEntity {
  claims: Record<string, unknown>;
}

export interface WikipediaResult {
  title: string;
  summary: string;
  url: string;
  image: string | null;
  lastEdited: string;
}

export interface FactCheckResult {
  text: string;
  claimant: string;
  rating: string;
  url: string;
  source: string;
}

export interface VerifyResponse {
  success: boolean;
  verdict: "true" | "false" | "misleading" | "unverified";
  confidence: number;
  key_facts: string[];
  sources: string[];
  explanation: string;
  raw_data: {
    wikidata: WikidataResult[];
    wikipedia: WikipediaResult | null;
    factcheck: FactCheckResult[];
  };
}
