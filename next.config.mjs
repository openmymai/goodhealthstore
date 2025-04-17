// next.config.mjs (หรือ .js)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // เพิ่มบรรทัดนี้เข้าไป
  output: 'standalone',
  // ... การตั้งค่าอื่นๆ ของคุณ (ถ้ามี) เช่น reactStrictMode, images, etc.
  reactStrictMode: true,
};

export default nextConfig;
