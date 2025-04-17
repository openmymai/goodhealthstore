// app/blog/page.tsx
// SERVER COMPONENT

import React from 'react';
import { Metadata } from 'next';
import { getAllPostsSorted } from '@/lib/posts' // Import function ใหม่
import BlogCard from '@/app/_components/BlogCard'; // Adjust path

export const metadata: Metadata = {
  title: 'บทความสุขภาพ | Organic Store',
  description: 'อ่านบทความล่าสุดเกี่ยวกับสุขภาพ อาหารออร์แกนิก และเคล็ดลับดีๆ จาก Organic Store',
};

// Make the component async to fetch posts
export default async function BlogIndexPage() {
  // Fetch all posts using the new function
  const posts = await getAllPostsSorted();

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-dark mb-8 border-b border-border-color pb-4">
        บทความสุขภาพและไลฟ์สไตล์
      </h1>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            // BlogCard ยังคงรับ post object เหมือนเดิม (แต่ตอนนี้มี contentHtml)
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-body">ยังไม่มีบทความในขณะนี้</p>
        </div>
      )}
    </div>
  );
}