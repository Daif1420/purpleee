import Link from "next/link";
import { categories } from "@/lib/data";
import { getProducts } from "@/lib/queries";
import ProductCard from "@/components/ProductCard";
export const revalidate = 60;
export default async function Home() {
  const products = await getProducts(undefined, 4);
  return (<main>
    <section className="bg-brand text-white py-28 px-6 text-center">
      <h1 className="font-serif text-5xl md:text-7xl font-bold">Purple</h1>
      <p className="mt-4 text-lg">ستايلك اليومي في مكان واحد</p>
      <Link href="/casual" className="btn mt-8 inline-block">تسوق الآن</Link>
    </section>
    <section className="grid grid-cols-2 md:grid-cols-4">
      {Object.entries(categories).map(([k, v], i) => (
        <Link key={k} href={`/${k}`} className="relative aspect-[3/4] block group overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://picsum.photos/seed/cat${i}/600/800`} alt={v} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          <span className="absolute bottom-4 right-4 bg-white px-4 py-2 text-sm font-bold">{v}</span>
        </Link>))}
    </section>
    <section className="max-w-7xl mx-auto px-4 mt-16">
      <h2 className="text-2xl font-extrabold mb-6">وصل حديثاً</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{products.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
    </section></main>);
}
