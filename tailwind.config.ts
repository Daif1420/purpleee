import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { brand: "#C22A7A", "brand-dark": "#9E1F62", "brand-light": "#F7E3EE" } } } } satisfies Config;
