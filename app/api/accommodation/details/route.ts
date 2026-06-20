import { NextRequest, NextResponse } from "next/server";
import { getHotelDetails } from "@/lib/hotels";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { hotel_id } = body;
    if (!hotel_id) {
      return NextResponse.json({ success: false, error: "Missing required field: hotel_id" }, { status: 400 });
    }
    const result = await getHotelDetails(String(hotel_id));
    if (!result) return NextResponse.json({ success: false, error: "Hotel not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: result });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
