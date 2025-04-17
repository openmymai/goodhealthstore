// components/OffcanvasCart.tsx
'use client';
import React from 'react';
import { useStore } from '@/app/context/StoreContext'; // Import useStore

// Remove props interface (isOpen, onClose are now from context)

interface OffcanvasCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const OffcanvasCart: React.FC<OffcanvasCartProps> = ({ isOpen, onClose }) => {
  // Get ALL cart related state and functions from context
  const {
    cartItems,
    cartTotal,
    cartCount,
    removeFromCart,
    updateCartQuantity,
    // clearCart // Optional
  } = useStore();

  // Handle quantity change from input
  const handleQuantityChange = (
    productId: number | string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateCartQuantity(productId, newQuantity >= 0 ? newQuantity : 0); // Ensure non-negative
    }
  };

  // Prevent rendering if not open (optional, for performance maybe)
  // if (!isCartOpen) return null; // Keep commented for transitions

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-30 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose} // Use onClose prop here
        aria-hidden='true'
      ></div>

      {/* Offcanvas Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 md:w-96 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role='dialog'
        aria-modal='true'
        aria-labelledby='offcanvasCartLabel'
      >
        {/* Header */}
        <div className='offcanvas-header flex justify-between items-center p-4 border-b border-border-color h-[65px]'>
          <h4
            id='offcanvasCartLabel'
            className='text-lg font-semibold text-dark'
          >
            Your Cart
          </h4>
          <button
            type='button'
            className='btn-close p-1 text-dark hover:text-primary'
            onClick={onClose} // Use onClose prop here
            aria-label='Close cart'
          >
            <svg
              className='w-5 h-5'
              aria-hidden='true'
            >
              <use xlinkHref='#close'></use>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className='offcanvas-body p-4 overflow-y-auto h-[calc(100vh-65px-68px)] flex flex-col'>
          {cartItems.length === 0 ? (
            <div className='flex-grow flex flex-col items-center justify-center text-center text-body'>
              <svg
                className='w-16 h-16 mb-4 text-gray-300'
                aria-hidden='true'
              >
                <use xlinkHref='#shopping-bag'></use>
              </svg>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <>
              {/* Cart Items Section */}
              <div className='flex-grow mb-4'>
                <h4 className='flex justify-between items-center mb-4'>
                  <span className='text-primary font-semibold'>
                    Shopping Cart
                  </span>
                  <span className='bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full'>
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </span>
                </h4>
                <ul className='list-none divide-y divide-border-color'>
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className='flex justify-between items-center py-3 gap-3'
                    >
                      {/* Image (Optional) */}
                      {/* <Image src={item.imageUrl} alt={item.title} width={50} height={50} className="rounded"/> */}
                      <div className='flex-grow'>
                        <h6 className='my-0 text-sm font-medium text-dark line-clamp-1'>
                          {item.title}
                        </h6>
                        <small className='text-body text-xs'>
                          ${item.discountedPrice.toFixed(2)}
                        </small>
                        {/* Quantity Input */}
                        <div className='mt-1'>
                          <input
                            type='number'
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e)}
                            min='0' // Allow 0 to remove via reducer
                            className='w-16 border border-border-subtle rounded px-2 py-1 text-xs text-center'
                            aria-label={`Quantity for ${item.title}`}
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className='text-danger hover:text-red-700 p-1'
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <svg
                          className='w-4 h-4'
                          aria-hidden='true'
                        >
                          <use xlinkHref='#trash'></use>
                        </svg>
                      </button>
                    </li>
                  ))}
                  {/* Total Row */}
                  <li className='flex justify-between items-center pt-3 font-semibold text-dark'>
                    <span>Subtotal</span>
                    <strong>${cartTotal.toFixed(2)}</strong>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Footer Button Area (Only show if cart not empty) */}
        {cartItems.length > 0 && (
          <div className='p-4 border-t border-border-color'>
            <button
              className='w-full bg-primary hover:bg-orange-500 text-white font-semibold py-3 rounded transition-colors duration-300 text-base'
              type='submit'
            >
              Continue to checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default OffcanvasCart;
