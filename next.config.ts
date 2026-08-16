import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enabled dynamic Node.js server routes for Vercel & Nodemailer API execution
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
