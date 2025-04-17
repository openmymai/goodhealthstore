// ตัวอย่างใน components/BestSellingProducts.tsx (หรือ component ที่คล้ายกัน)
import React from 'react';
import ProductCard from '@/app/_components/ProductCard';
// Import ข้อมูลโดยตรง หรือ import ฟังก์ชัน helper
import { getAllProducts, getProductsByCategory } from '@/data/products'; // ปรับ path

const BestSellingProducts = () => {
  // ดึงข้อมูลทั้งหมด หรือ กรองตามที่ต้องการ
  const bestSelling = getAllProducts().slice(0, 10); // สมมติว่า 10 อันดับแรกคือขายดี

  // หรือถ้าต้องการกรองตาม category
  // const breadProducts = getProductsByCategory('breads-sweets');

  return (
    <section className='pb-5'>
      <div className='container mx-auto px-4 lg:px-8'>
        <div className='section-header flex flex-wrap justify-between my-4'>
          <h2 className='text-3xl font-bold text-dark'>
            สินค้าขายดี
          </h2>
          {/* ... View All button ... */}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6'>
          {' '}
          {/* Tailwind grid */}
          {bestSelling.map((product) => (
            // ส่งข้อมูล product ไปให้ ProductCard
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingProducts;
