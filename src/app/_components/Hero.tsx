// components/Hero.tsx
import React from 'react';
import Image from 'next/image'; // Keep Image import if used elsewhere, otherwise remove
import Link from 'next/link';
// Remove icon imports: import { FreshIcon, OrganicIcon, DeliveryIcon } from '@/components/icons';

const Hero = () => {
  return (
    <section className='relative overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center'> {/* กำหนด min-height และ flex */}

      {/* Image Component สำหรับ Background */}
      <Image
        src="/images/banner-1.jpg" // Path รูปภาพของคุณ
        alt="Organic Groceries Banner" // ใส่ Alt Text ที่สื่อความหมาย
        fill // ทำให้รูปภาพเต็มพื้นที่ parent (ต้องมี parent ที่เป็น relative, absolute, fixed, sticky)
        style={{ objectFit: 'cover' }} // ให้รูปภาพ cover พื้นที่โดยไม่เสียสัดส่วน (เหมือน background-size: cover)
        quality={85} // กำหนดคุณภาพ (0-100, default 75) ลองปรับค่านี้ดู
        priority // บอกให้โหลดรูปนี้ก่อน (สำคัญสำหรับ Hero Banner)
        className="-z-10" // ใช้ z-index ติดลบเพื่อส่งไปอยู่หลังสุด
        // Optional: Sizes attribute for responsive optimization
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
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
                href='/products'
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
    </section>
  );
};

export default Hero;
