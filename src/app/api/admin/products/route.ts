// src/app/api/admin/products/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import slugify from 'slugify';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { Decimal } from '@prisma/client/runtime/library'; // Import Decimal

// GET handler to fetch all products for admin view
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    // Basic Auth check
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: { select: { name: true } } }, // Include category name
    });
    // Convert Decimal to string for JSON serialization safety
    const productsWithStringPrice = products.map((p) => ({
      ...p,
      price: p.price.toString(),
    }));
    return NextResponse.json(productsWithStringPrice);
  } catch (error) {
    console.error('API Error fetching products (admin):', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST handler to create a new product
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Basic validation
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

    // Validate and convert price
    let priceDecimal: Decimal;
    try {
      priceDecimal = new Decimal(data.price);
      if (priceDecimal.isNaN() || priceDecimal.isNegative()) {
        throw new Error('Invalid price format.');
      }
    } catch {
      return NextResponse.json(
        { error: 'Invalid price format. Please enter a valid number.' },
        { status: 400 }
      );
    }

    // Validate stock quantity
    const stockQuantity = parseInt(data.stockQuantity);
    if (isNaN(stockQuantity) || stockQuantity < 0) {
      return NextResponse.json(
        {
          error: 'Invalid stock quantity. Please enter a non-negative integer.',
        },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = slugify(data.name, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
    let uniqueSlug = slug;
    let counter = 1;
    while (await prisma.product.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        slug: uniqueSlug,
        description: data.description,
        price: priceDecimal, // Use the validated Decimal
        imageUrl: data.imageUrl || null,
        stockQuantity: stockQuantity, // Use the validated integer
        isPublished: data.isPublished || false,
        sku: data.sku || null,
        categoryId: data.categoryId ? parseInt(data.categoryId) : null, // Handle optional category ID
      },
    });

    // Convert Decimal back to string for response
    const responseProduct = {
      ...newProduct,
      price: newProduct.price.toString(),
    };
    return NextResponse.json(responseProduct, { status: 201 });
  } catch (error) {
    console.error('API Error creating product:', error);
    // Handle specific errors e.g., Foreign Key constraint if categoryId is invalid
    if (error instanceof Error && 'code' in error && error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Invalid Category ID provided.' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
