"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Product, egp } from "@/lib/products";
type Item = { id: string; size: string; color: string; qty: number };
export default function Cart() {
  const [items, setItems] = useState<Item[]>([]);
  const [prods, setProds] = useState<Product[]>([]);
  const [done, setDone] = useState<number | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("cart") || "[]"));
    fetch("/api/products").then(r => r.json()).then(setProds).catch(() => setErr("Could not load products."));
  }, []);
  const save = (n: Item[]) => { setItems(n); localStorage.setItem("cart", JSON.stringify(n)); };
  const find = (id: string) => prods.find(x => x.id === id);
  const total = items.reduce((s, i) => { const p = find(i.id); return s + (p ? (p.salePrice ?? p.price) * i.qty : 0); }, 0);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(""); setBusy(true);
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const r = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, items }) });
    const d = await r.json(); setBusy(false);
    if (!r.ok) return setErr(d.error);
    save([]); setDone(d.orderNumber);
  }
  if (done) return <section><div className="wrap"><h1>Order #{done} confirmed</h1><p>Pay in cash on delivery. We will call you to confirm.</p><Link className="btn" href="/shop">Keep shopping</Link></div></section>;
  if (!items.length) return <section><div className="wrap"><h1>Your cart is empty</h1><Link className="btn" href="/shop">Start shopping</Link></div></section>;
  const inp = { padding: 12, borderRadius: 12, border: "1px solid var(--quartz)", font: "inherit", width: "100%" };
  return (
    <section><div className="wrap" style={{ maxWidth: 720 }}>
      <h1>Cart</h1>
      {items.map((i, k) => { const p = find(i.id); return p && (
        <div className="line" key={k}>
          <div>{p.name}{i.qty > 1 && ` × ${i.qty}`}<br /><small>{i.color} / {i.size}</small></div>
          <div>{egp((p.salePrice ?? p.price) * i.qty)}<br /><button className="chip" style={{ border: 0 }} onClick={() => save(items.filter((_, j) => j !== k))}>Remove</button></div>
        </div>); })}
      <div className="line"><strong>Total</strong><strong>{egp(total)}</strong></div>
      <h2 style={{ marginTop: 32 }}>Delivery details</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input name="name" placeholder="Full name" required style={inp} />
        <input name="phone" placeholder="Phone number" required style={inp} />
        <input name="email" type="email" placeholder="Email (optional)" style={inp} />
        <input name="governorate" placeholder="Governorate" style={inp} />
        <input name="city" placeholder="City" style={inp} />
        <input name="address" placeholder="Street, building, apartment" required style={inp} />
        {err && <p role="alert" style={{ color: "#ba1a1a" }}>{err}</p>}
        <button className="btn" disabled={busy}>{busy ? "Placing order..." : "Place order (cash on delivery)"}</button>
      </form>
    </div></section>
  );
}
