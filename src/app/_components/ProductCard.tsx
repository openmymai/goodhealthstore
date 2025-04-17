'use client'; // Needs client-side context
// components/ProductCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/app/context/StoreContext'; // Import useStore
import type { Product } from '@/types/product'; // Import Product type
// Icon imports are removed as we use <use>

interface ProductCardProps {
  product: Product;
}

// Helper to render stars using SVG <use> (Keep this function as is)
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];
  for (let i = 0; i < fullStars; i++)
    stars.push(
      <svg
        key={`full-${i}`}
        className='w-[18px] h-[18px] text-warning'
        aria-hidden='true'
      >
        <use xlinkHref='#star-full'></use>
      </svg>
    );
  if (halfStar)
    stars.push(
      <svg
        key='half'
        className='w-[18px] h-[18px] text-warning'
        aria-hidden='true'
      >
        <use xlinkHref='#star-half'></use>
      </svg>
    );
  return stars;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const discount =
    product.discountPercent ||
    (product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.discountedPrice) /
            product.originalPrice) *
            100
        )
      : 0);

  // Construct the product link using the slug
  const productUrl = `/products/${product.slug}`; // Adjust path structure if needed (e.g., /shop/, /item/)
  const inWishlist = isInWishlist(product.id);

  return (
    <div className='group bg-white rounded-2xl shadow-custom-light hover:shadow-custom-hover transition-shadow duration-300 mb-8 relative pb-[60px] overflow-hidden hover:overflow-visible hover:z-10'>
      <figure className='text-center p-4'>
        <Link
          href={productUrl}
          title={product.title}
        >
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={200}
            height={210}
            className='tab-image mx-auto h-[210px] w-auto object-contain'
          />
        </Link>
      </figure>
      <div className='flex flex-col text-center px-4 pb-4'>
        <h3 className='text-base font-normal text-dark mb-2 h-10 line-clamp-2'>
          <Link
            href={productUrl}
            className='hover:text-primary transition-colors'
          >
            {product.title}
          </Link>
        </h3>
        <div className='mb-2'>
          <span className='rating inline-flex items-center'>
            {renderStars(product.rating)}
          </span>
          <span className='text-body text-sm ml-1'>({product.reviews})</span>
        </div>
        <div className='flex justify-center items-center gap-2 mb-3'>
          {product.originalPrice && (
            <del className='text-body text-sm'>
              ${product.originalPrice.toFixed(2)}
            </del>
          )}
          <span className='text-dark font-semibold'>
            ${product.discountedPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className='badge border border-border-subtle rounded-none font-normal px-1 text-7 text-body'>
              {discount}% OFF
            </span>
          )}
        </div>
      </div>
      {/* Button Area */}
      <div
        className='button-area absolute bottom-0 left-0 w-full bg-white p-3 pt-0 shadow-custom-hover rounded-b-2xl
                          opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0
                          transition-all duration-300 ease-in-out'
      >
        <div className='grid grid-cols-12 gap-1 mt-2 items-center'>
          <div className='col-span-3'>
            {/* Basic quantity input - state not managed here */}
            <input
              type='number'
              name='quantity'
              className='form-control border border-border-subtle rounded-md p-2 text-center w-full text-sm quantity'
              defaultValue='1'
              min='1'
              id={`quantity-${product.id}`} // Add unique ID
            />
          </div>
          <div className='col-span-7'>
            <button
              type='button'
              className='btn btn-primary bg-primary hover:bg-orange-500 text-white rounded-md p-2 text-7 flex items-center justify-center w-full h-[40px] transition-colors duration-300'
              onClick={() => {
                // Read quantity from input (simple way, better with state if complex)
                const quantityInput = document.getElementById(
                  `quantity-${product.id}`
                ) as HTMLInputElement | null;
                const quantity = quantityInput
                  ? parseInt(quantityInput.value, 10)
                  : 1;
                addToCart(product, quantity >= 1 ? quantity : 1); // Add to cart using context action
              }}
            >
              <svg
                className='w-[18px] h-[18px] mr-1'
                aria-hidden='true'
              >
                <use xlinkHref='#cart'></use>
              </svg>
              Add to Cart
            </button>
          </div>
          <div className='col-span-2'>
            <button
              type='button'
              className={`border rounded-md p-0 flex items-center justify-center w-full h-[40px] text-base transition-colors duration-200 ${
                inWishlist
                  ? 'bg-danger text-white border-danger hover:bg-red-700' // Style when in wishlist
                  : 'border-border-subtle hover:bg-light text-dark' // Style when not in wishlist
              }`}
              onClick={() => toggleWishlist(product)} // Toggle wishlist using context action
              aria-label={
                inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'
              }
            >
              <svg
                className='w-[18px] h-[18px]'
                aria-hidden='true'
              >
                <use xlinkHref='#heart'></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
