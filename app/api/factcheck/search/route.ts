import { NextRequest, NextResponse } from "next/server";
import { searchEntities } from "@/lib/wikidata";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, limit } = body;
    if (!query || typeof query !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: query (string)" }, { status: 400 });
    }
    const entities = await searchEntities(query, limit || 5);
    return NextResponse.json({ success: true, entities });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
