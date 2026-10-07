import { supabase } from "./supabase";
import type { Product } from "./data";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toProduct = (r: any): Product => ({ slug: r.slug, name: r.name, price: r.price, was: r.compare_at ?? undefined,
  category: r.category, sizes: r.sizes, img: r.images?.[0] ?? "https://picsum.photos/600/800", stock: r.stock });
export async function getProducts(category?: string, limit?: number) {
  let q = supabase.from("products").select("*").order("created_at", { ascending: false });
  if (category) q = q.eq("category", category);
  if (limit) q = q.limit(limit);
  const { data } = await q; return (data ?? []).map(toProduct);
}
export async function getProduct(slug: string) {
  const { data } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
  return data ? toProduct(data) : null;
}
