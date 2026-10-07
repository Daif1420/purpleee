import Link from "next/link";
import Card from "@/components/Card";
import { getProducts } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function Home() {
  const products = await getProducts({ limit: 4 });
  return (
    <>
      <div className="hero"><div className="wrap">
        <h1>Dressed for the evening ahead</h1>
        <p>Clothing, bags and accessories in the colors of Purple.</p>
        <Link className="btn" href="/shop">Shop the collection</Link>
      </div></div>
      <section><div className="wrap">
        <div className="row"><h2>New arrivals</h2><Link href="/shop" className="btn alt">View all</Link></div>
        <div className="grid" style={{ marginTop: 20 }}>{products.map(p => <Card key={p.id} p={p} />)}</div>
      </div></section>
    </>
  );
}
