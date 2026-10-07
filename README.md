# Purple (Next.js + TypeScript + Postgres)

## Local (no database needed)
    npm install
    npm run dev
Open http://localhost:3000. Without `DATABASE_URL` the store runs on in-memory demo products (orders reset when the server restarts).

To use a real database locally: `cp .env.example .env.local`, fill `DATABASE_URL` (Neon), restart, then open `/api/setup?key=YOUR_SETUP_KEY` once.

## Deploy (Vercel)
1. Push to GitHub, then Vercel > Add New > Project > Import.
2. Storage > Create Database > Neon (adds DATABASE_URL automatically).
3. Add `SETUP_KEY` (long random string) in Environment Variables, redeploy.
4. Open `https://YOUR-SITE.vercel.app/api/setup?key=YOUR_SETUP_KEY` once.
