// components/OffcanvasMenu.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface OffcanvasMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const OffcanvasMenu: React.FC<OffcanvasMenuProps> = ({ isOpen, onClose }) => {
  const [isBeveragesOpen, setIsBeveragesOpen] = useState(false);

  // Prevent rendering if not open
  // if (!isOpen) return null; // Keep commented for transitions

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
        className={`fixed top-0 left-0 h-full w-72 md:w-80 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role='dialog'
        aria-modal='true'
        aria-labelledby='offcanvasMenuLabel'
      >
        {/* Header */}
        <div className='offcanvas-header flex justify-between items-center p-4 border-b border-border-color h-[65px]'>
          {' '}
          {/* Fixed height */}
          <h4
            id='offcanvasMenuLabel'
            className='font-normal uppercase text-sm text-dark'
          >
            Menu
          </h4>
          <button
            type='button'
            className='btn-close p-1 text-dark hover:text-primary'
            onClick={onClose}
            aria-label='Close menu'
          >
            {/* Use SVG icon */}
            <svg
              className='w-5 h-5'
              aria-hidden='true'
            >
              <use xlinkHref='#close'></use>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className='offcanvas-body p-4 overflow-y-auto h-[calc(100vh-65px)]'>
          {' '}
          {/* Adjust height */}
          {/* Use border-border-dashed for the dashed effect */}
          <ul className='navbar-nav list-none space-y-0'>
            {/* Menu Items - Add active state logic if needed */}
            <li className='nav-item border-b border-dashed border-border-dashed'>
              <Link
                href='#'
                className='nav-link flex items-center gap-3 text-dark p-3 hover:bg-gray-100'
              >
                <svg
                  className='w-6 h-6 text-primary flex-shrink-0'
                  aria-hidden='true'
                >
                  <use xlinkHref='#fruits'></use>
                </svg>
                <span>Fruits and vegetables</span>
              </Link>
            </li>
            <li className='nav-item border-b border-dashed border-border-dashed'>
              <Link
                href='#'
                className='nav-link flex items-center gap-3 text-dark p-3 hover:bg-gray-100'
              >
                <svg
                  className='w-6 h-6 text-primary flex-shrink-0'
                  aria-hidden='true'
                >
                  <use xlinkHref='#dairy'></use>
                </svg>
                <span>Dairy and Eggs</span>
              </Link>
            </li>
            <li className='nav-item border-b border-dashed border-border-dashed'>
              <Link
                href='#'
                className='nav-link flex items-center gap-3 text-dark p-3 hover:bg-gray-100'
              >
                <svg
                  className='w-6 h-6 text-primary flex-shrink-0'
                  aria-hidden='true'
                >
                  <use xlinkHref='#meat'></use>
                </svg>
                <span>Meat and Poultry</span>
              </Link>
            </li>
            <li className='nav-item border-b border-dashed border-border-dashed'>
              <Link
                href='#'
                className='nav-link flex items-center gap-3 text-dark p-3 hover:bg-gray-100'
              >
                <svg
                  className='w-6 h-6 text-primary flex-shrink-0'
                  aria-hidden='true'
                >
                  <use xlinkHref='#seafood'></use>
                </svg>
                <span>Seafood</span>
              </Link>
            </li>
            <li className='nav-item border-b border-dashed border-border-dashed'>
              <Link
                href='#'
                className='nav-link flex items-center gap-3 text-dark p-3 hover:bg-gray-100'
              >
                <svg
                  className='w-6 h-6 text-primary flex-shrink-0'
                  aria-hidden='true'
                >
                  <use xlinkHref='#bakery'></use>
                </svg>
                <span>Bakery and Bread</span>
              </Link>
            </li>
            <li className='nav-item border-b border-dashed border-border-dashed'>
              <Link
                href='#'
                className='nav-link flex items-center gap-3 text-dark p-3 hover:bg-gray-100'
              >
                <svg
                  className='w-6 h-6 text-primary flex-shrink-0'
                  aria-hidden='true'
                >
                  <use xlinkHref='#canned'></use>
                </svg>
                <span>Canned Goods</span>
              </Link>
            </li>
            <li className='nav-item border-b border-dashed border-border-dashed'>
              <Link
                href='#'
                className='nav-link flex items-center gap-3 text-dark p-3 hover:bg-gray-100'
              >
                <svg
                  className='w-6 h-6 text-primary flex-shrink-0'
                  aria-hidden='true'
                >
                  <use xlinkHref='#frozen'></use>
                </svg>
                <span>Frozen Foods</span>
              </Link>
            </li>
            <li className='nav-item border-b border-dashed border-border-dashed'>
              <Link
                href='#'
                className='nav-link flex items-center gap-3 text-dark p-3 hover:bg-gray-100'
              >
                <svg
                  className='w-6 h-6 text-primary flex-shrink-0'
                  aria-hidden='true'
                >
                  <use xlinkHref='#pasta'></use>
                </svg>
                <span>Pasta and Rice</span>
              </Link>
            </li>
            <li className='nav-item border-b border-dashed border-border-dashed'>
              <Link
                href='#'
                className='nav-link flex items-center gap-3 text-dark p-3 hover:bg-gray-100'
              >
                <svg
                  className='w-6 h-6 text-primary flex-shrink-0'
                  aria-hidden='true'
                >
                  <use xlinkHref='#breakfast'></use>
                </svg>
                <span>Breakfast Foods</span>
              </Link>
            </li>
            <li className='nav-item border-b border-dashed border-border-dashed'>
              <Link
                href='#'
                className='nav-link flex items-center gap-3 text-dark p-3 hover:bg-gray-100'
              >
                <svg
                  className='w-6 h-6 text-primary flex-shrink-0'
                  aria-hidden='true'
                >
                  <use xlinkHref='#snacks'></use>
                </svg>
                <span>Snacks and Chips</span>
              </Link>
            </li>

            {/* Collapsible Beverages */}
            <li className='nav-item border-b border-dashed border-border-dashed'>
              <button
                className='w-full flex justify-between items-center text-dark p-3 hover:bg-gray-100 text-left' // Added text-left
                onClick={() => setIsBeveragesOpen(!isBeveragesOpen)}
                aria-expanded={isBeveragesOpen}
              >
                <div className='flex items-center gap-3'>
                  <svg
                    className='w-6 h-6 text-primary flex-shrink-0'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#beverages'></use>
                  </svg>
                  <span>Beverages</span>
                </div>
                {/* Chevron Icon */}
                <svg
                  className={`w-4 h-4 transform transition-transform duration-200 flex-shrink-0 ${
                    isBeveragesOpen ? 'rotate-180' : ''
                  }`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
              {/* Collapsible Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isBeveragesOpen ? 'max-h-60' : 'max-h-0'
                }`}
              >
                {' '}
                {/* Added transition */}
                <div className='pl-12 pb-1 pt-1'>
                  {' '}
                  {/* ps-5, added pt-1 */}
                  <ul className='list-none font-normal space-y-0'>
                    {/* Use border-border-color for solid border */}
                    <li className='border-b border-border-color py-2'>
                      <Link
                        href='#'
                        className='dropdown-item block text-sm text-body hover:text-primary'
                      >
                        Water
                      </Link>
                    </li>
                    <li className='border-b border-border-color py-2'>
                      <Link
                        href='#'
                        className='dropdown-item block text-sm text-body hover:text-primary'
                      >
                        Juice
                      </Link>
                    </li>
                    <li className='border-b border-border-color py-2'>
                      <Link
                        href='#'
                        className='dropdown-item block text-sm text-body hover:text-primary'
                      >
                        Soda
                      </Link>
                    </li>
                    <li className='py-2'>
                      <Link
                        href='#'
                        className='dropdown-item block text-sm text-body hover:text-primary'
                      >
                        Tea
                      </Link>
                    </li>{' '}
                    {/* Last item no border */}
                  </ul>
                </div>
              </div>
            </li>

            {/* Remaining Static Items */}
            <li className='nav-item border-b border-dashed border-border-dashed'>
              <Link
                href='#'
                className='nav-link flex items-center gap-3 text-dark p-3 hover:bg-gray-100'
              >
                <svg
                  className='w-6 h-6 text-primary flex-shrink-0'
                  aria-hidden='true'
                >
                  <use xlinkHref='#pet'></use>
                </svg>
                <span>Pet Food and Supplies</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default OffcanvasMenu;
