// components/ProductDetailClient.tsx
'use client'; // <--- This component is client-side

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/app/context/StoreContext';
import type { Product } from '@/types/product';

// Helper Function for Stars (can be moved to a utils file)
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];
  for (let i = 0; i < fullStars; i++)
    stars.push(
      <svg
        key={`full-${i}`}
        className='w-5 h-5 text-warning'
        aria-hidden='true'
      >
        <use xlinkHref='#star-full'></use>
      </svg>
    );
  if (halfStar)
    stars.push(
      <svg
        key='half'
        className='w-5 h-5 text-warning'
        aria-hidden='true'
      >
        <use xlinkHref='#star-half'></use>
      </svg>
    );
  return stars;
};

interface ProductDetailClientProps {
  product: Product; // Receive product data as a prop
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
}) => {
  // Client-side Hooks are okay here
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);

  // Check wishlist status
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

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddToCart = () => {
    if (quantity >= 1) {
      addToCart(product, quantity);
      console.log(`Added ${quantity} of ${product.title} to cart`);
      // Add toast notification here if desired
    }
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };

  // --- Return JSX for the detail section ---
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start'>
      {/* Product Image */}
      <div className='product-image bg-gray-100 rounded-lg p-4 md:p-8 flex justify-center items-center'>
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={500}
          height={500}
          className='max-w-full h-auto object-contain'
          priority
        />
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
          <span className='text-body text-sm'>({product.reviews} Reviews)</span>
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
              value={quantity}
              onChange={handleQuantityChange}
              min='1'
              aria-label='Quantity'
            />
          </div>
          <button
            type='button'
            className='btn btn-primary bg-primary hover:bg-orange-500 text-white rounded-md px-8 py-3 text-base font-semibold flex items-center justify-center transition-colors duration-300 flex-grow sm:flex-grow-0'
            onClick={handleAddToCart}
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

        {/* Add to Wishlist Button */}
        <button
          type='button'
          className={`btn btn-outline-dark border rounded-md px-4 py-2 text-sm flex items-center gap-2 transition-colors duration-200 ${
            inWishlist
              ? 'bg-danger text-white border-danger hover:bg-red-700'
              : 'border-border-subtle hover:bg-light text-dark'
          }`}
          onClick={handleToggleWishlist}
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
      </div>
    </div>
  );
};

export default ProductDetailClient;
