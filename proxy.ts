import { paymentProxy } from "@x402/next";
import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";

const WALLET_ADDRESS = process.env.PAY_TO_ADDRESS || "0xe53cf11c367390122af3431b7c47d323f9ccbf38";
const FACILITATOR_URL = process.env.FACILITATOR_URL || "https://facilitator.payai.network";
const NETWORK = (process.env.NETWORK || "eip155:8453") as "eip155:8453" | "eip155:84532";

const facilitatorClient = new HTTPFacilitatorClient({ url: FACILITATOR_URL });
const server = new x402ResourceServer(facilitatorClient);
server.register(NETWORK, new ExactEvmScheme());

export const proxy = paymentProxy({
  // ACCOMMODATION (8)
  "/api/accommodation/search": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Search hotels, villas, and accommodations worldwide",
    mimeType: "application/json",
  },
  "/api/accommodation/details": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Get full property details, amenities, photos, and reviews",
    mimeType: "application/json",
  },
  "/api/accommodation/compare": {
    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Compare prices across multiple booking sources",
    mimeType: "application/json",
  },
  "/api/accommodation/nearby": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Find points of interest around a location",
    mimeType: "application/json",
  },
  "/api/accommodation/reviews": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "AI-summarized reviews for properties",
    mimeType: "application/json",
  },
  "/api/accommodation/deals": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Find best deals and discounts for a destination",
    mimeType: "application/json",
  },
  "/api/accommodation/itinerary": {
    accepts: [{ scheme: "exact", price: "$0.25", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Plan a full itinerary with accommodation and activities",
    mimeType: "application/json",
  },
  "/api/accommodation/full": {
    accepts: [{ scheme: "exact", price: "$0.50", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "All-in-one: search + details + nearby + transport + deals",
    mimeType: "application/json",
  },

  // LLM (13)
  "/api/llm/chat": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "General-purpose chat completion",
    mimeType: "application/json",
  },
  "/api/llm/think": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Deep reasoning and complex analysis",
    mimeType: "application/json",
  },
  "/api/llm/search": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Web search with AI synthesis",
    mimeType: "application/json",
  },
  "/api/llm/code": {
    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Code review and security analysis",
    mimeType: "application/json",
  },
  "/api/llm/translate": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Translation across 50+ languages",
    mimeType: "application/json",
  },
  "/api/llm/summarize": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Document and text summarization",
    mimeType: "application/json",
  },
  "/api/llm/extract": {
    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Structured data extraction from text",
    mimeType: "application/json",
  },
  "/api/llm/analyze": {
    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Multimodal analysis (text, image, code)",
    mimeType: "application/json",
  },
  "/api/llm/generate": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Generate structured content (JSON, CSV, Markdown, HTML)",
    mimeType: "application/json",
  },
  "/api/llm/rewrite": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Rewrite text in different styles and tones",
    mimeType: "application/json",
  },
  "/api/llm/classify": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Text classification: sentiment, intent, toxicity, language",
    mimeType: "application/json",
  },
  "/api/llm/pipeline": {
    accepts: [{ scheme: "exact", price: "$0.15", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Multi-step AI pipeline (up to 5 steps)",
    mimeType: "application/json",
  },
  "/api/llm/batch": {
    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Batch processing (up to 10 items)",
    mimeType: "application/json",
  },

  // CONTENT (13)
  "/api/content/draft": {
    accepts: [{ scheme: "exact", price: "$0.15", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Generate first draft from brief or outline",
    mimeType: "application/json",
  },
  "/api/content/longform": {
    accepts: [{ scheme: "exact", price: "$0.15", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Long-form content: articles, essays, reports",
    mimeType: "application/json",
  },
  "/api/content/broadcast": {
    accepts: [{ scheme: "exact", price: "$0.15", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Press releases and broadcast communications",
    mimeType: "application/json",
  },
  "/api/content/bulletin": {
    accepts: [{ scheme: "exact", price: "$0.15", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "News bulletins and updates",
    mimeType: "application/json",
  },
  "/api/content/digest": {
    accepts: [{ scheme: "exact", price: "$0.15", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Weekly/monthly digest compilation",
    mimeType: "application/json",
  },
  "/api/content/distill": {
    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Distill complex text into key points",
    mimeType: "application/json",
  },
  "/api/content/reword": {
    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Rephrase while preserving meaning",
    mimeType: "application/json",
  },
  "/api/content/shift-tone": {
    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Shift tone: formal, casual, academic, creative",
    mimeType: "application/json",
  },
  "/api/content/snippet": {
    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Generate SEO-optimized snippets",
    mimeType: "application/json",
  },
  "/api/content/headline": {
    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Generate headlines and titles",
    mimeType: "application/json",
  },
  "/api/content/audit": {
    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Content quality audit with scoring",
    mimeType: "application/json",
  },
  "/api/content/clean": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Fix grammar, punctuation, formatting",
    mimeType: "application/json",
  },
  "/api/content/vibe-check": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Check tone and brand voice consistency",
    mimeType: "application/json",
  },

  // FACTCHECK (4)
  "/api/factcheck/verify": {
    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Multi-source fact verification with AI synthesis",
    mimeType: "application/json",
  },
  "/api/factcheck/search": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Search Wikidata for entities and structured facts",
    mimeType: "application/json",
  },
  "/api/factcheck/summary": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Get Wikipedia article summary for a topic",
    mimeType: "application/json",
  },
  "/api/factcheck/claims": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Search existing fact-checks from major organizations",
    mimeType: "application/json",
  },

  // DATA (12)
  "/api/data/geo": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Geocoding and location intelligence",
    mimeType: "application/json",
  },
  "/api/data/finance": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Stock and market data",
    mimeType: "application/json",
  },
  "/api/data/news": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Aggregated news with sentiment analysis",
    mimeType: "application/json",
  },
  "/api/data/weather": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Weather forecasts and historical data",
    mimeType: "application/json",
  },
  "/api/data/crypto": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Cryptocurrency prices and market data",
    mimeType: "application/json",
  },
  "/api/data/dns": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "DNS records lookup",
    mimeType: "application/json",
  },
  "/api/data/whois": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Domain WHOIS lookup",
    mimeType: "application/json",
  },
  "/api/data/company": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Company information and enrichment",
    mimeType: "application/json",
  },
  "/api/data/events": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Event discovery and tracking",
    mimeType: "application/json",
  },
  "/api/data/trends": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Trending topics and social signals",
    mimeType: "application/json",
  },
  "/api/data/marketplace": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Marketplace listing search and comparison",
    mimeType: "application/json",
  },
  "/api/data/catalog": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Product catalog search and metadata",
    mimeType: "application/json",
  },

  // UTILITY (7) — bot bait
  "/api/health": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Service health check",
    mimeType: "application/json",
  },
  "/api/status": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Service status and uptime",
    mimeType: "application/json",
  },
  "/api/info": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Service information and version",
    mimeType: "application/json",
  },
  "/api/pricing": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "All endpoint pricing",
    mimeType: "application/json",
  },
  "/api/models": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Available AI models and tiers",
    mimeType: "application/json",
  },
  "/api/capabilities": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "Service capabilities and supported features",
    mimeType: "application/json",
  },
  "/api/endpoints": {
    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
    description: "List all available endpoints with descriptions",
    mimeType: "application/json",
  },
}, server);

export const config = { matcher: ["/api/:path*"] };
