// components/SearchClient.tsx
'use client'; // This component handles client-side interactions

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // Use client-side hooks
import Link from 'next/link';

import ProductCard from '@/app/_components/ProductCard';
import BlogCard from '@/app/_components/BlogCard';
import type { Product } from '@/types/product';
import type { Post } from '@/types/post';

// Define type for combined search results
interface SearchResult {
  type: 'product' | 'post';
  data: Product | Omit<Post, 'contentHtml'>;
  score: number;
}

// Define props received from the server component
interface SearchClientProps {
    initialQuery: string;
    allPosts: Omit<Post, 'contentHtml'>[]; // Receive pre-fetched post metadata
    allProducts: Product[]; // Receive pre-fetched products
}

const SearchClient: React.FC<SearchClientProps> = ({ initialQuery, allPosts, allProducts }) => {
  const searchParams = useSearchParams(); // Client hook to get current params
  const router = useRouter(); // Client hook for navigation
  
  const query = searchParams ? searchParams.get('q') : null; // Use URL query primarily, fallback to initial
  const finalQuery = query || initialQuery || '';

  const [searchTerm, setSearchTerm] = useState<string>(finalQuery); // Local state for the input field
  const [isLoading, setIsLoading] = useState(false); // Still useful for UX

  // --- Memoize filtering logic ---
  const searchResults = useMemo(() => {
    // Use the finalQuery for filtering logic
    const currentQuery = searchParams ? searchParams.get('q') || '' : '';
    if (!currentQuery) {
      setIsLoading(false); // Ensure loading is false if no query
      return [];
    }

    setIsLoading(true)

    const lowerCaseQuery = currentQuery.toLowerCase();


    // Filter Products
    const filteredProducts = allProducts
      .map(product => {
        // --- RESTORE SCORING LOGIC ---
        let score = 0;
        if (product.title.toLowerCase().includes(lowerCaseQuery)) score += 10;
        if (product.category.toLowerCase().includes(lowerCaseQuery)) score += 5;
        if (product.description?.toLowerCase().includes(lowerCaseQuery)) score += 2;
        // Add more scoring based on tags, etc. if needed
        // -----------------------------
        return { type: 'product', data: product, score } as SearchResult;
      })
      .filter(result => result.score > 0);

    // Filter Posts
    const filteredPosts = allPosts
      .map(post => {
        // --- RESTORE SCORING LOGIC ---
        let score = 0;
        if (post.title.toLowerCase().includes(lowerCaseQuery)) score += 10;
        if (post.category.toLowerCase().includes(lowerCaseQuery)) score += 5;
        if (post.excerpt.toLowerCase().includes(lowerCaseQuery)) score += 3;
        if (post.tags?.some(tag => tag.toLowerCase().includes(lowerCaseQuery))) score += 4;
        // Add scoring based on content preview if needed (more complex)
        // -----------------------------
        return { type: 'post', data: post, score } as SearchResult;
      })
      .filter(result => result.score > 0);


    const combinedResults = [...filteredProducts, ...filteredPosts];
    combinedResults.sort((a, b) => b.score - a.score);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return combinedResults;

  }, [searchParams, allPosts, allProducts]); // Depend on finalQuery and data props

  // Update local input state if URL query changes (e.g., back/forward button)
  useEffect(() => {
    // Use the value from searchParams directly if available, otherwise empty string
    setSearchTerm(searchParams ? searchParams.get('q') || '' : ''); // <--- Check for null here too
  }, [searchParams]);

  // Handle form submission - update URL query parameter
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
        router.push('/search');
    }
};

  return (
    <>
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="mb-8">
         <input
           type="search"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)} // Update local state
           placeholder="Search articles and products..."
           className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
         />
         {/* Optional submit button */}
         {/* <button type="submit" className="ml-2 ...">Search</button> */}
      </form>

      {/* Results Area */}
      {isLoading && <p className="text-center text-body py-5">Loading...</p>}

      {!isLoading && query && searchResults.length === 0 && (
        <p className="text-center text-body py-5">No results found for "{query}".</p>
      )}

      {!isLoading && searchResults.length > 0 && (
        <div>
          <p className="text-body mb-6">Showing results for "{query}":</p>
          {/* Products Section */}
          {searchResults.some(r => r.type === 'product') && (
              <div className="mb-10">
                  <h2 className="text-2xl font-semibold text-dark mb-4 border-b pb-2">Products</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                      {searchResults
                          .filter(result => result.type === 'product')
                          .map(result => (
                              <ProductCard key={`product-${result.data.id}`} product={result.data as Product} />
                          ))}
                  </div>
              </div>
          )}
          {/* Posts Section */}
           {searchResults.some(r => r.type === 'post') && (
              <div>
                  <h2 className="text-2xl font-semibold text-dark mb-4 border-b pb-2">Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {searchResults
                          .filter(result => result.type === 'post')
                          .map(result => (
                              <BlogCard key={`post-${(result.data as Post).slug}`} post={result.data as Post} />
                          ))}
                  </div>
              </div>
           )}
        </div>
      )}
       {!isLoading && !query && ( // Show message if no query term
            <p className="text-center text-body py-5">Enter a term above to search.</p>
        )}
    </>
  );
};

export default SearchClient;