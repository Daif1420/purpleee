import type { Product } from "./products";

export const SEED: Product[] = [
  { id: "silk-wrap-dress", name: "Silk Wrap Dress", category: "Clothing", price: 2450, salePrice: 1950, colors: ["Fuchsia", "Plum"], sizes: ["S", "M", "L"], stock: 8, hue: 330 },
  { id: "tailored-blazer", name: "Tailored Blazer", category: "Clothing", price: 3200, colors: ["Black", "Blush"], sizes: ["S", "M", "L", "XL"], stock: 3, hue: 300 },
  { id: "satin-tote", name: "Satin Tote", category: "Bags", price: 1800, colors: ["Fuchsia"], sizes: ["One size"], stock: 12, hue: 320 },
  { id: "mini-clutch", name: "Mini Clutch", category: "Bags", price: 1250, salePrice: 990, colors: ["Plum", "Gold"], sizes: ["One size"], stock: 0, hue: 310 },
  { id: "pearl-hoops", name: "Pearl Hoops", category: "Accessories", price: 650, colors: ["Gold"], sizes: ["One size"], stock: 20, hue: 340 },
  { id: "silk-scarf", name: "Silk Scarf", category: "Accessories", price: 890, colors: ["Fuchsia", "Blush"], sizes: ["One size"], stock: 15, hue: 325 },
];
