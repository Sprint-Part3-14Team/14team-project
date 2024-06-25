/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com' },
    ],
  },
};

export default nextConfig;
