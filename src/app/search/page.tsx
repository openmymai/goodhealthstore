// app/search/page.tsx
import React from 'react';
import { getAllPostsMeta } from '@/lib/posts'; // Can call fs here
import allProducts from '@/data/products'; // Can import data here
import SearchClient from '@/app/_components/SearchClient' // Import the new client component
import type { Product } from '@/types/product';
import type { Post } from '@/types/post';


// Define type for combined search results
interface SearchPageProps {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    
    const resolvedSearchParams = searchParams ? await searchParams : {}; // Await if exists, else empty object
    const initialQuery = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q : '';
    // --- Data Fetching (Server-Side) ---
    const postsMeta = getAllPostsMeta(); // This works because it runs on the server
    const products = allProducts; // Get products

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
        Search Results
      </h1>
      {/* Render the Client Component and pass ALL data needed for filtering */}
      <SearchClient
        initialQuery={initialQuery}
        allPosts={postsMeta}
        allProducts={products}
      />
    </div>
  );
}