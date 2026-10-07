import { notFound } from "next/navigation";
import { categories } from "@/lib/data";
import { getProducts } from "@/lib/queries";
import ProductCard from "@/components/ProductCard";
export default async function Category({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categories[category]) notFound();
  const list = await getProducts(category);
  return (<main className="max-w-7xl mx-auto px-4 py-10">
    <h1 className="text-3xl font-extrabold mb-8">{categories[category]}</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div></main>);
}
