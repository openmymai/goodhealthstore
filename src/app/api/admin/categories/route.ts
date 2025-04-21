// src/app/api/admin/categories/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET handler to fetch all categories for dropdowns etc.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }, // Order alphabetically
      select: {
        id: true,
        name: true, // Only need id and name for the dropdown
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('API Error fetching categories (admin):', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// Optional: Add POST, PUT, DELETE later if you want to manage categories via API too
