// src/app/shop/page.tsx
import ProductCard from '@/components/ProductCard'; // We'll create this next
import { Product } from '@prisma/client'; // Assuming ProductCard needs full type for now

export const revalidate = 60; // Revalidate every 60 seconds

// Define the type for the product data fetched from the API (with string price)
type ShopProduct = Omit<
  Product,
  'price' | 'createdAt' | 'updatedAt' | 'categoryId'
> & {
  price: string;
  // Add category info if selected in API
  // category?: { slug: string; name: string } | null;
};

async function getProducts(): Promise<ShopProduct[]> {
  try {
    // Fetch from our public API endpoint
    // Use NEXTAUTH_URL for server-side fetching if needed, otherwise relative path works
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 60 }, // Optional: control caching per fetch
    });

    if (!response.ok) {
      console.error(
        'Shop page failed to fetch products:',
        response.status,
        response.statusText
      );
      return []; // Return empty on error
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error in getProducts:', error);
    return [];
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className='container-lg mx-auto px-4 py-12'>
      <h1 className='text-4xl font-heading font-bold mb-8 text-center text-secondary'>
        เลือกซื้อสินค้าเพื่อสุขภาพ
      </h1>

      {products.length === 0 ? (
        <p className='text-center text-gray-600'>ขออภัย ไม่พบสินค้าในขณะนี้</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {products.map((product) => (
            // Pass product data to the ProductCard component
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
      {/* TODO: Add Filtering/Sorting Controls */}
      {/* TODO: Add Pagination */}
    </div>
  );
}
