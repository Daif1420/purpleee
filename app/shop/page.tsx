import Link from "next/link";
import Card from "@/components/Card";
import { getProducts } from "@/lib/db";
export const dynamic = "force-dynamic";
const cats = ["Clothing", "Bags", "Accessories"];
export default async function Shop({ searchParams }: { searchParams: Promise<{ cat?: string; sale?: string }> }) {
  const { cat, sale } = await searchParams;
  const list = await getProducts({ cat, sale: !!sale });
  return (
    <section><div className="wrap">
      <h1>Shop</h1>
      <div className="chips">
        <Link href="/shop" className={"chip" + (!cat && !sale ? " on" : "")}>All</Link>
        {cats.map(c => <Link key={c} href={`/shop?cat=${c}`} className={"chip" + (cat === c ? " on" : "")}>{c}</Link>)}
        <Link href="/shop?sale=1" className={"chip" + (sale ? " on" : "")}>Sale</Link>
      </div>
      {list.length ? <div className="grid">{list.map(p => <Card key={p.id} p={p} />)}</div> : <p>No products match. Try another filter.</p>}
    </div></section>
  );
}
