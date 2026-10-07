import { NextResponse } from "next/server";
import { setupDatabase, usingDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

// One-time: open /api/setup?key=YOUR_SETUP_KEY after deploying. Creates tables + sample products.
export async function GET(req: Request) {
  if (!usingDatabase) {
    return NextResponse.json({ ok: true, note: "No DATABASE_URL set - running with in-memory demo data, nothing to set up." });
  }
  const key = new URL(req.url).searchParams.get("key");
  if (!process.env.SETUP_KEY || key !== process.env.SETUP_KEY) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await setupDatabase();
  return NextResponse.json({ ok: true });
}
