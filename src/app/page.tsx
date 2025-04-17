import Link from 'next/link';
import Hero from '@/app/_components/Hero';
import CategoryCarousel from './_components/CategoryCarousel';
import BestSellingProducts from './_components/BestSellingProducts';
import { getAllPostsSorted } from '@/lib/posts'; // Import function to get posts
import BlogCard from '@/app/_components/BlogCard'; // Import the card component

export default async function Index() {
  const latestPosts = (await getAllPostsSorted()).slice(0, 3); // Get latest 3 posts

  return (
    <main>
      <Hero />
      <CategoryCarousel />
      <BestSellingProducts />
      <section
        id='latest-blog'
        className='pb-4 my-8 md:my-12'
      >
        {' '}
        {/* Added margin */}
        <div className='container mx-auto px-4 lg:px-8'>
          {/* Section Header */}
          <div className='flex items-center justify-between my-4 mb-8'>
            {' '}
            {/* Increased bottom margin */}
            <h2 className='text-3xl font-bold text-dark'>บทความสุขภาพและไลฟ์สไตล์</h2>
            <Link
              href='/blog'
              className='bg-primary text-white hover:bg-orange-500 px-5 py-2 rounded text-sm font-semibold transition-colors duration-300'
            >
              แสดงทั้งหมด
            </Link>
          </div>
          {/* Blog Grid */}
          {latestPosts.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
              {latestPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                />
              ))}
            </div>
          ) : (
            <div className='text-center py-5 text-body'>
              ไม่มีบทความในขณะนี้
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
