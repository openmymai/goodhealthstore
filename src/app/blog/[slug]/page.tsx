// app/blog/[slug]/page.tsx
// SERVER COMPONENT

import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

// Import functions and type from lib/posts
import { getPostData, getAllPostSlugs } from '@/lib/posts'; // Adjust path
import type { Post } from '@/types/post'; // Adjust path

// --- Props Type ---
interface PostPageProps {
  params: { slug: string }; // Params are resolved in Server Components
}

// --- generateStaticParams ---
export async function generateStaticParams() {
  const slugs = getAllPostSlugs(); // Get slugs from markdown files
  return slugs; // Return array like [{ slug: '...' }, ...]
}

// --- generateMetadata ---
export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostData(slug); // Fetch post data for metadata
    return {
      title: post.metaTitle || `${post.title} | Organic Store`,
      description: post.metaDescription || post.excerpt,
      // Add other metadata like openGraph, twitter cards etc.
    };
  } catch (error) {
    // Handle case where post is not found during metadata generation
    return { title: 'Article Not Found' };
  }
}

// --- Page Component (Make it async) ---
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  let post: Post;

  try {
    // Fetch post data (including processed HTML content)
    post = await getPostData(slug);
  } catch (error) {
    // If getPostData throws an error (e.g., file not found), trigger 404
    notFound();
  }

  const formattedDate = format(new Date(post.publishedDate), 'dd MMMM yyyy');

  return (
    <div className='container mx-auto px-4 lg:px-8 py-10 md:py-16 max-w-4xl'>
      <article>
        {/* Header */}
        <header className='mb-8'>
          {/* Category */}
          {/* Optional: Link to a category page if you implement it */}
          <span className='text-sm font-semibold text-primary uppercase mb-2 inline-block'>
            {post.category}
          </span>
          {/* Title */}
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3 leading-tight'>
            {post.title}
          </h1>
          {/* Meta */}
          <div className='flex items-center gap-4 text-sm text-body'>
            <span className='flex items-center gap-1'>
              <svg
                className='w-4 h-4'
                aria-hidden='true'
              >
                <use xlinkHref='#user'></use>
              </svg>
              By {post.author}
            </span>
            <span className='flex items-center gap-1'>
              <svg
                className='w-4 h-4'
                aria-hidden='true'
              >
                <use xlinkHref='#calendar'></use>
              </svg>
              {formattedDate}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <figure className='mb-8 rounded-lg overflow-hidden'>
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={800}
            height={450}
            className='w-full h-auto object-cover'
            priority
          />
        </figure>

        {/* Content - Render the processed HTML */}
        <div
          className='prose prose-lg max-w-none' // Apply typography styles
          dangerouslySetInnerHTML={{ __html: post.contentHtml }} // IMPORTANT
        />

        {/* Tags (Optional) */}
        {post.tags && post.tags.length > 0 && (
          <div className='mt-8 pt-6 border-t border-border-color'>
            <span className='font-semibold text-dark mr-2'>Tags:</span>
            {post.tags.map((tag) => (
              <span // Changed to span as tag pages aren't implemented yet
                key={tag}
                // href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className='inline-block bg-gray-100 text-body rounded-full px-3 py-1 text-sm mr-2 mb-2'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
