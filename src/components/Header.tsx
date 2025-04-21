import Link from 'next/link';
import Image from 'next/image'; // ใช้ Image component ของ Next.js

// Import SVG icons (วิธีทำจะขึ้นอยู่กับว่าเลือกใช้แบบไหน อาจจะ import ตรงๆ หรือใช้ library)
// import UserIcon from '@/assets/icons/user.svg'; // ตัวอย่างถ้าเก็บ SVG ไว้
// import WishlistIcon from '@/assets/icons/wishlist.svg';
// import ShoppingBagIcon from '@/assets/icons/shopping-bag.svg';
// import MenuIcon from '@/assets/icons/menu.svg';
// import SearchIcon from '@/assets/icons/search.svg';

const Header = () => {
  return (
    <header className='container-fluid'>
      {' '}
      {/* ใช้ class จาก Tailwind */}
      <div className='row py-3 border-b border-gray-200'>
        {' '}
        {/* ใช้ border color ของ Tailwind */}
        {/* Column 1: Logo & Menu Toggle */}
        <div className='col-sm-4 col-lg-2 flex items-center justify-center sm:justify-start gap-3'>
          <Link href='/'>
            {/* ใช้ Next/Image เพื่อ optimize รูปภาพ */}
            <Image
              src='/images/logo.svg'
              alt='GoodHealthStore Logo'
              width={150}
              height={46}
              priority
            />
            {/* ขนาด width/height อาจจะต้องปรับตาม logo จริง */}
          </Link>
          <button
            className='lg:hidden navbar-toggler'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasNavbar'
            aria-controls='offcanvasNavbar'
          >
            {/* ใส่ SVG Icon ที่นี่ */}
            {/* <MenuIcon className="w-6 h-6" /> */}
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <use xlinkHref='#menu'></use>
            </svg>{' '}
            {/* ใช้ SVG Symbol จาก HTML เดิมไปก่อน */}
          </button>
        </div>
        {/* Column 2: Search Bar */}
        <div className='col-sm-6 offset-sm-2 offset-md-0 col-lg-4 mt-3 sm:mt-0'>
          <div className='search-bar flex items-center bg-gray-100 p-2 rounded-full'>
            {' '}
            {/* Tailwind class */}
            <div className='hidden md:block w-1/3'>
              <select className='form-select border-0 bg-transparent focus:ring-0 w-full text-sm text-gray-600'>
                <option>All Categories</option>
                <option>Groceries</option>
                <option>Drinks</option>
                <option>Chocolates</option>
              </select>
            </div>
            <div className='flex-grow px-2'>
              <form
                id='search-form'
                action='/'
                method='post'
              >
                <input
                  type='text'
                  className='form-control border-0 bg-transparent focus:ring-0 w-full placeholder-gray-500 text-sm'
                  placeholder='Search products...'
                />
              </form>
            </div>
            <div className='px-2'>
              {/* ใส่ SVG Icon ที่นี่ */}
              {/* <SearchIcon className="w-5 h-5 text-gray-500" /> */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z'
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Column 3: Navigation Links (ตัวอย่าง) */}
        <div className='col-lg-4 hidden lg:flex items-center justify-center'>
          <ul className='navbar-nav flex flex-row gap-5 list-none font-bold uppercase text-sm text-gray-700'>
            <li className='nav-item'>
              <Link
                href='/'
                className='nav-link hover:text-primary'
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                href='/blog'
                className='nav-link hover:text-primary'
              >
                Blog
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                href='/shop'
                className='nav-link hover:text-primary'
              >
                Shop
              </Link>
            </li>
            {/* เพิ่ม Pages Dropdown ทีหลัง */}
          </ul>
        </div>
        {/* Column 4: User Icons */}
        <div className='col-sm-8 col-lg-2 flex gap-3 items-center justify-center sm:justify-end mt-3 lg:mt-0'>
          <a
            href='#'
            className='p-2 text-gray-600 hover:text-primary'
          >
            <svg
              width='24'
              height='24'
            >
              <use xlinkHref='#user'></use>
            </svg>
          </a>
          <a
            href='#'
            className='p-2 text-gray-600 hover:text-primary'
          >
            <svg
              width='24'
              height='24'
            >
              <use xlinkHref='#wishlist'></use>
            </svg>
          </a>
          <a
            href='#'
            className='p-2 text-gray-600 hover:text-primary'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasCart'
            aria-controls='offcanvasCart'
          >
            <svg
              width='24'
              height='24'
            >
              <use xlinkHref='#shopping-bag'></use>
            </svg>
          </a>
        </div>
      </div>
      {/* อาจจะต้องเพิ่มส่วน Offcanvas Menu และ Cart ทีหลัง */}
    </header>
  );
};

export default Header;
