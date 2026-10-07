import { NextResponse } from "next/server";
import { getProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const products = await getProducts({
    cat: params.get("cat") ?? undefined,
    sale: params.get("sale") === "1",
  });
  return NextResponse.json(products);
}
