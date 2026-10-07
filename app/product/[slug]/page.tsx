import { notFound } from "next/navigation";
import { getProduct } from "@/lib/queries";
import AddToCart from "@/components/AddToCart";
export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();
  return (<main className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={p.img} alt={p.name} className="w-full aspect-[3/4] object-cover" />
    <div><h1 className="text-3xl font-extrabold">{p.name}</h1>
      <p className="mt-2 text-xl font-semibold">{p.price} EGP {p.was && <s className="text-neutral-400 text-base">{p.was}</s>}</p>
      <AddToCart p={p} /></div></main>);
}
