// app/products/page.tsx
// SERVER COMPONENT

import React from 'react';
import { Metadata } from 'next';
import { getAllProducts } from '@/data/products'; // Import function to get all products
import ProductCard from '@/app/_components/ProductCard'; // Import the card component

export const metadata: Metadata = {
  title: 'สินค้าทั้งหมด | Good Health Store',
  description: 'เลือกซื้อสินค้าออร์แกนิกคุณภาพหลากหลายรายการ ทั้งอาหาร ของใช้ เพื่อสุขภาพที่ดี | Good Health Store',
};

export default function AllProductsPage() {
  // Fetch all products on the server
  const products = getAllProducts(); // Get all products

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-dark mb-8 border-b border-border-color pb-4">
        สินค้าทั้งหมด ({products.length})
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            // Render ProductCard for each product
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-body">ไม่พบสินค้าในขณะนี้</p>
        </div>
      )}

      {/* Optional: Add Filters or Sorting options here */}
    </div>
  );
}