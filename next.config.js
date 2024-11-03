/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skraa.dronepoul.com',
        pathname: '/_next/image/**',
      },
    ],
  },
};

module.exports = nextConfig;