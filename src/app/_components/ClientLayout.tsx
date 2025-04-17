// components/ClientLayout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import OffcanvasCart from './OffcanvasCart';
import OffcanvasMenu from './OffcanvasMenu';
import { useStore } from '@/app/context/StoreContext'; // Adjust path as needed

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const { isCartOpen, closeCart } = useStore();
  // Get menu state/functions from UIContext (if still used) or manage locally/move to StoreContext
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Keep menu state here for now
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust timing as needed

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <>
      {loading && (
        <div className='preloader-wrapper'>
          <div className='preloader'></div>
        </div>
      )}

      {/* Pass state and togglers to Header via context or props if needed,
          or manage toggling directly within Header and pass only state here */}
      <div
        className={
          loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'
        }
      >
        {/* Pass menu toggle down if needed (or Header uses context) */}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && typeof child.type !== 'string') {
            if (child.type.name === 'Header') {
              // Pass only the menu toggle if it's managed here
              return React.cloneElement(child as React.ReactElement<any>, {
                toggleMenu: () => setIsMenuOpen((prev) => !prev),
              });
            }
          }
          return child;
        })}
      </div>

      <OffcanvasCart
        isOpen={isCartOpen}
        onClose={closeCart}
      />
      <OffcanvasMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />
    </>
  );
}
