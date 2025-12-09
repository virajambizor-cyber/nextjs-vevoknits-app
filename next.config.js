// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // disables ESLint during next build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // disables TypeScript type-checking errors during next build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
