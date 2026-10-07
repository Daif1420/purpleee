export type Product = { slug: string; name: string; price: number; was?: number; category: string; sizes: string[]; img: string; stock: number };
export const categories: Record<string, string> = { casual: "كاجوال", homewear: "هوم وير", hijab: "حجاب", bags: "شنط" };
export const gov: Record<string, number> = { "القاهرة": 50, "الجيزة": 50, "الإسكندرية": 60, "السويس": 70, "أخرى": 80 };
export const FREE_SHIP = 1000;
