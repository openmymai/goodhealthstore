/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  devIndicators: {
    allowedDevOrigins: ["http://localhost:3000", "http://192.168.0.201:3000"], // ใส่ Port ด้วยถ้าเข้าผ่าน Port
  },
};

export default nextConfig;
