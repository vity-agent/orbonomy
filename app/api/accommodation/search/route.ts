import { NextRequest, NextResponse } from "next/server";
import { searchHotels } from "@/lib/hotels";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { location, checkin, checkout, adults, budget, limit } = body;
    if (!location || typeof location !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: location (string)" }, { status: 400 });
    }
    const result = await searchHotels({ location, checkin, checkout, adults, budget, limit });
    return NextResponse.json({ success: true, data: result });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
