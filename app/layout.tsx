import "./globals.css";
import Link from "next/link";
export const metadata = { title: "Purple", description: "Clothing, bags and accessories" };
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header><div className="wrap">
          <Link href="/" className="logo">Purple</Link>
          <nav><Link href="/shop">Shop</Link><Link href="/shop">New arrivals</Link><Link href="/shop?sale=1">Sale</Link><Link href="/cart">Cart</Link></nav>
        </div></header>
        <main>{children}</main>
        <footer><div className="wrap">© Purple. Shipping, returns and FAQ pages are next on the list.</div></footer>
      </body>
    </html>
  );
}
