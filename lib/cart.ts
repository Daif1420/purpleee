"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./data";
export type Line = { slug: string; name: string; price: number; img: string; size: string; qty: number };
type S = { items: Line[]; add: (p: Product, size: string) => void; remove: (slug: string, size: string) => void; clear: () => void };
export const useCart = create<S>()(persist((set) => ({ items: [],
  add: (p, size) => set((s) => { const f = s.items.find((i) => i.slug === p.slug && i.size === size);
    return { items: f ? s.items.map((i) => (i === f ? { ...i, qty: i.qty + 1 } : i)) : [...s.items, { slug: p.slug, name: p.name, price: p.price, img: p.img, size, qty: 1 }] }; }),
  remove: (slug, size) => set((s) => ({ items: s.items.filter((i) => !(i.slug === slug && i.size === size)) })),
  clear: () => set({ items: [] }) }), { name: "purple-cart" }));
