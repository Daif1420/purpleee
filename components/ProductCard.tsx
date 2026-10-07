import Link from "next/link";
import type { Product } from "@/lib/data";
export default function ProductCard({ p }: { p: Product }) {
  return (<Link href={`/product/${p.slug}`} className="block group">
    <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
      {p.was && <span className="absolute top-2 right-2 bg-brand text-white text-xs px-2 py-1">-{Math.round((1 - p.price / p.was) * 100)}%</span>}
    </div>
    <p className="mt-2 text-sm">{p.name}</p>
    <p className="text-sm font-semibold">{p.price} EGP {p.was && <s className="text-neutral-400 font-normal">{p.was}</s>}</p>
  </Link>);
}
