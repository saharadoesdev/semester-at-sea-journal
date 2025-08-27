/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
  images: {
    remotePatterns: [
    {
      protocol: "https",
      hostname: "ktixvtejyglnseqaoyds.supabase.co",
      pathname: "/storage/v1/object/public/images/**",
    },
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
