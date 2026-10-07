# Purple — Next.js + Supabase
1. اعمل مشروع على supabase.com، افتح SQL Editor والصق `supabase/schema.sql` واضغط Run.
2. من Project Settings > API خد: Project URL و anon key و service_role key.
3. انسخ `.env.example` إلى `.env.local` واملا القيم (وغيّر ADMIN_PASSWORD).
4. `npm install && npm run dev` — الأدمن على `/admin`.
5. للنشر: ارفع على GitHub واربطه بـ Vercel وحط نفس الـ env variables.
مهم: service_role key سيرفر فقط، ماتحطوش بـ NEXT_PUBLIC.
