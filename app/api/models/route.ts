import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({
    success: true,
    models: {
      flash: { name: "Flash", tier: "standard", description: "Fast inference for everyday tasks", max_tokens: 4096 },
      pro: { name: "Pro", tier: "premium", description: "Deep reasoning and complex analysis", max_tokens: 8192 },
    },
    default: "flash",
  });
}
