import "./globals.css";
import Header from "@/components/Header";
export const metadata = { title: "Purple", description: "كاجوال • هوم وير • حجاب • شنط" };
export default function Root({ children }: { children: React.ReactNode }) {
  return (<html lang="ar" dir="rtl"><body><Header />{children}
    <footer className="mt-20 border-t border-neutral-200 py-10 text-center text-sm text-neutral-500">© Purple</footer></body></html>);
}
