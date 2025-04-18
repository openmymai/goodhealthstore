// next.config.mjs (หรือ .js)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // เพิ่มบรรทัดนี้เข้าไป
  output: 'standalone',
  // ... การตั้งค่าอื่นๆ ของคุณ (ถ้ามี) เช่น reactStrictMode, images, etc.
  reactStrictMode: true,
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  images: {
    // ระบุขนาด Device มาตรฐาน (Next.js มีค่า default อยู่แล้ว)
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // ระบุขนาด Image ที่จะ Generate เพิ่มเติม (นอกเหนือจาก deviceSizes)
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // ระบุ Domain ที่อนุญาตให้โหลดรูป (ถ้าใช้รูปจากภายนอก)
    // domains: ['example.com'],
    // ระบุ Format ที่ต้องการให้ Next.js สร้าง (default คือ ['image/webp'])
    formats: ['image/avif', 'image/webp'], // ให้ AVIF มาก่อน (ถ้า Browser รองรับ)
    // ตั้งค่าคุณภาพ Default (ถ้าไม่ได้ระบุใน <Image>)
    // quality: 75,
  },
};

export default nextConfig;
