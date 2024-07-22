/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.cdn.pixabay.com',
        port: '',
        pathname: '/^\/photo\/.*/',
      },
    ],
  },
};

export default nextConfig;
