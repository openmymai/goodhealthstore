import Container from '@/app/_components/container';
import { HeroPost } from '@/app/_components/hero-post';
import Hero from '@/app/_components/Hero';
import { MoreStories } from '@/app/_components/more-stories';
import { getAllPosts } from '@/lib/api';
import CategoryCarousel from './_components/CategoryCarousel';
import BestSellingProducts from './_components/BestSellingProducts';

export default function Index() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Hero />
      <CategoryCarousel />
      <BestSellingProducts />
      <Container>
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
