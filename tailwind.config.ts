import type { Config } from "tailwindcss";

const config: Config = {
  // HAPA NDIO MUHIMU: Tunaiambia Tailwind isome mafaili yote ndani ya folder la 'app' na 'components'
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;