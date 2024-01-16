/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  exportTrailingSlash: false,
  reactStrictMode: true,
  exportMapPath:true,
  images: {
    unoptimized: true,
    domains: ['dashboard.sumotex.co','imgur.com'],
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
