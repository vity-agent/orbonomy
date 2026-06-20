import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, type } = body;
    if (!domain || typeof domain !== "string") {
      return NextResponse.json({ success: false, error: "Missing required field: domain (string)" }, { status: 400 });
    }

    const recordType = type || "A";
    const url = `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${recordType}`;
    const res = await fetch(url);
    if (!res.ok) return NextResponse.json({ success: false, error: "DNS API error" }, { status: 502 });

    const data = await res.json();
    return NextResponse.json({ success: true, domain, type: recordType, records: data.Answer || [] });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
