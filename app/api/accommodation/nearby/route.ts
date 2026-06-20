import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { location, radius, type } = body;
    if (!location || typeof location !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: location (string)" }, { status: 400 });
    }

    const poiType = type || "restaurants, attractions, shopping";
    const messages = [
      { role: "system" as const, content: "You are a local area expert. List nearby points of interest with names, distances, and brief descriptions. Return as JSON array." },
      { role: "user" as const, content: `Find ${poiType} near ${location}. Radius: ${radius || "5km"}. Return JSON with name, type, distance, description, rating_estimate.` },
    ];

    const result = await chat(messages, 2048);
    return NextResponse.json({ success: true, location, points_of_interest: result.content, provider: result.provider });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
