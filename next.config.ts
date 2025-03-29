import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol:"https",
        hostname:"res.cloudinary.com",
        port: "",
        pathname:"dlhalfm24"
      }
    ]
  },
};

export default nextConfig;
