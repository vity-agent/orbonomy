import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({ success: true, status: "healthy", uptime: process.uptime(), timestamp: new Date().toISOString() });
}
