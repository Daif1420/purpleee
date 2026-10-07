"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
export default function Cart() {
  const { items, remove } = useCart(); const sub = items.reduce((a, i) => a + i.price * i.qty, 0);
  const left = Math.max(0, 1000 - sub);
  return (<main className="max-w-3xl mx-auto px-4 py-10">
    <h1 className="text-3xl font-extrabold mb-6">السلة</h1>
    {!items.length ? <p>السلة فاضية. <Link href="/casual" className="text-brand underline">ابدأ التسوق</Link></p> : <>
      {left > 0 ? <p className="text-sm bg-brand-light p-3 mb-4">فاضلك {left} جنيه على الشحن المجاني</p> : <p className="text-sm bg-brand-light p-3 mb-4">شحنك مجاني!</p>}
      {items.map((i) => (<div key={i.slug + i.size} className="flex justify-between items-center border-b border-neutral-200 py-4">
        <span>{i.name} — {i.size} × {i.qty}</span><span>{i.price * i.qty} EGP
          <button onClick={() => remove(i.slug, i.size)} className="mr-4 text-neutral-400">حذف</button></span></div>))}
      <p className="text-xl font-bold mt-6">الإجمالي: {sub} EGP</p>
      <Link href="/checkout" className="btn inline-block mt-4">إتمام الطلب</Link></>}</main>);
}
