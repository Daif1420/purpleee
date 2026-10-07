"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { admin } from "@/lib/supabase";
async function guard() { if ((await cookies()).get("purple_admin")?.value !== process.env.ADMIN_PASSWORD) throw new Error("unauthorized"); }
export async function login(fd: FormData) {
  if (fd.get("pw") === process.env.ADMIN_PASSWORD) (await cookies()).set("purple_admin", String(fd.get("pw")), { httpOnly: true, secure: true, sameSite: "strict", path: "/admin" });
  revalidatePath("/admin");
}
export async function setStatus(fd: FormData) { await guard(); await admin().from("orders").update({ status: String(fd.get("status")) }).eq("id", Number(fd.get("id"))); revalidatePath("/admin"); }
export async function addProduct(fd: FormData) {
  await guard(); const n = (k: string) => Number(fd.get(k));
  await admin().from("products").insert({ slug: String(fd.get("slug")), name: String(fd.get("name")), category: String(fd.get("category")),
    price: n("price"), compare_at: n("compare_at") || null, stock: n("stock"), sizes: String(fd.get("sizes")).split(",").map((s) => s.trim()), images: [String(fd.get("image"))] });
  revalidatePath("/admin"); revalidatePath("/");
}
export async function deleteProduct(fd: FormData) { await guard(); await admin().from("products").delete().eq("slug", String(fd.get("slug"))); revalidatePath("/admin"); revalidatePath("/"); }
