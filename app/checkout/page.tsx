"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { gov, FREE_SHIP } from "@/lib/data";
import { placeOrder } from "./actions";
export default function Checkout() {
  const { items, clear } = useCart();
  const [f, setF] = useState({ name: "", phone: "", email: "", governorate: "القاهرة", address: "" });
  const [done, setDone] = useState<number | null>(null); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const sub = items.reduce((a, i) => a + i.price * i.qty, 0); const ship = sub >= FREE_SHIP ? 0 : gov[f.governorate];
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  async function submit() {
    setBusy(true); setErr("");
    const r = await placeOrder({ ...f, items: items.map((i) => ({ slug: i.slug, size: i.size, qty: i.qty })) });
    setBusy(false); if (r.id) { setDone(r.id); clear(); } else setErr(r.error ?? "");
  }
  if (done) return <main className="max-w-xl mx-auto p-10 text-center"><h1 className="text-3xl font-extrabold">شكراً لطلبك!</h1><p className="mt-2">رقم الطلب #{done} — الدفع عند الاستلام</p></main>;
  const c = "border border-neutral-300 p-3 w-full";
  return (<main className="max-w-xl mx-auto px-4 py-10">
    <h1 className="text-3xl font-extrabold mb-6">إتمام الطلب</h1>
    <div className="space-y-3">
      <input className={c} placeholder="الاسم" value={f.name} onChange={set("name")} />
      <input className={c} placeholder="الموبايل (01xxxxxxxxx)" inputMode="numeric" value={f.phone} onChange={set("phone")} />
      <input className={c} placeholder="Email (اختياري)" value={f.email} onChange={set("email")} />
      <select className={c} value={f.governorate} onChange={set("governorate")}>{Object.keys(gov).map((k) => <option key={k}>{k}</option>)}</select>
      <input className={c} placeholder="العنوان بالتفصيل" value={f.address} onChange={set("address")} /></div>
    <p className="mt-6 text-sm">الدفع: عند الاستلام (COD)</p>
    <p className="mt-2">المنتجات {sub} + شحن {ship} = <b>{sub + ship} EGP</b></p>
    {err && <p className="mt-2 text-red-600 text-sm">{err}</p>}
    <button disabled={!items.length || busy} className="btn mt-4 disabled:opacity-40" onClick={submit}>{busy ? "جاري الإرسال..." : "تأكيد الطلب"}</button></main>);
}
