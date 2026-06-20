import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({
    success: true,
    service: "Orbonomy",
    version: "1.0.0",
    status: "operational",
    uptime: Math.floor(process.uptime()),
    memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + "MB",
    timestamp: new Date().toISOString(),
  });
}
