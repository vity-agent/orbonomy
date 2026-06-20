import type { WikipediaResult } from "./types";

export async function getSummary(topic: string, lang: string = "en"): Promise<WikipediaResult | null> {
  const encodedTopic = encodeURIComponent(topic.replace(/ /g, "_"));
  const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodedTopic}`;

  const res = await fetch(url, {
    headers: { "User-Agent": "Orbonomy/1.0 (fact-check API)" },
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Wikipedia API failed: ${res.status}`);
  }

  const data = await res.json();
  return {
    title: data.title || topic,
    summary: data.extract || "",
    url: data.content_urls?.desktop?.page || `https://${lang}.wikipedia.org/wiki/${encodedTopic}`,
    image: data.thumbnail?.source || null,
    lastEdited: data.timestamp || "",
  };
}
