/** @type {import('next').NextConfig} */
const allowedOrigins = ["localhost:3000"];

if (process.env.NEXTAUTH_URL) {
  try {
    allowedOrigins.push(new URL(process.env.NEXTAUTH_URL).host);
  } catch {
    // ignore invalid URL
  }
}

if (process.env.VERCEL_URL) {
  allowedOrigins.push(process.env.VERCEL_URL);
}

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins,
    },
  },
};

export default nextConfig;
