import { cookies } from "next/headers";
import { admin } from "@/lib/supabase";
import { categories } from "@/lib/data";
import { login, setStatus, addProduct, deleteProduct } from "./actions";
export const dynamic = "force-dynamic";
const statuses = ["confirmed", "preparing", "shipped", "delivered", "cancelled"];
export default async function Admin() {
  const c = "border border-neutral-300 p-2";
  if ((await cookies()).get("purple_admin")?.value !== process.env.ADMIN_PASSWORD)
    return <main className="max-w-sm mx-auto p-10"><form action={login} className="space-y-3"><input name="pw" type="password" placeholder="Password" className={c + " w-full"} /><button className="btn">دخول</button></form></main>;
  const db = admin();
  const { data: orders } = await db.from("orders").select("*, order_items(*)").order("id", { ascending: false }).limit(50);
  const { data: prods } = await db.from("products").select("slug,name,price,stock").order("created_at", { ascending: false });
  return (<main className="max-w-5xl mx-auto px-4 py-10 space-y-12">
    <section><h1 className="text-2xl font-extrabold mb-4">الطلبات</h1>
      {orders?.map((o) => (<div key={o.id} className="border-b border-neutral-200 py-3 text-sm">
        <b>#{o.id}</b> — {o.name} — {o.phone} — {o.governorate}، {o.address} — <b>{o.total} EGP</b>
        <div className="text-neutral-500">{o.order_items.map((i: { name: string; size: string; qty: number }) => `${i.name} (${i.size}) ×${i.qty}`).join(" • ")}</div>
        <form action={setStatus} className="mt-1 flex gap-2"><input type="hidden" name="id" value={o.id} />
          <select name="status" defaultValue={o.status} className={c}>{statuses.map((s) => <option key={s}>{s}</option>)}</select><button className="btn !py-2">حفظ</button></form></div>))}</section>
    <section><h2 className="text-2xl font-extrabold mb-4">المنتجات</h2>
      <form action={addProduct} className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <input name="name" placeholder="الاسم" required className={c} /><input name="slug" placeholder="slug (إنجليزي)" required className={c} />
        <select name="category" className={c}>{Object.entries(categories).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        <input name="price" type="number" placeholder="السعر" required className={c} /><input name="compare_at" type="number" placeholder="السعر قبل الخصم" className={c} />
        <input name="stock" type="number" placeholder="المخزون" defaultValue={10} className={c} /><input name="sizes" defaultValue="S,M,L,XL" className={c} />
        <input name="image" placeholder="رابط الصورة" required className={c} /><button className="btn col-span-2 md:col-span-4">إضافة منتج</button></form>
      {prods?.map((p) => (<form key={p.slug} action={deleteProduct} className="flex justify-between border-b border-neutral-200 py-2 text-sm">
        <span>{p.name} — {p.price} EGP — مخزون {p.stock}</span><input type="hidden" name="slug" value={p.slug} /><button className="text-red-600">حذف</button></form>))}</section></main>);
}
