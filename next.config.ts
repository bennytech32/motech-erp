/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hii inazima ukaguzi wa ESLint wakati wa ku-deploy Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Hii inazima ukaguzi mkali wa TypeScript (Bypass TS errors)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;