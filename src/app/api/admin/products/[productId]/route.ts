// src/app/api/admin/products/[productId]/route.ts
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { Decimal } from '@prisma/client/runtime/library';

type RouteHandlerContext = {
  params: Promise<{ productId: string }>; // Define params as a Promise
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// GET handler to fetch a single product by ID for admin
export async function GET(request: NextRequest, context: RouteHandlerContext) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { productId: idStr } = await context.params;
    const productId = parseInt(idStr);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID format' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: { select: { id: true, name: true } } }, // Include category info
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    // Convert Decimal for response
    const responseProduct = { ...product, price: product.price.toString() };
    return NextResponse.json(responseProduct);
  } catch (error) {
    console.error(`API Error fetching product (admin):`, error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT handler to update a product by ID
export async function PUT(request: NextRequest, context: RouteHandlerContext) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { productId: idStr } = await context.params;
    const productId = parseInt(idStr);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID format' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Validation (similar to POST)
    if (
      !data.name ||
      !data.description ||
      data.price === undefined ||
      data.stockQuantity === undefined
    ) {
      return NextResponse.json(
        { error: 'Name, Description, Price, and Stock Quantity are required' },
        { status: 400 }
      );
    }

    let priceDecimal: Decimal;
    try {
      priceDecimal = new Decimal(data.price);
      if (priceDecimal.isNaN() || priceDecimal.isNegative()) throw new Error();
    } catch {
      return NextResponse.json(
        { error: 'Invalid price format.' },
        { status: 400 }
      );
    }

    const stockQuantity = parseInt(data.stockQuantity);
    if (isNaN(stockQuantity) || stockQuantity < 0) {
      return NextResponse.json(
        { error: 'Invalid stock quantity.' },
        { status: 400 }
      );
    }

    // Note: Slug is not updated automatically here. Add logic if needed.

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        description: data.description,
        price: priceDecimal,
        imageUrl: data.imageUrl || null,
        stockQuantity: stockQuantity,
        isPublished: data.isPublished || false,
        sku: data.sku || null,
        categoryId: data.categoryId ? parseInt(data.categoryId) : null,
      },
    });
    // Convert Decimal for response
    const responseProduct = {
      ...updatedProduct,
      price: updatedProduct.price.toString(),
    };
    return NextResponse.json(responseProduct);
  } catch (error: unknown) {
    console.error(`API Error updating product`, error);
    if (typeof error === 'object' && error !== null && 'code' in error) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      if (error.code === 'P2003') {
        return NextResponse.json(
          { error: 'Invalid Category ID.' },
          { status: 400 }
        );
      }
    }
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to update product: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// DELETE handler to delete a product by ID
export async function DELETE(
  request: NextRequest,
  context: RouteHandlerContext
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { productId: idStr } = await context.params;
    const productId = parseInt(idStr);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID format' },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id: productId },
    });
    return new Response(null, { status: 204 });
  } catch (error: unknown) {
    console.error(`API Error deleting product:`, error);
    if (typeof error === 'object' && error !== null && 'code' in error) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
    }
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to delete product: ${errorMessage}` },
      { status: 500 }
    );
  }
}
