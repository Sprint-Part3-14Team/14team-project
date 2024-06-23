/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // TODO - 추후 제거 필요
    remotePatterns: [{ hostname: 'raw.githubusercontent.com' }],
  },
};

export default nextConfig;
