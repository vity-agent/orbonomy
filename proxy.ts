1|1|import { paymentProxy } from "@x402/next";
2|2|import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
3|3|import { ExactEvmScheme } from "@x402/evm/exact/server";
4|4|
5|5|const WALLET_ADDRESS = process.env.PAY_TO_ADDRESS || "0xe53cf11c367390122af3431b7c47d323f9ccbf38";
6|6|const FACILITATOR_URL = process.env.FACILITATOR_URL || "https://facilitator.payai.network";
7|7|const NETWORK = (process.env.NETWORK || "eip155:8453") as "eip155:8453" | "eip155:84532";
8|8|
9|9|const facilitatorClient = new HTTPFacilitatorClient({ url: FACILITATOR_URL });
10|10|const server = new x402ResourceServer(facilitatorClient);
11|11|server.register(NETWORK, new ExactEvmScheme());
12|12|
13|13|export const proxy = paymentProxy({
14|14|  // ACCOMMODATION
15|15|  "/api/accommodation/search": {
16|16|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
17|17|    description: "Search hotels, villas, and accommodations worldwide",
18|18|    mimeType: "application/json",
19|19|  },
20|20|  "/api/accommodation/details": {
21|21|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
22|22|    description: "Get full property details, amenities, photos, and reviews",
23|23|    mimeType: "application/json",
24|24|  },
25|25|  "/api/accommodation/compare": {
26|26|    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
27|27|    description: "Compare prices across multiple booking sources",
28|28|    mimeType: "application/json",
29|29|  },
30|30|  "/api/accommodation/nearby": {
31|31|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
32|32|    description: "Find points of interest around a location",
33|33|    mimeType: "application/json",
34|34|  },
35|35|  "/api/accommodation/reviews": {
36|36|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
37|37|    description: "AI-summarized reviews for properties",
38|38|    mimeType: "application/json",
39|39|  },
40|40|  "/api/accommodation/deals": {
41|41|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
42|42|    description: "Find best deals and discounts for a destination",
43|43|    mimeType: "application/json",
44|44|  },
45|45|  "/api/accommodation/itinerary": {
46|46|    accepts: [{ scheme: "exact", price: "$0.25", network: NETWORK, payTo: WALLET_ADDRESS }],
47|47|    description: "Plan a full itinerary with accommodation and activities",
48|48|    mimeType: "application/json",
49|49|  },
50|50|  "/api/accommodation/full": {
51|51|    accepts: [{ scheme: "exact", price: "$0.50", network: NETWORK, payTo: WALLET_ADDRESS }],
52|52|    description: "All-in-one: search + details + nearby + transport + deals",
53|53|    mimeType: "application/json",
54|54|  },
55|55|
56|56|  // LLM
57|57|  "/api/llm/chat": {
58|58|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
59|59|    description: "General-purpose chat completion",
60|60|    mimeType: "application/json",
61|61|  },
62|62|  "/api/llm/think": {
63|63|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
64|64|    description: "Deep reasoning and complex analysis",
65|65|    mimeType: "application/json",
66|66|  },
67|67|  "/api/llm/search": {
68|68|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
69|69|    description: "Web search with AI synthesis",
70|70|    mimeType: "application/json",
71|71|  },
72|72|  "/api/llm/code": {
73|73|    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
74|74|    description: "Code review and security analysis",
75|75|    mimeType: "application/json",
76|76|  },
77|77|  "/api/llm/translate": {
78|78|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
79|79|    description: "Translation across 50+ languages",
80|80|    mimeType: "application/json",
81|81|  },
82|82|  "/api/llm/summarize": {
83|83|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
84|84|    description: "Document and text summarization",
85|85|    mimeType: "application/json",
86|86|  },
87|87|  "/api/llm/extract": {
88|88|    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
89|89|    description: "Structured data extraction from text",
90|90|    mimeType: "application/json",
91|91|  },
92|92|  "/api/llm/analyze": {
93|93|    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
94|94|    description: "Multimodal analysis (text, image, code)",
95|95|    mimeType: "application/json",
96|96|  },
97|97|  "/api/llm/generate": {
98|98|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
99|99|    description: "Generate structured content (JSON, CSV, Markdown, HTML)",
100|100|    mimeType: "application/json",
101|101|  },
102|102|  "/api/llm/rewrite": {
103|103|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
104|104|    description: "Rewrite text in different styles and tones",
105|105|    mimeType: "application/json",
106|106|  },
107|107|  "/api/llm/classify": {
108|108|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
109|109|    description: "Text classification: sentiment, intent, toxicity, language",
110|110|    mimeType: "application/json",
111|111|  },
112|112|  "/api/llm/pipeline": {
113|113|    accepts: [{ scheme: "exact", price: "$0.15", network: NETWORK, payTo: WALLET_ADDRESS }],
114|114|    description: "Multi-step AI pipeline (up to 5 steps)",
115|115|    mimeType: "application/json",
116|116|  },
117|117|  "/api/llm/batch": {
118|118|    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
119|119|    description: "Batch processing (up to 10 items)",
120|120|    mimeType: "application/json",
121|121|  },
122|122|
123|123|  // CONTENT
124|124|  "/api/content/draft": {
125|125|    accepts: [{ scheme: "exact", price: "$0.15", network: NETWORK, payTo: WALLET_ADDRESS }],
126|126|    description: "Generate first draft from brief or outline",
127|127|    mimeType: "application/json",
128|128|  },
129|129|  "/api/content/longform": {
130|130|    accepts: [{ scheme: "exact", price: "$0.15", network: NETWORK, payTo: WALLET_ADDRESS }],
131|131|    description: "Long-form content: articles, essays, reports",
132|132|    mimeType: "application/json",
133|133|  },
134|134|  "/api/content/broadcast": {
135|135|    accepts: [{ scheme: "exact", price: "$0.15", network: NETWORK, payTo: WALLET_ADDRESS }],
136|136|    description: "Press releases and broadcast communications",
137|137|    mimeType: "application/json",
138|138|  },
139|139|  "/api/content/bulletin": {
140|140|    accepts: [{ scheme: "exact", price: "$0.15", network: NETWORK, payTo: WALLET_ADDRESS }],
141|141|    description: "News bulletins and updates",
142|142|    mimeType: "application/json",
143|143|  },
144|144|  "/api/content/digest": {
145|145|    accepts: [{ scheme: "exact", price: "$0.15", network: NETWORK, payTo: WALLET_ADDRESS }],
146|146|    description: "Weekly/monthly digest compilation",
147|147|    mimeType: "application/json",
148|148|  },
149|149|  "/api/content/distill": {
150|150|    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
151|151|    description: "Distill complex text into key points",
152|152|    mimeType: "application/json",
153|153|  },
154|154|  "/api/content/reword": {
155|155|    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
156|156|    description: "Rephrase while preserving meaning",
157|157|    mimeType: "application/json",
158|158|  },
159|159|  "/api/content/shift-tone": {
160|160|    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
161|161|    description: "Shift tone: formal, casual, academic, creative",
162|162|    mimeType: "application/json",
163|163|  },
164|164|  "/api/content/snippet": {
165|165|    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
166|166|    description: "Generate SEO-optimized snippets",
167|167|    mimeType: "application/json",
168|168|  },
169|169|  "/api/content/headline": {
170|170|    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
171|171|    description: "Generate headlines and titles",
172|172|    mimeType: "application/json",
173|173|  },
174|174|  "/api/content/audit": {
175|175|    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
176|176|    description: "Content quality audit with scoring",
177|177|    mimeType: "application/json",
178|178|  },
179|179|  "/api/content/clean": {
180|180|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
181|181|    description: "Fix grammar, punctuation, formatting",
182|182|    mimeType: "application/json",
183|183|  },
184|184|  "/api/content/vibe-check": {
185|185|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
186|186|    description: "Check tone and brand voice consistency",
187|187|    mimeType: "application/json",
188|188|  },
189|189|
190|190|  // FACTCHECK
191|191|  "/api/factcheck/verify": {
192|192|    accepts: [{ scheme: "exact", price: "$0.10", network: NETWORK, payTo: WALLET_ADDRESS }],
193|193|    description: "Multi-source fact verification with AI synthesis",
194|194|    mimeType: "application/json",
195|195|  },
196|196|  "/api/factcheck/search": {
197|197|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
198|198|    description: "Search Wikidata for entities and structured facts",
199|199|    mimeType: "application/json",
200|200|  },
201|201|  "/api/factcheck/summary": {
202|202|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
203|203|    description: "Get Wikipedia article summary for a topic",
204|204|    mimeType: "application/json",
205|205|  },
206|206|  "/api/factcheck/claims": {
207|207|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
208|208|    description: "Search existing fact-checks from major organizations",
209|209|    mimeType: "application/json",
210|210|  },
211|211|
212|212|  // DATA
213|213|  "/api/data/geo": {
214|214|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
215|215|    description: "Geocoding and location intelligence",
216|216|    mimeType: "application/json",
217|217|  },
218|218|  "/api/data/finance": {
219|219|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
220|220|    description: "Stock and market data",
221|221|    mimeType: "application/json",
222|222|  },
223|223|  "/api/data/news": {
224|224|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
225|225|    description: "Aggregated news with sentiment analysis",
226|226|    mimeType: "application/json",
227|227|  },
228|228|  "/api/data/weather": {
229|229|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
230|230|    description: "Weather forecasts and historical data",
231|231|    mimeType: "application/json",
232|232|  },
233|233|  "/api/data/crypto": {
234|234|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
235|235|    description: "Cryptocurrency prices and market data",
236|236|    mimeType: "application/json",
237|237|  },
238|238|  "/api/data/dns": {
239|239|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
240|240|    description: "DNS records lookup",
241|241|    mimeType: "application/json",
242|242|  },
243|243|  "/api/data/whois": {
244|244|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
245|245|    description: "Domain WHOIS lookup",
246|246|    mimeType: "application/json",
247|247|  },
248|248|  "/api/data/company": {
249|249|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
250|250|    description: "Company information and enrichment",
251|251|    mimeType: "application/json",
252|252|  },
253|253|  "/api/data/events": {
254|254|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
255|255|    description: "Event discovery and tracking",
256|256|    mimeType: "application/json",
257|257|  },
258|258|  "/api/data/trends": {
259|259|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
260|260|    description: "Trending topics and social signals",
261|261|    mimeType: "application/json",
262|262|  },
263|263|  "/api/data/marketplace": {
264|264|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
265|265|    description: "Marketplace listing search and comparison",
266|266|    mimeType: "application/json",
267|267|  },
268|268|  "/api/data/catalog": {
269|269|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
270|270|    description: "Product catalog search and metadata",
271|271|    mimeType: "application/json",
272|272|  },
273|273|
274|274|  // BOT BAIT - cheap, instant responses
275|275|  "/api/health": {
276|276|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
277|277|    description: "Service health check",
278|278|    mimeType: "application/json",
279|279|  },
280|280|  "/api/status": {
281|281|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
282|282|    description: "Service status and uptime",
283|283|    mimeType: "application/json",
284|284|  },
285|285|  "/api/info": {
286|286|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
287|287|    description: "Service information and version",
288|288|    mimeType: "application/json",
289|289|  },
290|290|  "/api/pricing": {
291|291|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
292|292|    description: "All endpoint pricing",
293|293|    mimeType: "application/json",
294|294|  },
295|295|  "/api/models": {
296|296|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
297|297|    description: "Available AI models and tiers",
298|298|    mimeType: "application/json",
299|299|  },
300|300|  "/api/capabilities": {
301|301|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
302|302|    description: "Service capabilities and supported features",
303|303|    mimeType: "application/json",
304|304|  },
305|305|  "/api/endpoints": {
306|306|    accepts: [{ scheme: "exact", price: "$0.05", network: NETWORK, payTo: WALLET_ADDRESS }],
307|307|    description: "List all available endpoints with descriptions",
308|308|    mimeType: "application/json",
309|309|  },
310|310|}, server);
311|311|
312|312|export const config = { matcher: ["/api/:path*"] };
313|313|