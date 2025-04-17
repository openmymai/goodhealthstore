// components/BlogCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/types/post'; // Adjust path
import { format } from 'date-fns'; // ใช้ date-fns สำหรับ format วันที่ (npm install date-fns)

interface BlogCardProps {
  post: Post;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  // Format วันที่ให้อ่านง่าย
  const formattedDate = format(new Date(post.publishedDate), 'dd MMM yyyy'); // เช่น 26 Jul 2024

  return (
    <article className="group flex flex-col bg-white rounded-lg shadow-custom-light hover:shadow-custom-hover transition-shadow duration-300 overflow-hidden h-full">
      {/* Image */}
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={400} // กำหนดขนาดที่เหมาะสม
          height={250}
          className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" // Zoom effect
        />
      </Link>

      {/* Content */}
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-body mb-2 uppercase">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" aria-hidden="true"><use xlinkHref="#calendar"></use></svg>
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
             <svg className="w-4 h-4" aria-hidden="true"><use xlinkHref="#category"></use></svg>
             {/* Optional: Link to category page */}
             {/* <Link href={`/blog/category/${post.category.toLowerCase()}`} className="hover:text-primary">{post.category}</Link> */}
             {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-dark mb-2 leading-snug">
          <Link href={`/blog/${post.slug}`} className="group-hover:text-primary transition-colors duration-200">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-body line-clamp-3 mb-4 flex-grow"> {/* line-clamp จำกัดจำนวนบรรทัด */}
          {post.excerpt}
        </p>

        {/* Read More Button */}
        <div className="mt-auto"> {/* ทำให้ปุ่มอยู่ด้านล่าง */}
          <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-primary hover:underline">
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;