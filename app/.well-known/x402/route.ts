import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.redirect(new URL("/openapi.json", "https://orbonomy.vercel.app"));
}
