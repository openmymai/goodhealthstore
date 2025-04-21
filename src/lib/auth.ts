// src/lib/auth.ts
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from "next-auth/providers/google"; // Example

// **ข้อควรระวัง:** การใช้ Credentials Provider แบบ Hardcode นี้
// ไม่ปลอดภัยสำหรับ Production! ควรใช้ Database และ Password Hashing (เช่น bcrypt)
// หรือใช้ OAuth Providers แทน

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password' },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, _req): Promise<User | null> {
        // --- !!! นี่คือส่วนที่ต้องแก้ไขสำหรับ Production !!! ---
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!credentials?.username || !credentials?.password) {
          console.log('Credentials missing');
          return null;
        }

        if (
          credentials.username === adminUsername &&
          credentials.password === adminPassword
        ) {
          console.log('Admin login successful');
          const user: User = {
            id: 'admin-user-01',
            name: 'Admin User',
          };
          return user;
        } else {
          console.log('Invalid credentials');
          return null;
        }
        // --- !!! จบส่วนที่ต้องแก้ไขสำหรับ Production !!! ---
      },
    }),
    // GoogleProvider(...)
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin', // ถ้าต้องการสร้างหน้า Login เอง
    // error: '/auth/error',
  },
  // Optional: Callbacks
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) { token.id = user.id; /* token.role = user.role; */ }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (session.user && token.id) { session.user.id = token.id as string; /* session.user.role = token.role; */ }
  //     return session;
  //   },
  // },
};
