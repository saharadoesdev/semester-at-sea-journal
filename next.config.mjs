/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/country",
        destination: "/route",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
