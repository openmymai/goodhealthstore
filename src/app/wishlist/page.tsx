// app/wishlist/page.tsx
'use client'; // Needs client-side context

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/app/context/StoreContext';
import ProductCard from '@/app/_components/ProductCard'; // Reuse ProductCard

export default function WishlistPage() {
  const { wishlistItems } = useStore();

  return (
    <div className='container mx-auto px-4 lg:px-8 py-10 md:py-16'>
      <h1 className='text-3xl md:text-4xl font-bold text-dark mb-8 border-b border-border-color pb-4'>
        Your Wishlist ({wishlistItems.length})
      </h1>

      {wishlistItems.length > 0 ? (
        // Use a similar grid as category/product listing pages
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6'>
          {wishlistItems.map((product) => (
            // Pass the product data to ProductCard
            // Note: ProductCard's internal wishlist button will reflect the correct state
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className='text-center py-10'>
          <p className='text-lg text-body'>Your wishlist is empty.</p>
          <Link
            href='/'
            className='mt-4 inline-block text-primary hover:underline'
          >
            ← Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
