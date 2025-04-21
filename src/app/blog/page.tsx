// src/app/blog/page.tsx
// import Link from 'next/link';
// import Image from 'next/image';
import prisma from '@/lib/prisma'; // Import Prisma client instance
import BlogPostCard from '@/components/BlogPostCard'; // Import the card component

// Revalidate data periodically (e.g., every hour) or on-demand
export const revalidate = 3600; // seconds

async function getPublishedPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true }, // Only get published posts
      orderBy: {
        publishedAt: 'desc', // Order by publication date, newest first
      },
      // Select only the fields needed for the list view
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        imageUrl: true,
        publishedAt: true,
        createdAt: true, // Or publishedAt
      },
    });
    return posts;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return []; // Return empty array on error
  }
}

export default async function BlogListPage() {
  const posts = await getPublishedPosts();

  return (
    <div className='container-lg mx-auto px-4 py-12'>
      <h1 className='text-4xl font-heading font-bold mb-8 text-center text-secondary'>
        บทความสุขภาพน่ารู้
      </h1>

      {posts.length === 0 ? (
        <p className='text-center text-gray-600'>ยังไม่มีบทความในขณะนี้</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {posts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      )}

      {/* TODO: Add Pagination later */}
    </div>
  );
}
