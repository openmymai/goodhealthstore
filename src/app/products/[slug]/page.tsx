// app/products/[slug]/page.tsx
// NO 'use client' directive here - this is now a Server Component

import React from 'react'; // Keep React import
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { getAllProducts, getProductBySlug } from '@/data/products'; // Adjust path
import type { Product } from '@/types/product'; // Adjust path
import ProductDetailClient from '@/app/_components/ProductDetailClient';

// --- Props Type ---
type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; // Keep searchParams if needed
};

// --- generateStaticParams (Keep as is) ---
export async function generateStaticParams() {
  const products = getAllProducts(); // Fetch all slugs
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// --- generateMetadata (Keep as is) ---
export async function generateMetadata(
  { params, searchParams }: ProductDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params; // Direct access is fine here
  const product = getProductBySlug(slug); // Fetch data for metadata

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.title} | Good Health Store`,
    description: product.description || `Details for ${product.title}`,
  };
}

// --- Page Component (Now a Server Component) ---
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params; // Access slug directly

  // --- Data Fetching (Happens on Server at build/request time) ---
  // This replaces the need for getStaticProps
  const product = getProductBySlug(slug);
  // --------------------------------------------------------------

  // Handle product not found on the server
  if (!product) {
    notFound(); // Trigger 404 page
  }

  // Remove client-side hooks and handlers (useState, useStore, handleQuantityChange, etc.)

  return (
    <div className='container mx-auto px-4 lg:px-8 py-10 md:py-16'>
      {/* Render the Client Component and pass the product data */}
      <ProductDetailClient product={product} />

      {/* Related Products Section (Optional - can fetch data here on server) */}
      {/* <div className="mt-16">
        <h2 className="text-2xl font-bold text-dark mb-6">Related Products</h2>
        {/* Fetch and display related products (e.g., filter by category) */}
      {/* const relatedProducts = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 5); */}
      {/* Render related products using ProductCard */}
      {/* </div> */}
    </div>
  );
}
