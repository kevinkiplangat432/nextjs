/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.gutenberg.org', 'gutendex.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gutenberg.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gutendex.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;