// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
// import GoogleProvider from "next-auth/providers/google"; // Example for later

// **ข้อควรระวัง:** การใช้ Credentials Provider แบบ Hardcode นี้
// ไม่ปลอดภัยสำหรับ Production! ควรใช้ Database และ Password Hashing (เช่น bcrypt)
// หรือใช้ OAuth Providers แทน

// Export handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
