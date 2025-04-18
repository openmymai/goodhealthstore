// components/Header.tsx
'use client'; // Needed for onClick handlers and state

import React, { useState, useRef } from 'react'; // Import useState and useRef
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/app/context/StoreContext';
import { useRouter } from 'next/navigation';
// No individual icon imports needed here anymore

// Define props if they are passed from ClientLayout
interface HeaderProps {
  toggleMenu?: () => void;
}

const HIDE_DELAY = 150; // Delay in milliseconds before hiding

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  const { toggleCart, wishlistCount, cartCount } = useStore();
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false); // State for dropdown visibility
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null); // Ref to store the timeout ID
  const router = useRouter(); // Initialize router
  const [localSearchTerm, setLocalSearchTerm] = useState(''); // State for search input

  // Function to clear the hide timer
  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  // Function to start the hide timer
  const startHideTimer = () => {
    clearHideTimer(); // Clear any existing timer
    hideTimerRef.current = setTimeout(() => {
      setIsPagesDropdownOpen(false);
    }, HIDE_DELAY);
  };

  // Event handler when mouse enters the trigger area (li or ul)
  const handleMouseEnter = () => {
    clearHideTimer(); // Cancel hiding if planned
    setIsPagesDropdownOpen(true); // Show the menu
  };

  // Event handler when mouse leaves the trigger area (li or ul)
  const handleMouseLeave = () => {
    startHideTimer(); // Start the countdown to hide
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    if (localSearchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(localSearchTerm.trim())}`); // Navigate to search page
    }
  };

  return (
    <header>
      <div className='container-fluid mx-auto'>
        <div className='py-3 border-b border-border-color flex flex-wrap items-center'>
          {/* Logo & Menu Toggle */}
          <div className='w-full sm:w-1/3 lg:w-1/6 flex justify-center sm:justify-start items-center gap-3 px-4'>
            <Link
              href='/'
              className='my-3 sm:my-0'
            >
              <Image
                src='/images/logo.svg'
                alt='logo'
                width={160}
                height={46}
                priority
              />
            </Link>
            <button
              className='lg:hidden p-2'
              type='button'
              onClick={toggleMenu}
              aria-label='Toggle navigation'
            >
              <svg
                className='w-6 h-6'
                aria-hidden='true'
              >
                <use xlinkHref='#menu'></use>
              </svg>
            </button>
          </div>

          {/* Search Bar */}
          <div className='w-full sm:w-2/3 lg:w-1/3 order-3 sm:order-2 mt-3 sm:mt-0 px-4'>
            <div className='search-bar flex bg-light p-2 rounded-full'>
              <div className='flex-grow px-2'>
                <form onSubmit={handleSearchSubmit} className="search-bar flex bg-light p-2 rounded-full">
                <input
                  type="search" // Use type="search"
                  name="q" // Optional: name attribute
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                  className="form-control w-full border-0 bg-transparent focus:ring-0 focus:outline-none text-sm placeholder-body"
                  placeholder="ค้นหาสินค้าและบทความ..."
                  aria-label="Search"
                />
                </form>
              </div>
              <div className='flex-shrink-0 pr-1 flex items-center'>
                <svg
                  className='w-6 h-6 text-body'
                  aria-hidden='true'
                >
                  <use xlinkHref='#search'></use>
                </svg>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className='hidden lg:flex lg:w-1/3 order-2 lg:order-3 items-center justify-center px-4'>
            <ul className='navbar-nav list-none flex flex-row gap-5 justify-center items-center mb-0 font-bold uppercase text-dark text-sm'>
              <li className='nav-item active'>
                <Link
                  href='/'
                  className='nav-link hover:text-primary'
                >
                  หน้าแรก
                </Link>
              </li>
              {/* --- Pages Dropdown --- */}
              <li
                className='nav-item relative'
                // Apply handlers to the list item itself
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className='nav-link flex items-center hover:text-primary cursor-default' // Use cursor-default if button isn't meant to be clicked
                  aria-expanded={isPagesDropdownOpen}
                  // No onClick needed if hover-triggered
                >
                  เรื่องน่ารู้
                  <svg
                    className='w-4 h-4 ml-1 fill-current'
                    viewBox='0 0 20 20'
                  >
                    <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                  </svg>
                </button>

                {/* Dropdown Menu - Apply handlers here too! */}
                <ul
                  className={`dropdown-menu absolute left-0 mt-1 w-48 bg-white border-0 p-3 rounded-md shadow-lg z-20 transition-opacity duration-150 ease-in-out ${
                    isPagesDropdownOpen
                      ? 'opacity-100 visible'
                      : 'opacity-0 invisible' // Control visibility
                  }`}
                  // Apply handlers to the dropdown itself
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Add dropdown items here */}
                  <li>
                    <Link
                      href='#'
                      className='dropdown-item block px-4 py-2 text-sm text-dark hover:bg-primary hover:text-white rounded'
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='dropdown-item block px-4 py-2 text-sm text-dark hover:bg-primary hover:text-white rounded'
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='dropdown-item block px-4 py-2 text-sm text-dark hover:bg-primary hover:text-white rounded'
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='dropdown-item block px-4 py-2 text-sm text-dark hover:bg-primary hover:text-white rounded'
                    >
                      Checkout
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='dropdown-item block px-4 py-2 text-sm text-dark hover:bg-primary hover:text-white rounded'
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='dropdown-item block px-4 py-2 text-sm text-dark hover:bg-primary hover:text-white rounded'
                    >
                      Styles
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='dropdown-item block px-4 py-2 text-sm text-dark hover:bg-primary hover:text-white rounded'
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='dropdown-item block px-4 py-2 text-sm text-dark hover:bg-primary hover:text-white rounded'
                    >
                      Thank You
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='dropdown-item block px-4 py-2 text-sm text-dark hover:bg-primary hover:text-white rounded'
                    >
                      My Account
                    </Link>
                  </li>
                </ul>
                {/* --- End Dropdown Menu --- */}
              </li>
              {/* --- End Pages Dropdown --- */}
            </ul>
          </div>

          {/* User Icons */}
          <div className='w-full sm:w-auto lg:w-1/6 flex gap-3 sm:gap-5 items-center justify-center sm:justify-end order-4 lg:order-4 mt-3 lg:mt-0 px-4'>
            <ul className='flex justify-end list-none m-0'>
              <li>
                <Link
                  href='/account'
                  className='p-2 mx-1 block hover:text-primary'
                  aria-label='My Account'
                >
                  <svg
                    className='w-6 h-6'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#user'></use>
                  </svg>
                </Link>
              </li>
              <li className='relative'>
                {' '}
                {/* Added relative for badge */}
                <Link
                  href='/wishlist'
                  className='p-2 mx-1 block hover:text-primary'
                  aria-label='Wishlist'
                >
                  <svg
                    className='w-6 h-6'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#wishlist'></use>
                  </svg>
                  {/* Wishlist Count Badge */}
                  {wishlistCount > 0 && (
                    <span className='absolute -top-1 -right-1 bg-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full'>
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </li>
              <li className='relative'>
                {' '}
                {/* Added relative for badge */}
                <button
                  className='p-2 mx-1 block hover:text-primary'
                  onClick={toggleCart} // Use toggleCart from context
                  aria-label='Open cart'
                >
                  <svg
                    className='w-6 h-6'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#shopping-bag'></use>
                  </svg>
                  {/* Cart Count Badge */}
                  {cartCount > 0 && (
                    <span className='absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full'>
                      {cartCount}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
