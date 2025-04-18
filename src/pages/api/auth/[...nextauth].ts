// pages/api/auth/[...nextauth].ts
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter'; // Import จาก @next-auth/prisma-adapter
import prisma from '@/lib/prisma'; // Adjust path if needed
import bcrypt from 'bcryptjs';
import type { User } from 'next-auth'; // Import User type

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          console.log("Authorize: Missing credentials");
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        if (!user || !user.password) {
          console.log("Authorize: User not found or no password");
          return null;
        }
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (isValid) {
          console.log("Authorize: User authorized");
          // Return user object (v4 ต้องการ id, name, email, image)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } else {
          console.log("Authorize: Invalid password");
          return null;
        }
      }
    }),
    // Add other providers here
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // เพิ่ม user id เข้าไปใน JWT token
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session?.user) {
        session.user.id = token.id as string; // เอา user id จาก token มาใส่ใน session
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // หน้า Login
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === 'development',
};

// Export default function ที่เรียก NextAuth(authOptions)
export default NextAuth(authOptions);