/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['dashboard.SUMO.work','imgur.com'],
  },
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
};

module.exports = nextConfig;
