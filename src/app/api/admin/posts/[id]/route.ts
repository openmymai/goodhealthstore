// src/app/api/admin/posts/[id]/route.ts
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next'; // Import
import { authOptions } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json(
        { error: 'Invalid post ID format' },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(`API Error fetching post:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// --- Using the standard { params } destructuring with explicit inline type ---
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json(
        { error: 'Invalid post ID format' },
        { status: 400 }
      );
    }
    const data = await request.json();
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: 'Title and Content are required' },
        { status: 400 }
      );
    }

    const currentPost = await prisma.post.findUnique({ where: { id: postId } });
    let publishedAtUpdate: Date | null | undefined = undefined;
    if (currentPost && data.published === true && !currentPost.published) {
      publishedAtUpdate = new Date();
    } else if (data.published === false) {
      publishedAtUpdate = null;
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || data.content.substring(0, 150),
        imageUrl: data.imageUrl || null,
        published: data.published || false,
        publishedAt: publishedAtUpdate,
      },
    });
    return NextResponse.json(updatedPost);
  } catch (error: unknown) {
    console.error(`API Error updating post:`, error);
    if (typeof error === 'object' && error !== null && 'code' in error) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
    }
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to update post: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// --- Using the standard { params } destructuring with explicit inline type ---
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json(
        { error: 'Invalid post ID format' },
        { status: 400 }
      );
    }
    await prisma.post.delete({
      where: { id: postId },
    });
    return new Response(null, { status: 204 });
  } catch (error: unknown) {
    console.error(`API Error deleting post:`, error);
    if (typeof error === 'object' && error !== null && 'code' in error) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
    }
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to delete post: ${errorMessage}` },
      { status: 500 }
    );
  }
}
