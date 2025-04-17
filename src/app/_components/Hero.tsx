// components/Hero.tsx
import React from 'react';
import Image from 'next/image'; // Keep Image import if used elsewhere, otherwise remove
import Link from 'next/link';
// Remove icon imports: import { FreshIcon, OrganicIcon, DeliveryIcon } from '@/components/icons';

const Hero = () => {
  return (
    <section
      className='bg-cover bg-no-repeat bg-center relative'
      style={{ backgroundImage: "url('/images/banner-1.jpg')" }}
    >
      <div className='container mx-auto px-4 lg:px-8'>
        <div className='flex flex-wrap'>
          <div className='w-full lg:w-1/2 pt-20 mt-10'>
            <h2 className='text-5xl md:text-6xl lg:text-7xl leading-tight ls-1 mb-4'>
              <span className='font-bold text-primary'>อาหารธรรมชาติ</span>{' '}
              ส่งตรงถึง<span className='font-bold'>หน้าบ้านคุณ</span>
            </h2>
            <p className='text-xl md:text-2xl text-body mb-6'>
              วิถีใหม่แห่งการดูแลตนเอง: เมื่อสุขภาพอยู่ในมือคุณ
            </p>
            <div className='flex flex-wrap gap-3 mb-12'>
              <Link
                href='#'
                className='btn btn-primary text-white bg-primary hover:bg-orange-500 transition-colors duration-300 uppercase text-sm font-semibold rounded-full px-6 py-3 mt-3'
              >
                ช้อปเลย
              </Link>
              <Link
                href='#'
                className='btn btn-dark bg-secondary hover:bg-primary text-white transition-colors duration-300 uppercase text-sm font-semibold rounded-full px-6 py-3 mt-3'
              >
                ดูเพิ่มเติม
              </Link>
            </div>
            {/* Stats Section */}
            <div className='flex flex-wrap my-12 gap-y-6'>
              <div className='w-1/2 md:w-1/3 px-2'>
                <div className='flex items-center text-dark'>
                  <p className='text-4xl lg:text-5xl font-bold leading-none mr-2'>
                    30+
                  </p>
                  <p className='text-xs uppercase leading-tight'>
                    งานวิจัยใน Pubmed
                  </p>
                </div>
              </div>
              <div className='w-1/2 md:w-1/3 px-2'>
                <div className='flex items-center text-dark'>
                  <p className='text-4xl lg:text-5xl font-bold leading-none mr-2'>
                    41M+
                  </p>
                  <p className='text-xs uppercase leading-tight'>ฐานลูกค้า</p>
                </div>
              </div>
              <div className='w-full md:w-1/3 px-2 mt-6 md:mt-0'>
                {' '}
                {/* col */}
                <div className='flex items-center text-dark'>
                  <p className='text-4xl lg:text-5xl font-bold leading-none mr-2'>
                    25+
                  </p>
                  <p className='text-xs uppercase leading-tight'>
                    ประเทศที่ให้บริการ
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Optional: Add the image part if needed */}
          {/* <div className="w-full lg:w-1/2"></div> */}
        </div>
      </div>

      {/* Feature Cards - Placed outside the main container for full width effect */}
      <div className='relative -bottom-16 md:-bottom-12 lg:-bottom-1'>
        <div className='container mx-auto px-0'>
          <div className='grid grid-cols-1 sm:grid-cols-3'>
            {/* Card 1 */}
            <div className='bg-primary p-4 text-white'>
              <div className='flex flex-col md:flex-row items-center'>
                <div className='w-full md:w-1/4 text-center mb-3 md:mb-0'>
                  {/* Use SVG with <use> */}
                  <svg
                    className='w-12 h-12 md:w-16 md:h-16 mx-auto'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#fresh'></use>
                  </svg>
                </div>
                <div className='w-full md:w-3/4 text-center md:text-left'>
                  <div className='p-0'>
                    {' '}
                    {/* Removed card-body class */}
                    <h5 className='text-white font-semibold text-lg mb-1'>
                      คุณภาพสดใหม่
                    </h5>
                    <p className='text-sm opacity-90'>
                      {' '}
                      {/* Removed card-text class */}
                      เลือกสรรค์วัตถุดิบที่สดใหม่และมีคุณภาพสูงสุด
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className='bg-secondary p-4 text-white'>
              <div className='flex flex-col md:flex-row items-center'>
                <div className='w-full md:w-1/4 text-center mb-3 md:mb-0'>
                  {/* Use SVG with <use> */}
                  <svg
                    className='w-12 h-12 md:w-16 md:h-16 mx-auto'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#organic'></use>
                  </svg>
                </div>
                <div className='w-full md:w-3/4 text-center md:text-left'>
                  <div className='p-0'>
                    {' '}
                    {/* Removed card-body class */}
                    <h5 className='text-white font-semibold text-lg mb-1'>
                      100% จากธรรมชาติ
                    </h5>
                    <p className='text-sm opacity-90'>
                      {' '}
                      {/* Removed card-text class */}
                      เลือกสรรค์วัตถุดิบที่ดีที่สุดจากธรรมชาติ
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className='bg-danger p-4 text-white'>
              <div className='flex flex-col md:flex-row items-center'>
                <div className='w-full md:w-1/4 text-center mb-3 md:mb-0'>
                  {/* Use SVG with <use> */}
                  <svg
                    className='w-12 h-12 md:w-16 md:h-16 mx-auto'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#delivery'></use>
                  </svg>
                </div>
                <div className='w-full md:w-3/4 text-center md:text-left'>
                  <div className='p-0'>
                    {' '}
                    {/* Removed card-body class */}
                    <h5 className='text-white font-semibold text-lg mb-1'>
                      จัดส่งฉับไว
                    </h5>
                    <p className='text-sm opacity-90'>
                      {' '}
                      {/* Removed card-text class */}
                      บริการจัดส่งที่รวดเร็วและปลอดภัย
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
