// src/components/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart'; // We'll create this hook
import { Product } from '@prisma/client';

// Define the minimal product info needed for adding to cart
// Include stockQuantity for client-side check
type CartProductInfo = Pick<
  Product,
  'id' | 'name' | 'imageUrl' | 'slug' | 'stockQuantity'
> & {
  price: string; // Price is passed as string from API
};

interface AddToCartButtonProps {
  product: CartProductInfo;
  disabled?: boolean; // Allow parent to disable (e.g., out of stock)
  showQuantity?: boolean; // Option to show quantity selector
  className?: string; // Allow custom styling
}

export default function AddToCartButton({
  product,
  disabled = false,
  showQuantity = true,
  className = '',
}: AddToCartButtonProps) {
  const { dispatch } = useCart(); // Get dispatch function from cart context
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false); // Optional loading state

  const handleAddToCart = () => {
    if (disabled || product.stockQuantity <= 0) return; // Double check stock

    setIsAdding(true); // Indicate loading/processing

    // Convert price string to number before adding
    const priceAsNumber = parseFloat(product.price);
    if (isNaN(priceAsNumber)) {
      console.error('Invalid product price:', product.price);
      setIsAdding(false);
      // Optionally show an error to the user
      return;
    }

    // Dispatch action to add item to cart
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: priceAsNumber, // Use the converted number
        quantity: quantity,
        imageUrl: product.imageUrl,
        slug: product.slug,
        // Pass stock for potential validation in reducer/context later
        stock: product.stockQuantity,
      },
    });

    // Optional: Reset quantity selector after adding
    // setQuantity(1);

    // Optional: Show confirmation briefly
    // Can use a library like react-hot-toast or just simple state
    setTimeout(() => setIsAdding(false), 500); // Reset loading state after a short delay

    console.log(`Added ${quantity} of ${product.name} to cart`);
    // You might want a more visible feedback mechanism here
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => {
      const newValue = prev + change;
      // Prevent quantity from going below 1 or above stock
      if (newValue < 1) return 1;
      // if (newValue > product.stockQuantity) return product.stockQuantity; // Limit by stock
      return newValue;
    });
  };

  const effectiveDisabled = disabled || product.stockQuantity <= 0 || isAdding;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showQuantity && (
        <div className='flex items-center border border-gray-300 rounded-md'>
          <button
            onClick={() => handleQuantityChange(-1)}
            className='px-2 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-50'
            disabled={quantity <= 1 || effectiveDisabled}
            aria-label='ลดจำนวน'
          >
            -
          </button>
          <input
            type='number'
            min='1'
            // max={product.stockQuantity} // Set max based on stock
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setQuantity(isNaN(val) || val < 1 ? 1 : val);
            }}
            className='w-10 text-center border-l border-r border-gray-300 focus:outline-none focus:ring-0 text-sm py-1'
            disabled={effectiveDisabled}
            aria-label='จำนวน'
          />
          <button
            onClick={() => handleQuantityChange(1)}
            className='px-2 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-50'
            // disabled={quantity >= product.stockQuantity || effectiveDisabled}
            disabled={effectiveDisabled} // Disable if generally disabled
            aria-label='เพิ่มจำนวน'
          >
            +
          </button>
        </div>
      )}
      <button
        onClick={handleAddToCart}
        disabled={effectiveDisabled}
        className={`flex-grow btn btn-primary bg-primary hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md text-sm disabled:opacity-50 disabled:bg-gray-300 transition-colors duration-200 ${
          showQuantity ? '' : 'w-full'
        }`}
      >
        {isAdding
          ? 'กำลังเพิ่ม...'
          : effectiveDisabled && !isAdding
          ? 'สินค้าหมด'
          : 'เพิ่มลงตะกร้า'}
      </button>
    </div>
  );
}
