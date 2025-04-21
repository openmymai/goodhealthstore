// src/app/admin/products/new/page.tsx
import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <h1 className='font-heading text-2xl font-bold text-secondary mb-6'>
        เพิ่มสินค้าใหม่
      </h1>
      <ProductForm /> {/* Render form in create mode */}
    </div>
  );
}
