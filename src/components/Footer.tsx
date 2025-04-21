import Link from 'next/link';
import Image from 'next/image';

// Import SVG icons
// import FacebookIcon from '@/assets/icons/facebook.svg';
// ... other icons

const Footer = () => {
  return (
    <footer className='py-10 bg-secondary text-gray-300'>
      {' '}
      {/* Tailwind class */}
      <div className='container-lg mx-auto px-4'>
        {' '}
        {/* Tailwind class */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
          {/* Column 1: Logo & Social */}
          <div className='footer-menu lg:col-span-1 md:col-span-1'>
            {/* ใช้ Next/Image */}
            {/* ต้องปรับ path ถ้า logo ไม่ใช่สีขาว หรือเตรียม logo สำหรับ footer */}
            <Image
              src='/images/logo-white.svg'
              width={180}
              height={52}
              alt='GoodHealthStore Logo White'
            />
            <div className='social-links mt-4'>
              <ul className='flex list-none gap-2'>
                <li>
                  <a
                    href='#'
                    className='btn btn-outline-light border border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white p-2 rounded-md'
                  >
                    <svg
                      width='16'
                      height='16'
                    >
                      <use xlinkHref='#facebook'></use>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='btn btn-outline-light border border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white p-2 rounded-md'
                  >
                    <svg
                      width='16'
                      height='16'
                    >
                      <use xlinkHref='#twitter'></use>
                    </svg>
                  </a>
                </li>
                {/* Add other social icons */}
              </ul>
            </div>
          </div>

          {/* Column 2: Organic Links */}
          <div className='footer-menu'>
            <h5 className='widget-title text-white font-bold mb-3 text-lg'>
              Organic
            </h5>
            <ul className='menu-list list-none space-y-2'>
              <li>
                <Link
                  href='/about'
                  className='nav-link hover:text-white text-sm'
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href='/conditions'
                  className='nav-link hover:text-white text-sm'
                >
                  Conditions
                </Link>
              </li>
              {/* Add other links */}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className='footer-menu'>
            <h5 className='widget-title text-white font-bold mb-3 text-lg'>
              Quick Links
            </h5>
            <ul className='menu-list list-none space-y-2'>
              <li>
                <Link
                  href='/offers'
                  className='nav-link hover:text-white text-sm'
                >
                  Offers
                </Link>
              </li>
              {/* Add other links */}
            </ul>
          </div>

          {/* Column 4: Customer Service */}
          <div className='footer-menu'>
            <h5 className='widget-title text-white font-bold mb-3 text-lg'>
              Customer Service
            </h5>
            <ul className='menu-list list-none space-y-2'>
              <li>
                <Link
                  href='/faq'
                  className='nav-link hover:text-white text-sm'
                >
                  FAQ
                </Link>
              </li>
              {/* Add other links */}
            </ul>
          </div>

          {/* Column 5: Subscribe */}
          <div className='footer-menu lg:col-span-1 md:col-span-3 sm:col-span-2'>
            <h5 className='widget-title text-white font-bold mb-3 text-lg'>
              Subscribe Us
            </h5>
            <p className='text-sm'>Subscribe to our newsletter for updates.</p>
            <form
              className='flex mt-3 gap-0'
              action='#'
            >
              <input
                className='form-control rounded-l-md bg-gray-100 text-gray-800 border-0 focus:ring-primary text-sm px-3 py-2 flex-grow'
                type='email'
                placeholder='Email Address'
                aria-label='Email Address'
              />
              <button
                className='btn btn-primary text-white rounded-r-md px-4 py-2 text-sm font-semibold'
                type='submit'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className='border-t border-gray-700 mt-10 pt-5 text-center text-xs text-gray-500'>
        <div className='container-lg mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='copyright mb-2 md:mb-0'>
              <p>
                © {new Date().getFullYear()} GoodHealthStore. All rights
                reserved.
              </p>
            </div>
            {/* Optional: Credit Link */}
            {/* <div className="credit-link">
                      <p>Design inspired by TemplatesJungle/ThemeWagon</p>
                  </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
