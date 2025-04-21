// src/components/BlogPostCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@prisma/client'; // Import the Post type

// Define the props type, selecting only necessary fields
interface BlogPostCardProps {
  post: Pick<
    Post,
    | 'id'
    | 'title'
    | 'slug'
    | 'excerpt'
    | 'imageUrl'
    | 'publishedAt'
    | 'createdAt'
  >;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  console.log('BlogPostCard received post:', post);
  console.log('Slug value:', post.slug);

  const displayDate = post.publishedAt || post.createdAt; // Use publishedAt if available

  const formattedDate = displayDate
    ? new Date(displayDate).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'ไม่ระบุวันที่';

  const postUrl =
    post && post.slug && post.slug.trim() !== ''
      ? `/blog/${post.slug}`
      : '/blog';

  if (!post || !post.slug || post.slug.trim() === '') {
    console.warn(
      `BlogPostCard (ID: ${post?.id}): Missing or empty slug. Using fallback URL: ${postUrl}`
    );
  }

  return (
    <article className='bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col group'>
      <Link
        href={`/blog/${post.slug}`}
        className='block'
      >
        <div className='relative h-48 w-full overflow-hidden'>
          {' '}
          {/* Add overflow-hidden */}
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              // --- เพิ่ม effect ตอน hover บน group ---
              className='transition-transform duration-300 group-hover:scale-105'
            />
          ) : (
            <div className='bg-gray-200 h-full flex items-center justify-center text-gray-400'>
              ไม่มีรูปภาพ
            </div>
          )}
        </div>
      </Link>

      <div className='p-5 flex flex-col flex-grow'>
        <p className='text-sm text-gray-500 mb-1'>
          <svg
            width='16'
            height='16'
            className='inline-block mr-1 align-text-bottom'
          >
            <use xlinkHref='#calendar'></use>
          </svg>
          {formattedDate}
        </p>
        {/* --- ครอบหัวข้อด้วย Link --- */}
        <h3 className='font-heading text-lg font-semibold mb-2 text-secondary group-hover:text-primary transition-colors duration-200 leading-tight'>
          <Link href={postUrl}>{post.title}</Link>
        </h3>
        <p className='text-sm text-gray-600 mb-4 flex-grow'>
          {post.excerpt || 'ไม่มีคำอธิบายย่อ...'}
        </p>
        {/* --- ใช้ postUrl ใน Link "อ่านต่อ" --- */}
        <Link
          href={postUrl}
          className='text-sm text-primary hover:underline font-semibold mt-auto self-start'
        >
          อ่านต่อ →
        </Link>
      </div>
    </article>
  );
};

export default BlogPostCard;
