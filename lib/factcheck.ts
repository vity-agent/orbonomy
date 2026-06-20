import type { FactCheckResult } from "./types";

const FACTCHECK_API = "https://factchecktools.googleapis.com/v1alpha1/claims:search";

export async function searchClaims(query: string): Promise<FactCheckResult[]> {
  const apiKey = process.env.FACTCHECK_API_KEY;
  if (!apiKey || apiKey.startsWith("your-")) return [];

  const params = new URLSearchParams({ query, key: apiKey, languageCode: "en" });
  const res = await fetch(`${FACTCHECK_API}?${params}`);
  if (!res.ok) return [];

  const data = await res.json();
  return (data.claims || []).map((claim: Record<string, unknown>) => {
    const review = ((claim.claimReview as Record<string, unknown>[]) || [])[0] || {};
    return {
      text: (claim.text as string) || "",
      claimant: (claim.claimant as string) || "",
      rating: (review.textualRating as string) || "",
      url: (review.url as string) || "",
      source: ((review.publisher as Record<string, unknown>)?.name as string) || "",
    };
  });
}
