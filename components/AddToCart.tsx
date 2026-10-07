"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/data";
export default function AddToCart({ p }: { p: Product }) {
  const [size, setSize] = useState(p.sizes[1]); const add = useCart((s) => s.add); const r = useRouter();
  return (<div className="mt-6">
    <p className="text-sm mb-2">المقاس</p>
    <div className="flex gap-2">{p.sizes.map((s) => (
      <button key={s} onClick={() => setSize(s)} className={`w-12 h-12 border ${s === size ? "bg-black text-white border-black" : "border-neutral-300"}`}>{s}</button>))}</div>
    <div className="mt-6 flex gap-3">
      <button disabled={p.stock<1} className="btn disabled:opacity-40" onClick={() => add(p, size)}>{p.stock<1 ? "Sold Out" : "أضف للسلة"}</button>
      <button className="btn !bg-brand" onClick={() => { add(p, size); r.push("/checkout"); }}>اشتري الآن</button></div></div>);
}
