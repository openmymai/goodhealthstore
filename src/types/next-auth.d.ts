// types/next-auth.d.ts
import { type DefaultSession, type User as DefaultUser } from "next-auth"; // Import type เดิม
import { type DefaultJWT } from "next-auth/jwt"; // Import type JWT เดิม

// ขยาย Type ของ User ที่ใช้ใน Session และ JWT
interface IUser extends DefaultUser {
  id: string; // เพิ่ม property 'id' เข้าไป
  // เพิ่ม properties อื่นๆ ที่คุณอาจจะใส่ใน token/session ได้ตามต้องการ
  // role?: string;
}

// ขยาย Type ของ Session
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: IUser; // กำหนดให้ user ใน Session ใช้ IUser ที่มี id
  }

  // (Optional) ถ้าคุณต้องการเข้าถึง id ผ่าน object user โดยตรงใน callback อื่นๆ
   interface User extends IUser {}
}

// ขยาย Type ของ JWT Token
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string; // เพิ่ม id เข้าไปใน JWT (อาจจะเป็น optional ตอนเริ่มต้น)
    // เพิ่ม properties อื่นๆ ที่คุณใส่ใน token
    // role?: string;
  }
}