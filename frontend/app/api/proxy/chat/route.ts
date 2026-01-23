import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const url = process.env.AI_SERVICE_URL?.replace(/\/$/, "") + "/chat";
  if (!url) return NextResponse.json({ message: "AI service not configured" }, { status: 500 });
  const resp = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await resp.json().catch(() => ({}));
  return NextResponse.json(data, { status: resp.status });
}
