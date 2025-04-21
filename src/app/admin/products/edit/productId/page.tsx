// src/app/admin/products/edit/[productId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { Product } from '@prisma/client'; // Use full type for editing

// Define the type for product data received from API (string price)
type AdminApiProductEdit = Omit<
  Product,
  'price' | 'createdAt' | 'updatedAt'
> & {
  price: string;
  createdAt: string;
  updatedAt: string;
  category: { id: number; name: string } | null;
};

export default function EditProductPage() {
  const params = useParams();
  const id = params?.productId; // Match folder name
  const [product, setProduct] = useState<AdminApiProductEdit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== 'string') {
      setError('ID สินค้าไม่ถูกต้อง');
      setLoading(false);
      return;
    }

    const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/admin/products/${id}`);
        if (!response.ok) {
          let errorMsg = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMsg = errorData.error || errorMsg;
          } catch {}
          throw new Error(errorMsg);
        }
        const data: AdminApiProductEdit = await response.json();
        setProduct(data);
      } catch (e: unknown) {
        console.error('Failed to fetch product data for editing:', e);
        const errorMessage = e instanceof Error ? e.message : String(e);
        setError(`ไม่สามารถโหลดข้อมูลสินค้า: ${errorMessage}`);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  return (
    <div>
      <h1 className='font-heading text-2xl font-bold text-secondary mb-6'>
        แก้ไขสินค้า (ID: {id})
      </h1>
      {loading && (
        <p className='text-center text-gray-500'>กำลังโหลดข้อมูล...</p>
      )}
      {error && (
        <p className='text-center text-red-600 bg-red-100 p-3 rounded-md'>
          {error}
        </p>
      )}
      {!loading && !error && product && (
        // Pass the fetched product data (with string price) to the form
        <ProductForm product={product} />
      )}
      {!loading && !error && !product && (
        <p className='text-center text-gray-500'>
          ไม่พบข้อมูลสินค้าที่ต้องการแก้ไข
        </p>
      )}
    </div>
  );
}
