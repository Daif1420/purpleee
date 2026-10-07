"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";

type Line = { id: string; size: string; color: string; qty: number };

export default function AddToCart({ p }: { p: Product }) {
  const [size, setSize] = useState(p.sizes[0]);
  const [color, setColor] = useState(p.colors[0]);
  const [done, setDone] = useState(false);

  const add = () => {
    const cart: Line[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const same = cart.find((l) => l.id === p.id && l.size === size && l.color === color);
    if (same) same.qty = Math.min(10, same.qty + 1);
    else cart.push({ id: p.id, size, color, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    setDone(true);
  };

  return (
    <div>
      <div className="chips">
        {p.colors.map((c) => (
          <button type="button" key={c} className={"chip" + (c === color ? " on" : "")} style={{ border: 0 }} onClick={() => { setColor(c); setDone(false); }}>{c}</button>
        ))}
      </div>
      <div className="chips">
        {p.sizes.map((s) => (
          <button type="button" key={s} className={"chip" + (s === size ? " on" : "")} style={{ border: 0 }} onClick={() => { setSize(s); setDone(false); }}>{s}</button>
        ))}
      </div>
      <button type="button" className="btn" disabled={p.stock === 0} onClick={add}>
        {p.stock === 0 ? "Out of stock" : done ? "Added to cart" : "Add to cart"}
      </button>
    </div>
  );
}
