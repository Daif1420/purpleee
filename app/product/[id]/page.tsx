import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import { egp, stockState } from "@/lib/products";
import { getProduct } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p) notFound();
  return (
    <section><div className="wrap detail">
      <div style={{ aspectRatio: "3/4", borderRadius: 12, background: `linear-gradient(160deg,hsl(${p.hue} 70% 88%),hsl(${p.hue} 60% 62%))` }} />
      <div>
        <h1>{p.name}</h1>
        <p className="price" style={{ fontSize: 22 }}>{egp(p.salePrice ?? p.price)}{p.salePrice && <span className="old">{egp(p.price)}</span>}</p>
        <p>{stockState(p.stock)}</p>
        <AddToCart p={p} />
      </div>
    </div></section>
  );
}
