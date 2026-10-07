"use client";
import Link from "next/link";
import { categories } from "@/lib/data";
import { useCart } from "@/lib/cart";
export default function Header() {
  const n = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  return (<>
    <div className="bg-black text-white text-center text-xs py-2">شحن مجاني فوق 1000 جنيه</div>
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-neutral-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
        <Link href="/" className="font-serif text-2xl text-brand font-bold">Purple</Link>
        <nav className="hidden md:flex gap-6 text-sm font-semibold">
          {Object.entries(categories).map(([k, v]) => <Link key={k} href={`/${k}`} className="hover:text-brand">{v}</Link>)}
        </nav>
        <Link href="/cart" className="text-sm font-semibold">السلة ({n})</Link>
      </div></header></>);
}
