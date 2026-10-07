import { NextResponse } from "next/server";
import { createOrder, OrderError, type OrderInput } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: OrderInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  try {
    return NextResponse.json(await createOrder(body));
  } catch (e) {
    if (e instanceof OrderError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
