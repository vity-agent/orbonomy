import type { WikidataEntity, WikidataResult } from "./types";

const WIKIDATA_API = "https://www.wikidata.org/w/api.php";

export async function searchEntities(query: string, limit: number = 5): Promise<WikidataEntity[]> {
  const params = new URLSearchParams({
    action: "wbsearchentities",
    search: query,
    language: "en",
    format: "json",
    limit: String(limit),
    origin: "*",
  });

  const res = await fetch(`${WIKIDATA_API}?${params}`);
  if (!res.ok) throw new Error(`Wikidata search failed: ${res.status}`);

  const data = await res.json();
  return (data.search || []).map((item: Record<string, unknown>) => ({
    id: item.id as string,
    label: (item.label as string) || "",
    description: (item.description as string) || "",
    url: (item.concepturi as string) || `https://www.wikidata.org/wiki/${item.id}`,
  }));
}

export async function getEntityDetails(entityId: string): Promise<WikidataResult> {
  const params = new URLSearchParams({
    action: "wbgetentities",
    ids: entityId,
    languages: "en",
    format: "json",
    origin: "*",
  });

  const res = await fetch(`${WIKIDATA_API}?${params}`);
  if (!res.ok) throw new Error(`Wikidata entity fetch failed: ${res.status}`);

  const data = await res.json();
  const entity = data.entities?.[entityId];
  if (!entity) throw new Error(`Entity ${entityId} not found`);

  return {
    id: entityId,
    label: entity.labels?.en?.value || "",
    description: entity.descriptions?.en?.value || "",
    url: `https://www.wikidata.org/wiki/${entityId}`,
    claims: entity.claims || {},
  };
}

export async function queryFacts(query: string): Promise<WikidataResult[]> {
  const entities = await searchEntities(query, 3);
  const results: WikidataResult[] = [];
  for (const entity of entities) {
    try {
      const details = await getEntityDetails(entity.id);
      results.push(details);
    } catch {
      // skip
    }
  }
  return results;
}
