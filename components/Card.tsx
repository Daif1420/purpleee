import Link from "next/link";
import { Product, egp, stockState } from "@/lib/products";
export default function Card({ p }: { p: Product }) {
  const off = p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0;
  return (
    <Link href={`/product/${p.id}`} className="card">
      <div className="img" style={{ background: `linear-gradient(160deg,hsl(${p.hue} 70% 88%),hsl(${p.hue} 60% 62%))` }}>
        {off > 0 && <span className="tag">-{off}%</span>}
        {p.stock === 0 && <span className="tag" style={{ top: "auto", bottom: 10 }}>Out of stock</span>}
      </div>
      <h3>{p.name}</h3>
      <div className="price">{egp(p.salePrice ?? p.price)}{p.salePrice && <span className="old">{egp(p.price)}</span>}</div>
      <small>{stockState(p.stock)}</small>
    </Link>
  );
}
