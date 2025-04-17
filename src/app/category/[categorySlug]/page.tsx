// app/category/[categorySlug]/page.tsx
// Keep as Server Component (NO 'use client')

import React from 'react'; // Import React
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';

import { getAllProducts, getProductsByCategory } from '@/data/products';
import ProductCard from '@/app/_components/ProductCard';
import type { Product } from '@/interfaces/product';

// --- Define a more specific type for Page Props ---
type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> // Keep searchParams if needed
}

// --- generateStaticParams (Keep as is) ---
export async function generateStaticParams() {
  const products = getAllProducts();
  const categories = [...new Set(products.map((product) => product.category))];
  return categories.map((categorySlug) => ({
    categorySlug: categorySlug,
  }));
}

// --- generateMetadata ---
const formatCategoryTitle = (slug: string): string => {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' & ');
};


// generateMetadata receives resolved params, so direct access is fine here
export async function generateMetadata(
  { params, searchParams }: CategoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { categorySlug } = await params; // Direct access is fine
  const categoryTitle = formatCategoryTitle(categorySlug);
  // Add validation if needed
  return {
    title: `${categoryTitle} | Organic Store`,
    description: `Browse products in the ${categoryTitle} category.`,
  };
}


// --- Page Component (Server Component) ---
// Use React.use to unwrap the params promise
export default async function CategoryPage({ params }: CategoryPageProps) {
  // const { categorySlug } = await params; // Access slug directly
  const resolvedParams = await params;
  const categorySlug = resolvedParams.categorySlug;

  // --- Data Fetching (Happens on Server at build/request time) ---
  const productsInCategory = getProductsByCategory(categorySlug);
  // --------------------------------------------------------------

  const categoryTitle = formatCategoryTitle(categorySlug);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-dark mb-8 border-b border-border-color pb-4">
        {categoryTitle}
      </h1>

      {productsInCategory.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {productsInCategory.map((product) => (
            // ProductCard is likely 'use client', which is fine to render from Server Component
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-body">No products found in this category.</p>
          <Link href="/" className="mt-4 inline-block text-primary hover:underline">
            ← Back to Shop
          </Link>
        </div>
      )}
    </div>
  );
}