// src/app/api/products/[productId]/route.ts
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ productId: string }>; // Define params as a Promise
}

export const revalidate = 60; // Revalidate cache every 60 seconds

// GET handler to fetch a single published product by ID or SLUG
export async function GET(
  request: NextRequest, // Or use Request if preferred
  context: RouteContext
) {
  try {
    const { productId: idOrSlug } = await context.params;
    let product;
    // Try fetching by ID first if it's a number
    const productId = parseInt(idOrSlug);
    if (!isNaN(productId)) {
      product = await prisma.product.findFirst({
        where: { id: productId, isPublished: true },
        include: { category: { select: { name: true, slug: true } } }, // Include category details
      });
    }

    // If not found by ID or if idOrSlug is not a number, try fetching by slug
    if (!product) {
      product = await prisma.product.findFirst({
        where: { slug: idOrSlug, isPublished: true },
        include: { category: { select: { name: true, slug: true } } },
      });
    }

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found or not published' },
        { status: 404 }
      );
    }

    // Convert Decimal for response
    const responseProduct = { ...product, price: product.price.toString() };
    return NextResponse.json(responseProduct);
  } catch (error) {
    console.error(`API Error fetching product:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
