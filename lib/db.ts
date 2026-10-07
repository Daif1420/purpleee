import { neon } from "@neondatabase/serverless";
import type { Product } from "./products";
import { SEED } from "./seed";

export type CartLine = { id: string; size: string; color: string; qty: number };
export type OrderInput = {
  name?: string;
  phone?: string;
  email?: string;
  governorate?: string;
  city?: string;
  address?: string;
  items?: CartLine[];
};
export type ProductFilter = { cat?: string; sale?: boolean; limit?: number };

export class OrderError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

// With DATABASE_URL -> Neon Postgres. Without it -> in-memory demo data (handy for localhost).
const url = process.env.DATABASE_URL;
const db = url ? neon(url) : null;
export const usingDatabase = db !== null;

// ---------- in-memory fallback (survives dev hot-reloads) ----------
const g = globalThis as unknown as { __purple?: { products: Product[]; nextOrder: number } };
const mem = (g.__purple ??= { products: SEED.map((p) => ({ ...p })), nextOrder: 1 });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toProduct = (r: any): Product => ({
  id: r.id,
  name: r.name,
  category: r.category,
  price: r.price,
  salePrice: r.sale_price ?? undefined,
  colors: r.colors,
  sizes: r.sizes,
  stock: r.stock,
  hue: r.hue,
});

const clampQty = (n: number) => Math.max(1, Math.min(10, Math.floor(n || 1)));

// ---------- products ----------
export async function getProducts({ cat, sale = false, limit = 100 }: ProductFilter = {}): Promise<Product[]> {
  if (!db) {
    return mem.products
      .filter((p) => (!cat || p.category === cat) && (!sale || p.salePrice !== undefined))
      .slice(0, limit);
  }
  const rows = await db`
    SELECT * FROM products
    WHERE (${cat ?? null}::text IS NULL OR category = ${cat ?? null})
      AND (${sale}::boolean = false OR sale_price IS NOT NULL)
    ORDER BY created_at DESC, name
    LIMIT ${limit}`;
  return rows.map(toProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!db) return mem.products.find((p) => p.id === id) ?? null;
  const rows = await db`SELECT * FROM products WHERE id = ${id}`;
  return rows[0] ? toProduct(rows[0]) : null;
}

// ---------- orders ----------
export async function createOrder(input: OrderInput): Promise<{ orderNumber: number; total: number }> {
  const { name, phone, address, items } = input;
  if (!name || !phone || !address || !items?.length) {
    throw new OrderError("Name, phone, address and at least one item are required.");
  }

  // Prices are always read server-side, never trusted from the client.
  const lines: { product: Product; item: CartLine; qty: number; price: number }[] = [];
  for (const item of items) {
    const qty = clampQty(item.qty);
    const product = await getProduct(item.id);
    if (!product || product.stock < qty) {
      throw new OrderError(`${product?.name ?? item.id} is not available in that quantity.`, 409);
    }
    lines.push({ product, item, qty, price: product.salePrice ?? product.price });
  }
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);

  if (!db) {
    for (const l of lines) mem.products.find((p) => p.id === l.product.id)!.stock -= l.qty;
    return { orderNumber: mem.nextOrder++, total };
  }

  const [order] = await db`
    INSERT INTO orders (name, phone, email, governorate, city, address, total)
    VALUES (${name}, ${phone}, ${input.email ?? null}, ${input.governorate ?? null}, ${input.city ?? null}, ${address}, ${total})
    RETURNING id`;
  for (const l of lines) {
    await db`
      INSERT INTO order_items (order_id, product_id, name, size, color, qty, price)
      VALUES (${order.id}, ${l.product.id}, ${l.product.name}, ${l.item.size}, ${l.item.color}, ${l.qty}, ${l.price})`;
    await db`UPDATE products SET stock = stock - ${l.qty} WHERE id = ${l.product.id} AND stock >= ${l.qty}`;
  }
  return { orderNumber: order.id, total };
}

// ---------- one-time setup ----------
export async function setupDatabase() {
  if (!db) return;
  await db`CREATE TABLE IF NOT EXISTS products (
    id text PRIMARY KEY, name text NOT NULL, category text NOT NULL, price int NOT NULL, sale_price int,
    colors text[] NOT NULL, sizes text[] NOT NULL, stock int NOT NULL DEFAULT 0, hue int NOT NULL DEFAULT 320,
    created_at timestamptz DEFAULT now())`;
  await db`CREATE TABLE IF NOT EXISTS orders (
    id serial PRIMARY KEY, name text NOT NULL, phone text NOT NULL, email text, governorate text, city text,
    address text NOT NULL, payment_method text NOT NULL DEFAULT 'Cash on Delivery', total int NOT NULL,
    status text NOT NULL DEFAULT 'Pending', created_at timestamptz DEFAULT now())`;
  await db`CREATE TABLE IF NOT EXISTS order_items (
    id serial PRIMARY KEY, order_id int NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id text NOT NULL, name text NOT NULL, size text, color text, qty int NOT NULL, price int NOT NULL)`;
  for (const p of SEED) {
    await db`
      INSERT INTO products (id, name, category, price, sale_price, colors, sizes, stock, hue)
      VALUES (${p.id}, ${p.name}, ${p.category}, ${p.price}, ${p.salePrice ?? null}, ${p.colors}, ${p.sizes}, ${p.stock}, ${p.hue})
      ON CONFLICT (id) DO NOTHING`;
  }
}
