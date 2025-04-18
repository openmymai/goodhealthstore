// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust path if needed
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // --- Basic Server-side Validation ---
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' }, { status: 400 });
    }
    if (password.length < 6) {
        return NextResponse.json({ message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร' }, { status: 400 });
    }
    // Add more robust validation (e.g., email format) if needed
    // ---------------------------------

    // --- Check if user already exists ---
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'อีเมลนี้ถูกใช้งานแล้ว' }, { status: 409 }); // 409 Conflict
    }
    // ---------------------------------

    // --- Hash the password ---
    const saltRounds = 10; // Recommended salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // -------------------------

    // --- Create the user ---
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        // emailVerified: null, // Set emailVerified later if using email verification
      },
    });
    // -----------------------

    // Important: Don't return the password hash
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
        { message: 'ลงทะเบียนสำเร็จ', user: userWithoutPassword },
        { status: 201 } // 201 Created
    );

  } catch (error) {
    console.error("Registration API Error:", error);
    return NextResponse.json({ message: 'เกิดข้อผิดพลาดในการลงทะเบียน' }, { status: 500 });
  }
}