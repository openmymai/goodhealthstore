// components/CategoryCarousel.tsx
'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Dummy Data (Replace with actual data fetching later)
const categories = [
  {
    id: 1,
    name: 'Fruits & Veges',
    img: '/images/category-thumb-1.jpg',
    link: '/category/fruits-veges',
  },
  {
    id: 2,
    name: 'Breads & Sweets',
    img: '/images/category-thumb-2.jpg',
    link: '/category/breads-sweets',
  },
  {
    id: 3,
    name: 'Coffee & Teas',
    img: '/images/category-thumb-3.jpg',
    link: '/category/coffee-teas',
  }, // Example name change
  {
    id: 4,
    name: 'Beverages',
    img: '/images/category-thumb-4.jpg',
    link: '/category/beverages',
  },
  {
    id: 5,
    name: 'Meat Products',
    img: '/images/category-thumb-5.jpg',
    link: '/category/meat',
  },
  {
    id: 6,
    name: 'Breads',
    img: '/images/category-thumb-6.jpg',
    link: '/category/breads',
  },
  {
    id: 7,
    name: 'Dairy & Eggs',
    img: '/images/category-thumb-7.jpg',
    link: '/category/dairy-eggs',
  }, // Example name change
  {
    id: 8,
    name: 'Snacks',
    img: '/images/category-thumb-8.jpg',
    link: '/category/snacks',
  }, // Example name change
  // Add more categories...
  {
    id: 9,
    name: 'Fruits & Veges',
    img: '/images/category-thumb-1.jpg',
    link: '/category/fruits-veges',
  },
  {
    id: 10,
    name: 'Breads & Sweets',
    img: '/images/category-thumb-2.jpg',
    link: '/category/breads-sweets',
  },
  {
    id: 11,
    name: 'Coffee & Teas',
    img: '/images/category-thumb-3.jpg',
    link: '/category/coffee-teas',
  }, // Example name change
  {
    id: 12,
    name: 'Beverages',
    img: '/images/category-thumb-4.jpg',
    link: '/category/beverages',
  },
  {
    id: 13,
    name: 'Meat Products',
    img: '/images/category-thumb-5.jpg',
    link: '/category/meat',
  },
  {
    id: 14,
    name: 'Breads',
    img: '/images/category-thumb-6.jpg',
    link: '/category/breads',
  },
  {
    id: 15,
    name: 'Dairy & Eggs',
    img: '/images/category-thumb-7.jpg',
    link: '/category/dairy-eggs',
  }, // Example name change
  {
    id: 16,
    name: 'Snacks',
    img: '/images/category-thumb-8.jpg',
    link: '/category/snacks',
  },
];

const CategoryCarousel = () => {
  const swiperRef = useRef<any>(null);

  return (
    <section className='py-10 overflow-hidden'>
      {' '}
      {/* py-5 */}
      <div className='container mx-auto px-4 lg:px-8'>
        {' '}
        {/* container-lg */}
        <div className='flex flex-wrap justify-between items-center mb-8'>
          {' '}
          {/* section-header */}
          <h2 className='text-3xl font-bold text-dark'>Category</h2>{' '}
          {/* section-title */}
          <div className='flex items-center gap-2'>
            {' '}
            {/* d-flex align-items-center */}
            <Link
              href='/categories'
              className='btn btn-primary bg-primary text-white hover:bg-orange-500 px-4 py-2 rounded text-sm font-semibold transition-colors duration-300'
            >
              View All
            </Link>
            {/* Swiper Navigation Buttons */}
            <div className='swiper-buttons flex gap-1'>
              <button
                onClick={() => swiperRef.current?.swiper.slidePrev()}
                className='swiper-button-base category-carousel-prev' // Use base class + specific
                aria-label='Previous Category'
              >
                ❮
              </button>
              <button
                onClick={() => swiperRef.current?.swiper.slideNext()}
                className='swiper-button-base category-carousel-next'
                aria-label='Next Category'
              >
                ❯
              </button>
            </div>
          </div>
        </div>
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={20} // Adjust spacing
          slidesPerView={2} // Start with mobile view
          // navigation={{ // We use custom buttons
          //   prevEl: '.category-carousel-prev',
          //   nextEl: '.category-carousel-next',
          // }}
          breakpoints={{
            // when window width is >= 640px
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
            // when window width is >= 1280px
            1280: {
              slidesPerView: 8,
              spaceBetween: 30,
            },
          }}
          className='category-carousel' // Add class for potential specific styling
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link
                href={category.link}
                className='nav-link block text-center group'
              >
                <Image
                  src={category.img}
                  alt={category.name}
                  width={150} // Adjust size
                  height={150}
                  className='rounded-full mx-auto border-2 border-transparent group-hover:border-primary transition-all duration-300'
                />
                <h4 className='text-base font-normal text-dark mt-3 group-hover:text-primary transition-colors duration-300'>
                  {' '}
                  {/* fs-6 */}
                  {category.name}
                </h4>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryCarousel;
