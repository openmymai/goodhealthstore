// src/app/admin/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@prisma/client'; // Import types

// Define the type for product data received from admin API (string price)
type AdminApiProduct = Omit<Product, 'price' | 'createdAt' | 'updatedAt'> & {
  price: string;
  createdAt: string; // Dates are likely strings from JSON
  updatedAt: string;
  category: { name: string } | null; // Category name included
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: AdminApiProduct[] = await response.json();
      setProducts(data);
    } catch (e: unknown) {
      console.error('Failed to fetch products:', e);
      const errorMessage = e instanceof Error ? e.message : String(e);
      setError(`ไม่สามารถโหลดข้อมูลได้: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบสินค้า "${name}"?`)) {
      return;
    }
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorMsg = `HTTP error! status: ${response.status} ${
          response.statusText || ''
        }`;
        throw new Error(errorMsg.trim());
      }
      setProducts((currentProducts) =>
        currentProducts.filter((p) => p.id !== id)
      );
      alert('ลบสินค้าสำเร็จ');
    } catch (e: unknown) {
      console.error('Failed to delete product:', e);
      const errorMessage = e instanceof Error ? e.message : String(e);
      setError(`เกิดข้อผิดพลาดในการลบ: ${errorMessage}`);
      alert(`เกิดข้อผิดพลาดในการลบ: ${errorMessage}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='font-heading text-2xl font-bold text-secondary'>
          จัดการสินค้า
        </h1>
        <Link
          href='/admin/products/new'
          className='btn btn-primary bg-primary hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold'
        >
          + เพิ่มสินค้าใหม่
        </Link>
      </div>

      {loading && <p className='text-center text-gray-500'>กำลังโหลด...</p>}
      {error && (
        <p className='text-center text-red-600 bg-red-100 p-3 rounded-md'>
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className='bg-white shadow-md rounded-lg overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  รูป
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  ชื่อสินค้า
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  หมวดหมู่
                </th>
                <th className='px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  ราคา
                </th>
                <th className='px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  สต็อก
                </th>
                <th className='px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  สถานะ
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  อัปเดต
                </th>
                <th className='px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className='hover:bg-gray-50'
                >
                  <td className='px-4 py-2 whitespace-nowrap'>
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={40}
                        height={40}
                        className='h-10 w-10 rounded object-cover'
                      />
                    ) : (
                      <div className='h-10 w-10 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-400'>
                        No Img
                      </div>
                    )}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {product.name}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                    {product.category?.name || '-'}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-700 text-right'>
                    ฿
                    {parseFloat(product.price).toLocaleString('th-TH', {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-center'>
                    {product.stockQuantity}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-center'>
                    {product.isPublished ? (
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                        แสดง
                      </span>
                    ) : (
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-600'>
                        ซ่อน
                      </span>
                    )}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                    {formatDate(product.updatedAt)}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-right text-sm font-medium space-x-2'>
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className='text-indigo-600 hover:text-indigo-900'
                    >
                      แก้ไข
                    </Link>
                    <Link
                      href={`/products/${product.slug || product.id}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:text-blue-900'
                    >
                      ดู
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className='text-red-600 hover:text-red-900'
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className='text-center py-4 text-gray-500'
                  >
                    ไม่พบข้อมูลสินค้า
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
