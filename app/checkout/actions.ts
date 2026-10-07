"use server";
import { admin } from "@/lib/supabase";
import { gov, FREE_SHIP } from "@/lib/data";
type In = { name: string; phone: string; email?: string; governorate: string; address: string; items: { slug: string; size: string; qty: number }[] };
export async function placeOrder(i: In): Promise<{ id?: number; error?: string }> {
  if (!i.name.trim() || !/^01\d{9}$/.test(i.phone) || !i.address.trim() || !i.items.length) return { error: "كمّل البيانات (الموبايل لازم يبدأ بـ 01 وطوله 11 رقم)" };
  const db = admin();
  const { data: ps } = await db.from("products").select("slug,name,price,stock").in("slug", i.items.map((x) => x.slug));
  const lines = i.items.map((x) => { const p = ps?.find((q) => q.slug === x.slug); return p && x.qty > 0 && p.stock >= x.qty ? { ...x, name: p.name, price: p.price } : null; });
  if (lines.some((l) => !l)) return { error: "منتج غير متاح بالكمية المطلوبة" };
  const ok = lines as NonNullable<(typeof lines)[number]>[];
  const subtotal = ok.reduce((a, l) => a + l.price * l.qty, 0); // السعر من السيرفر مش من العميل
  const shipping = subtotal >= FREE_SHIP ? 0 : gov[i.governorate] ?? gov["أخرى"];
  const { data: o, error } = await db.from("orders").insert({ name: i.name, phone: i.phone, email: i.email || null, governorate: i.governorate, address: i.address, subtotal, shipping, total: subtotal + shipping }).select("id").single();
  if (error || !o) return { error: "حصلت مشكلة، حاول تاني" };
  await db.from("order_items").insert(ok.map((l) => ({ order_id: o.id, product_slug: l.slug, name: l.name, size: l.size, qty: l.qty, price: l.price })));
  for (const l of ok) { const p = ps!.find((q) => q.slug === l.slug)!; await db.from("products").update({ stock: p.stock - l.qty }).eq("slug", l.slug); }
  return { id: o.id };
}
