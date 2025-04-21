// src/components/admin/ProductForm.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Product, Category } from '@prisma/client'; // Import types
import Image from 'next/image';

// Type for the category fetched for the dropdown
type CategoryOption = Pick<Category, 'id' | 'name'>;

// Type for the product data passed in (might have string price from API)
type InitialProductData = Omit<Product, 'price' | 'createdAt' | 'updatedAt'> & {
  price: string | number; // Allow number for initial state, string from fetch
};

interface ProductFormProps {
  product?: InitialProductData | null; // Optional product data for editing
}

export default function ProductForm({ product }: ProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(''); // Store price as string in form state
  const [stockQuantity, setStockQuantity] = useState(''); // Store stock as string
  const [categoryId, setCategoryId] = useState<string>(''); // Store category ID as string (value from select)
  const [imageUrl, setImageUrl] = useState('');
  const [sku, setSku] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCategories, setIsFetchingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isEditing = !!product;

  // Fetch categories for the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      setIsFetchingCategories(true);
      try {
        const response = await fetch('/api/admin/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: CategoryOption[] = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('ไม่สามารถโหลดหมวดหมู่สินค้าได้');
      } finally {
        setIsFetchingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Populate form if editing
  useEffect(() => {
    if (isEditing && product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(String(product.price)); // Convert initial price to string
      setStockQuantity(String(product.stockQuantity)); // Convert stock to string
      setCategoryId(String(product.categoryId || '')); // Convert categoryId to string or empty string
      setImageUrl(product.imageUrl || '');
      setSku(product.sku || '');
      setIsPublished(product.isPublished);
    } else if (!isEditing) {
      // Reset form for 'new' mode or if product data is cleared
      setName('');
      setDescription('');
      setPrice('');
      setStockQuantity('');
      setCategoryId('');
      setImageUrl('');
      setSku('');
      setIsPublished(false);
    }
  }, [isEditing, product]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // --- Validation & Data Preparation ---
    let validatedPrice = '';
    try {
      const priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum < 0) throw new Error();
      validatedPrice = priceNum.toFixed(2); // Ensure 2 decimal places as string for Decimal type
    } catch {
      setError('ราคาไม่ถูกต้อง (ต้องเป็นตัวเลขไม่ติดลบ)');
      setIsLoading(false);
      return;
    }

    let validatedStock = '';
    try {
      const stockNum = parseInt(stockQuantity);
      if (isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum))
        throw new Error();
      validatedStock = String(stockNum); // Keep as string, API will parse
    } catch {
      setError('จำนวนสต็อกไม่ถูกต้อง (ต้องเป็นจำนวนเต็มไม่ติดลบ)');
      setIsLoading(false);
      return;
    }

    const productData = {
      name,
      description,
      price: validatedPrice, // Send validated price string
      stockQuantity: validatedStock, // Send validated stock string
      categoryId: categoryId ? parseInt(categoryId) : null, // Convert back to number or null
      imageUrl: imageUrl || null,
      sku: sku || null,
      isPublished,
    };
    // --- End Validation ---

    const url = isEditing
      ? `/api/admin/products/${product?.id}`
      : '/api/admin/products';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        let errorMsg = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }

      alert(`บันทึกสินค้า${isEditing ? 'แก้ไข' : 'ใหม่'}สำเร็จ!`);
      router.push('/admin/products'); // Redirect to product list
      router.refresh(); // Force refresh data on the list page
    } catch (err: unknown) {
      console.error('Failed to save product:', err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`เกิดข้อผิดพลาด: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6 bg-white p-8 rounded-lg shadow-md'
    >
      {error && (
        <p className='bg-red-100 text-red-700 p-3 rounded-md mb-4'>{error}</p>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          ชื่อสินค้า <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
          className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor='description'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          รายละเอียด <span className='text-red-500'>*</span>
        </label>
        <textarea
          id='description'
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={isLoading}
          className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
        {/* Optional: Add guidance for HTML or Markdown if needed */}
      </div>

      {/* Price & Stock */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label
            htmlFor='price'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            ราคา (บาท) <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            pattern='^\d+(\.\d{1,2})?$'
            title='กรุณาใส่ราคาเป็นตัวเลข เช่น 199 หรือ 199.50'
            disabled={isLoading}
            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='เช่น 199.00'
          />
        </div>
        <div>
          <label
            htmlFor='stockQuantity'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            จำนวนสต็อก <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='stockQuantity'
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            required
            pattern='^\d+$'
            title='กรุณาใส่จำนวนเป็นตัวเลขจำนวนเต็ม'
            disabled={isLoading}
            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='เช่น 100'
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor='category'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          หมวดหมู่
        </label>
        <select
          id='category'
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoading || isFetchingCategories}
          className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white disabled:bg-gray-100'
        >
          <option value=''>-- เลือกหมวดหมู่ --</option>
          {isFetchingCategories ? (
            <option disabled>กำลังโหลดหมวดหมู่...</option>
          ) : categories.length === 0 ? (
            <option disabled>ไม่พบหมวดหมู่</option>
          ) : (
            categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
              >
                {cat.name}
              </option>
            ))
          )}
        </select>
        {/* Optional: Link to manage categories */}
        <p className='mt-1 text-xs text-gray-500'>
          หากไม่มีหมวดหมู่ที่ต้องการ กรุณาไปสร้างหมวดหมู่ก่อน
          (ต้องทำหน้านี้เพิ่ม)
        </p>
      </div>

      {/* Image URL & SKU */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label
            htmlFor='imageUrl'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            URL รูปภาพ
          </label>
          <input
            type='text'
            id='imageUrl'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={isLoading}
            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='เช่น /images/product.jpg'
          />
          {imageUrl && (
            <div className='mt-2'>
              {' '}
              <Image
                src={imageUrl}
                width={200}
                height={200}
                alt='Preview'
                className='max-h-32 rounded border border-gray-200'
              />{' '}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor='sku'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            SKU (Optional)
          </label>
          <input
            type='text'
            id='sku'
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            disabled={isLoading}
            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
      </div>

      {/* Published Checkbox */}
      <div className='flex items-center'>
        <input
          id='published'
          type='checkbox'
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          disabled={isLoading}
          className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
        />
        <label
          htmlFor='published'
          className='ml-2 block text-sm text-gray-900'
        >
          แสดงสินค้านี้ในหน้าร้าน
        </label>
      </div>

      {/* Action Buttons */}
      <div className='flex justify-end space-x-3 border-t pt-5 mt-6'>
        <button
          type='button'
          onClick={() => router.back()}
          disabled={isLoading}
          className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md text-sm disabled:opacity-50'
        >
          ยกเลิก
        </button>
        <button
          type='submit'
          disabled={isLoading}
          className='bg-primary hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md text-sm disabled:opacity-50 flex items-center'
        >
          {isLoading && (
            <svg
              className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          )}
          {isLoading
            ? isEditing
              ? 'กำลังอัปเดต...'
              : 'กำลังสร้าง...'
            : isEditing
            ? 'บันทึกการแก้ไข'
            : 'สร้างสินค้า'}
        </button>
      </div>
    </form>
  );
}
