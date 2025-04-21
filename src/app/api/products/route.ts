// src/app/api/products/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const revalidate = 60; // Revalidate cache every 60 seconds

// GET handler to fetch published products for the shop page
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isPublished: true }, // Only published products
      orderBy: { createdAt: 'desc' },
      select: {
        // Select only necessary fields for the list view
        id: true,
        name: true,
        slug: true,
        price: true,
        imageUrl: true,
        // Add category slug/name if needed for filtering/display
        // category: { select: { slug: true, name: true } }
      },
    });
    // Convert Decimal for response
    const productsWithStringPrice = products.map((p) => ({
      ...p,
      price: p.price.toString(),
    }));
    return NextResponse.json(productsWithStringPrice);
  } catch (error) {
    console.error('API Error fetching published products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
