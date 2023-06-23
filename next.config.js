/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'cdn.sanity.io',
    //     pathname: '/files/xcmp4e9i/**',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'cdn.sanity.io',
    //     port: '',
    //     pathname: '/images/xcmp4e9i/**',
    //   },
    // ],
    domains: ["cdn.sanity.io"],
  },
};

module.exports = nextConfig;
