import { NextRequest, NextResponse } from "next/server";
import { searchClaims } from "@/lib/factcheck";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;
    if (!query || typeof query !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: query (string)" }, { status: 400 });
    }
    const claims = await searchClaims(query);
    return NextResponse.json({ success: true, claims });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
