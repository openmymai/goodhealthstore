// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// ใช้ declare global เพื่อให้ TypeScript รู้จัก prisma แม้จะอยู่นอก module scope
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// สร้าง instance หรือใช้ instance ที่มีอยู่แล้ว (ป้องกันการสร้างซ้ำใน development hot-reload)
export const prisma =
  global.prisma ||
  new PrismaClient({
    // Optional: เปิด log การ query ใน development
    // log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// ถ้าอยู่ใน development ให้เก็บ instance ไว้ใน global object
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Export instance ที่สร้างขึ้น
export default prisma;