// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Remove icon imports: import { FacebookIcon, TwitterIcon, YoutubeIcon, InstagramIcon, AmazonIcon } from '@/components/icons';

const Footer = () => {
  return (
    <>
      <footer className='py-10 bg-white text-gray-300'>
        {' '}
        {/* py-5 -> py-10 approx */}
        <div className='container mx-auto px-4 lg:px-8'>
          {' '}
          {/* container-lg */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8'>
            {' '}
            {/* Replaces row/col structure */}
            {/* Column 1: Logo & Social */}
            <div className='lg:col-span-2 md:col-span-3'>
              {' '}
              {/* Spans multiple columns */}
              <div className='footer-menu'>
                <Link href='/'>
                  {/* Assuming logo.svg is in public/images */}
                  <Image
                    src='/images/logo.svg'
                    width={180}
                    height={52}
                    alt='logo'
                  />{' '}
                  {/* Adjust size & make white */}
                </Link>
                <div className='social-links mt-4'>
                  <ul className='flex list-none gap-2'>
                    <li>
                      <a
                        href='https://www.facebook.com/profile.php?id=61574967647831'
                        aria-label='Facebook'
                        className='p-2 border border-gray-600 hover:bg-light hover:text-secondary rounded-md inline-block transition-colors duration-200'
                      >
                        {/* Use SVG with <use> */}
                        <svg
                          className='w-4 h-4'
                          aria-hidden='true'
                        >
                          <use xlinkHref='#facebook'></use>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        aria-label='Twitter'
                        className='p-2 border border-gray-600 hover:bg-light hover:text-secondary rounded-md inline-block transition-colors duration-200'
                      >
                        {/* Use SVG with <use> */}
                        <svg
                          className='w-4 h-4'
                          aria-hidden='true'
                        >
                          <use xlinkHref='#twitter'></use>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        aria-label='YouTube'
                        className='p-2 border border-gray-600 hover:bg-light hover:text-secondary rounded-md inline-block transition-colors duration-200'
                      >
                        {/* Use SVG with <use> */}
                        <svg
                          className='w-4 h-4'
                          aria-hidden='true'
                        >
                          <use xlinkHref='#youtube'></use>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        aria-label='Instagram'
                        className='p-2 border border-gray-600 hover:bg-light hover:text-secondary rounded-md inline-block transition-colors duration-200'
                      >
                        {/* Use SVG with <use> */}
                        <svg
                          className='w-4 h-4'
                          aria-hidden='true'
                        >
                          <use xlinkHref='#instagram'></use>
                        </svg>
                      </a>
                    </li>
                    {/* <li>
                      <a
                        href='#'
                        aria-label='Amazon'
                        className='p-2 border border-gray-600 hover:bg-light hover:text-secondary rounded-md inline-block transition-colors duration-200'
                      >
                        <svg
                          className='w-4 h-4'
                          aria-hidden='true'
                        >
                          <use xlinkHref='#amazon'></use>
                        </svg>
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            {/* Column 2: Organic Links */}
            <div>
              <div className='footer-menu'>
                <h5 className='widget-title text-black font-bold mb-3 text-2xl'>
                  Organic
                </h5>
                <ul className='menu-list list-none space-y-2'>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Our Journals
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Affiliate Programme
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Ultras Press
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* Column 3: Quick Links */}
            <div>
              <div className='footer-menu'>
                <h5 className='widget-title text-black font-bold mb-3 text-2xl'>
                  Quick Links
                </h5>
                <ul className='menu-list list-none space-y-2'>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Offers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Discount Coupons
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Stores
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Track Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Info
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* Column 4: Customer Service */}
            <div>
              <div className='footer-menu'>
                <h5 className='widget-title text-black font-bold mb-3 text-2xl'>
                  Customer Service
                </h5>
                <ul className='menu-list list-none space-y-2'>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Returns & Refunds
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Cookie Guidelines
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='nav-link text-sm hover:text-lime-300'
                    >
                      Delivery Information
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* Column 5: Subscribe */}
            {/* Adjusted lg:col-span-1 to fit better, might need tweaking based on content width */}
            <div className='lg:col-span-1 md:col-span-3 sm:col-span-2'>
              <div className='footer-menu'>
                <h5 className='widget-title text-black font-bold mb-3 text-2xl'>
                  Subscribe Us
                </h5>
                <p className='text-sm'>
                  Subscribe to our newsletter to get updates about our grand
                  offers.
                </p>
                <form
                  className='flex mt-3 gap-0'
                  action='#'
                >
                  <input
                    className='form-control flex-grow rounded-l-md rounded-r-none bg-gray-100 text-dark px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder-gray-500' // Added placeholder color
                    type='email'
                    placeholder='Email Address'
                    aria-label='Email Address'
                  />
                  <button
                    className='btn btn-dark bg-dark hover:bg-black text-white rounded-r-md rounded-l-none px-4 py-2 text-sm font-semibold transition-colors duration-200' // Added transition
                    type='submit'
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Bottom */}
      <div
        id='footer-bottom'
        className='bg-white text-gray-600 py-4'
      >
        <div className='container mx-auto px-4 lg:px-8'>
          <div className='flex flex-col md:flex-row justify-between items-center text-xs'>
            {' '}
            {/* text-xs approx */}
            <div className='copyright text-center md:text-left mb-2 md:mb-0'>
              <p>© 2025 Good Health Store. All rights reserved.</p>
            </div>
            {/* <div className='credit-link text-center md:text-right'>
              <p>
                HTML Template by{' '}
                <a
                  href='https://templatesjungle.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-lime-300 underline'
                >
                  TemplatesJungle
                </a>{' '}
                Distributed By{' '}
                <a
                  href='https://themewagon.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-lime-300 underline'
                >
                  ThemeWagon
                </a>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
