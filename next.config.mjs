/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
  images: {
    domains: [
      "ktixvtejyglnseqaoyds.supabase.co"
    ],
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
