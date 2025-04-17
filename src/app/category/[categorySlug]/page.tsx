// app/category/[categorySlug]/page.tsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';

// Import data fetching functions and components
import { getAllProducts, getProductsByCategory } from '@/data/products'; // Adjust path if needed
import ProductCard from '@/app/_components/ProductCard'; // Adjust path if needed
import type { Product } from '@/interfaces/product'; // Adjust path if needed

// --- Props Type ---
type Props = {
  params: { categorySlug: string };
};

// --- generateStaticParams (Optional but Recommended) ---
export async function generateStaticParams() {
  const products = getAllProducts();
  // Get unique category slugs
  const categories = [...new Set(products.map((product) => product.category))];

  return categories.map((categorySlug) => ({
    categorySlug: categorySlug,
  }));
}

// --- generateMetadata ---
// Helper function to format category slug to title (basic example)
const formatCategoryTitle = (slug: string): string => {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' & '); // Replace hyphen with ' & '
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const categorySlug = params.categorySlug;
  // You might want to validate if the category actually exists
  const categoryTitle = formatCategoryTitle(categorySlug);

  return {
    title: `${categoryTitle} | Organic Store`,
    description: `Browse products in the ${categoryTitle} category.`,
  };
}

// --- Page Component ---
export default function CategoryPage({ params }: Props) {
  const categorySlug = params.categorySlug;
  const productsInCategory = getProductsByCategory(categorySlug);

  // Optional: Handle case where category exists but has no products
  // if (productsInCategory.length === 0) {
  //   // You could show a "No products found" message instead of 404
  //   // Or check if the category slug itself is valid based on a predefined list
  //   // For now, we assume if products are empty, the category might be invalid or just empty
  //   // notFound(); // Uncomment this if an empty category should be a 404
  // }

  const categoryTitle = formatCategoryTitle(categorySlug);

  return (
    <div className='container mx-auto px-4 lg:px-8 py-10 md:py-16'>
      {/* Page Title */}
      <h1 className='text-3xl md:text-4xl font-bold text-dark mb-8 border-b border-border-color pb-4'>
        {categoryTitle}
      </h1>

      {/* Product Grid */}
      {productsInCategory.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6'>
          {productsInCategory.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        // Message when no products are found in the category
        <div className='text-center py-10'>
          <p className='text-lg text-body'>
            No products found in this category.
          </p>
          <Link
            href='/'
            className='mt-4 inline-block text-primary hover:underline'
          >
            ← Back to Shop
          </Link>
        </div>
      )}
    </div>
  );
}
