// src/app/api/admin/posts/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import slugify from 'slugify';
import { getServerSession } from 'next-auth/next'; // Import
import { authOptions } from '@/lib/auth';

// GET handler to fetch all posts for admin view
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc', // Show newest first in admin
      },
      select: {
        // Select only necessary fields for the list
        id: true,
        title: true,
        slug: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('API Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST handler to create a new post
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await request.json();

    // Basic validation
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: 'Title and Content are required' },
        { status: 400 }
      );
    }

    // Generate slug (ensure it's unique)
    const slug = slugify(data.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
    let uniqueSlug = slug;
    let counter = 1;
    while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const newPost = await prisma.post.create({
      data: {
        title: data.title,
        slug: uniqueSlug, // Use the generated unique slug
        content: data.content,
        excerpt: data.excerpt || data.content.substring(0, 150), // Auto-generate excerpt if not provided
        imageUrl: data.imageUrl || null,
        published: data.published || false, // Default to unpublished
        publishedAt: data.published ? new Date() : null,
        // createdAt and updatedAt are handled automatically
      },
    });

    return NextResponse.json(newPost, { status: 201 }); // 201 Created
  } catch (error) {
    console.error('API Error creating post:', error);
    // Handle potential unique constraint errors etc. if needed
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
