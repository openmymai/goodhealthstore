// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Declare a global variable to hold the Prisma client instance
// This prevents creating multiple instances during hot-reloading in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
