'use client';
// app/products/[slug]/page.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation'; // Import notFound
import { Metadata, ResolvingMetadata } from 'next';

// Import data fetching functions and type
import { getAllProducts, getProductBySlug } from '@/data/products'; // Adjust path if needed
import type { Product } from '@/interfaces/product'; // Adjust path if needed
import { useStore } from '@/app/context/StoreContext';

// --- Helper Function for Stars (Extract or keep here) ---
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg
        key={`full-${i}`}
        className='w-5 h-5 text-warning'
        aria-hidden='true'
      >
        <use xlinkHref='#star-full'></use>
      </svg>
    );
  }
  if (halfStar) {
    stars.push(
      <svg
        key='half'
        className='w-5 h-5 text-warning'
        aria-hidden='true'
      >
        <use xlinkHref='#star-half'></use>
      </svg>
    );
  }
  // Optionally add empty stars
  return stars;
};
// --- End Helper Function ---

// --- Props Type for the Page Component ---
type Props = {
  params: { slug: string };
  // searchParams?: { [key: string]: string | string[] | undefined }; // If you use search params
};

// --- Page Component ---
export default function ProductDetailPage({ params }: Props) {
  const slug = params.slug;
  const product = getProductBySlug(slug); // Fetch the specific product

  const { addToCart, toggleWishlist, isInWishlist } = useStore(); // Get actions from context
  const [quantity, setQuantity] = useState(1); // State for quantity input

  // If product not found, show Next.js 404 page
  if (!product) {
    notFound();
  }

  const inWishlist = isInWishlist(product.id);

  const discount =
    product.discountPercent ||
    (product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.discountedPrice) /
            product.originalPrice) *
            100
        )
      : 0);

  // Handler for quantity input change
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      // Ensure it's a number and at least 1
      setQuantity(value);
    } else if (event.target.value === '') {
      // Allow clearing the input, maybe default to 1? Or handle invalid state?
      setQuantity(1); // Or setQuantity('') and validate before adding to cart
    }
  };

  // Handler for Add to Cart button click
  const handleAddToCart = () => {
    if (quantity >= 1) {
      addToCart(product, quantity); // Call context action
      // Optional: Add user feedback (e.g., toast notification)
      console.log(`Added ${quantity} of ${product.title} to cart`);
    }
  };

  // Handler for Wishlist button click
  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div className='container mx-auto px-4 lg:px-8 py-10 md:py-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start'>
        {/* Product Image */}
        <div className='product-image bg-gray-100 rounded-lg p-4 md:p-8 flex justify-center items-center'>
          <Image
            src={product.imageUrl} // Ensure path is correct
            alt={product.title}
            width={500} // Adjust size as needed
            height={500}
            className='max-w-full h-auto object-contain'
            priority // Load image faster as it's likely important
          />
          {/* Add thumbnail gallery here if needed */}
        </div>

        {/* Product Details */}
        <div className='product-details'>
          <Link
            href={`/category/${product.category}`}
            className='text-sm text-primary hover:underline mb-2 inline-block capitalize'
          >
            {product.category.replace('-', ' & ')}
          </Link>
          <h1 className='text-3xl md:text-4xl font-bold text-dark mb-3'>
            {product.title}
          </h1>
          <div className='flex items-center gap-2 mb-4'>
            <span className='rating inline-flex items-center'>
              {renderStars(product.rating)}
            </span>
            <span className='text-body text-sm'>
              ({product.reviews} Reviews)
            </span>
          </div>
          <div className='flex items-baseline gap-3 mb-5'>
            <span className='text-3xl font-bold text-primary'>
              ${product.discountedPrice.toFixed(2)}
            </span>
            {product.originalPrice && (
              <del className='text-xl text-body'>
                ${product.originalPrice.toFixed(2)}
              </del>
            )}
            {discount > 0 && (
              <span className='badge bg-danger-subtle text-danger font-semibold px-2 py-1 text-xs rounded'>
                {discount}% OFF
              </span>
            )}
          </div>
          {product.description && (
            <div className='prose prose-sm max-w-none text-body mb-6'>
              <p>{product.description}</p>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className='flex items-center gap-4 mb-6'>
            <div className='quantity-selector w-24'>
              <input
                type='number'
                name='quantity'
                className='form-control border border-border-subtle rounded-md p-2 text-center w-full text-base quantity'
                value={quantity} // Controlled component
                onChange={handleQuantityChange} // Update state on change
                min='1'
                aria-label='Quantity'
              />
            </div>
            <button
              type='button'
              className='btn btn-primary bg-primary hover:bg-orange-500 text-white rounded-md px-8 py-3 text-base font-semibold flex items-center justify-center transition-colors duration-300 flex-grow sm:flex-grow-0'
              onClick={handleAddToCart} // Call handler on click
            >
              <svg
                className='w-5 h-5 mr-2'
                aria-hidden='true'
              >
                <use xlinkHref='#cart'></use>
              </svg>
              Add to Cart
            </button>
          </div>

          {/* Add to Wishlist */}
          <button
            type='button'
            className={`btn btn-outline-dark border rounded-md px-4 py-2 text-sm flex items-center gap-2 transition-colors duration-200 ${
              inWishlist
                ? 'bg-danger text-white border-danger hover:bg-red-700' // Style when in wishlist
                : 'border-border-subtle hover:bg-light text-dark' // Style when not in wishlist
            }`}
            onClick={handleToggleWishlist} // Call wishlist toggle handler
            aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <svg
              className='w-5 h-5'
              aria-hidden='true'
            >
              <use xlinkHref='#heart'></use>
            </svg>
            {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>

          {/* Additional Info (SKU, Tags, etc. - Optional) */}
          {/* <div className="mt-6 text-sm text-body">
            <p>SKU: {product.id}</p>
            <p>Category: <Link href={`/category/${product.category}`} className="text-primary hover:underline capitalize">{product.category.replace('-', ' & ')}</Link></p>
            <p>Tags: ...</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
