// src/app/blog/[slug]/page.tsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation'; // Function to trigger 404
import Image from 'next/image';
import { Metadata, ResolvingMetadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Suspense } from 'react';

// Define props type including params
type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Function to fetch a single post by slug
async function getPost(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: slug, published: true }, // Ensure it's published
    });
    return post;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null; // Return null on error
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata // Optional access to parent metadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    // Return default metadata or handle as needed if post not found for metadata
    return {
      title: 'ไม่พบบทความ',
      description: 'ขออภัย ไม่พบบทความที่คุณกำลังค้นหา',
    };
  }

  // Optionally merge with parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${post.title} | GoodHealthStore Blog`,
    description: post.excerpt || post.content.substring(0, 150), // Use excerpt or start of content
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 150),
      images: post.imageUrl
        ? [
            {
              url: post.imageUrl,
              // width: 800, // Optional
              // height: 600, // Optional
              alt: post.title,
            },
            ...previousImages,
          ]
        : [], // Provide image if available
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      // Add authors, tags etc. if you have them
    },
    // Add Twitter card metadata etc. if needed
  };
}

// Component for the single post page
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  // If post not found, trigger a 404 page
  if (!post) {
    notFound();
  }

  const displayDate = post.publishedAt || post.createdAt;
  const formattedDate = new Date(displayDate).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article className='container-lg mx-auto px-4 py-12 max-w-4xl'>
      <Suspense
        fallback={
          <p className='text-center text-gray-500 py-10'>กำลังโหลดบทความ...</p>
        }
      >
        {' '}
        {/* Limit width for readability */}
        <h1 className='font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4 leading-tight'>
          {post.title}
        </h1>
        <p className='text-gray-500 mb-6 text-sm'>
          เผยแพร่เมื่อ: {formattedDate}
          {/* Add Author later if needed */}
        </p>
        {post.imageUrl && (
          <div className='relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg'>
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority // Prioritize loading the main image
              sizes='100vw'
            />
          </div>
        )}
        {/* Render Post Content */}
        {/* WARNING: Using dangerouslySetInnerHTML requires trusting the content source.
           If content comes from user input or an untrusted CMS, sanitize it first
           or preferably use a Markdown renderer like react-markdown. */}
        <div className='prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-secondary prose-a:text-primary hover:prose-a:text-blue-700 prose-img:rounded-md prose-img:shadow-sm prose-blockquote:border-l-primary prose-blockquote:text-gray-600'>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </Suspense>
    </article>
  );
}

// Optional: Generate static paths if you want SSG for blog posts
// export async function generateStaticParams() {
//   const posts = await prisma.post.findMany({
//     where: { published: true },
//     select: { slug: true },
//   });
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }
