export type Product = { id: string; name: string; category: "Clothing" | "Bags" | "Accessories"; price: number; salePrice?: number; colors: string[]; sizes: string[]; stock: number; hue: number };
export const egp = (n: number) => `EGP ${n.toLocaleString("en-US")}`;
export const stockState = (s: number) => (s === 0 ? "Out of stock" : s <= 5 ? "Low stock" : "In stock");
