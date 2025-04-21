// src/components/ProductCard.tsx
'use client'; // Mark as client component for potential interactivity

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@prisma/client';
import AddToCartButton from './AddToCartButton'; // Import AddToCartButton

// Type for the product data expected by the card (with string price)
type ProductCardProps = {
  product: Omit<
    Product,
    | 'price'
    | 'createdAt'
    | 'updatedAt'
    | 'categoryId'
    | 'description'
    | 'stockQuantity'
    | 'isPublished'
    | 'sku'
  > & {
    price: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const price = parseFloat(product.price); // Convert string price back to number for display

  return (
    <div className='border border-gray-200 rounded-lg shadow-sm overflow-hidden group flex flex-col bg-white transition-shadow hover:shadow-md'>
      <Link
        href={`/products/${product.slug || product.id}`}
        className='block relative aspect-square overflow-hidden'
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }} // Cover ensures image fills the square
            className='transition-transform duration-300 group-hover:scale-105'
            sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
          />
        ) : (
          <div className='bg-gray-100 h-full flex items-center justify-center text-gray-400 text-sm'>
            ไม่มีรูปภาพ
          </div>
        )}
      </Link>

      <div className='p-4 flex flex-col flex-grow'>
        <h3 className='font-heading text-sm font-semibold text-secondary mb-1 truncate group-hover:text-primary'>
          <Link href={`/products/${product.slug || product.id}`}>
            {product.name}
          </Link>
        </h3>
        {/* Placeholder for Rating */}
        {/* <div className="text-xs text-gray-400 mb-2">★★★★☆ (4.5)</div> */}

        <p className='text-md font-semibold text-primary mb-3 mt-auto pt-2'>
          ฿
          {price.toLocaleString('th-TH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>

        {/* Basic Add to Cart - Pass necessary product info */}
        {/* We need the full product info here for AddToCartButton */}
        {/* Let's assume the full product object (or necessary parts) is available */}
        {/* In a real scenario, you might fetch full product data or pass required fields */}
        {/* For now, let's pass a simplified object for demonstration */}
        <AddToCartButton
          product={{
            id: product.id,
            name: product.name,
            price: product.price, // Pass price as string
            imageUrl: product.imageUrl,
            slug: product.slug,
            // Assume stock is available for listing card, detail page handles out of stock
            stockQuantity: 1, // Placeholder, actual stock check happens in AddToCartButton/context
          }}
          showQuantity={false} // Don't show quantity selector on card
        />
      </div>
    </div>
  );
}
