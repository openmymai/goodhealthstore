// src/app/products/[productId]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import AddToCartButton from '@/components/AddToCartButton'; // We'll create this
import { Product } from '@prisma/client';

// Define props type for the page
type ProductDetailPageProps = {
  params: Promise<{ productId: string }>; // productId can be ID or Slug
};

// Define the type for the full product data (with string price) including category
type FullProduct = Omit<Product, 'price'> & {
  price: string;
  category: { name: string; slug: string } | null; // Adjust based on your needs
};

// Function to fetch a single product by ID or Slug
async function getProduct(idOrSlug: string): Promise<FullProduct | null> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products/${idOrSlug}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (response.status === 404) {
      return null; // Not found
    }
    if (!response.ok) {
      console.error(
        'Product detail page failed to fetch:',
        response.status,
        response.statusText
      );
      return null; // Return null on other errors
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(`Error fetching product ${idOrSlug}:`, error);
    return null;
  }
}

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    return {
      title: 'ไม่พบสินค้า',
      description: 'ขออภัย ไม่พบสินค้าที่คุณกำลังค้นหา',
    };
  }

  return {
    title: `${product.name} | GoodHealthStore`,
    description: product.description.substring(0, 160), // Use product description
    openGraph: {
      title: product.name,
      description: product.description.substring(0, 160),
      images: product.imageUrl
        ? [{ url: product.imageUrl, alt: product.name }]
        : [],
      type: 'article', // Use 'product' type for OG
      siteName: 'GoodHealthStore',
      locale: 'th_TH',
      url: `/products/${product.slug}`, // Canonical URL
      // Add product specific OG tags if needed (price, availability etc.)
      // See: https://ogp.me/#type_product
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description.substring(0, 160),
      images: product.imageUrl ? [product.imageUrl] : [],
    },
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

// The Page Component
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound(); // Trigger 404 page if product not found
  }

  return (
    <div className='container-lg mx-auto px-4 py-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
        {/* Product Image */}
        <div className='relative aspect-square rounded-lg overflow-hidden shadow-lg'>
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }} // Use contain or cover based on preference
              priority
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          ) : (
            <div className='bg-gray-200 h-full flex items-center justify-center text-gray-400'>
              ไม่มีรูปภาพ
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className='flex flex-col'>
          {product.category && (
            <span className='text-sm text-gray-500 mb-2 uppercase tracking-wider'>
              {product.category.name}
            </span>
          )}
          <h1 className='text-3xl lg:text-4xl font-heading font-bold text-secondary mb-3 leading-tight'>
            {product.name}
          </h1>
          <p className='text-2xl font-semibold text-primary mb-4'>
            ฿
            {parseFloat(product.price).toLocaleString('th-TH', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          {/* Stock Info - Basic */}
          <p
            className={`text-sm mb-4 ${
              product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {product.stockQuantity > 0
              ? `มีสินค้า (${product.stockQuantity} ชิ้น)`
              : 'สินค้าหมด'}
          </p>

          {/* Add to Cart Button & Quantity Selector */}
          {/* We will use a client component for interactivity */}
          <AddToCartButton
            product={product}
            disabled={product.stockQuantity <= 0}
          />

          {/* Description */}
          <div className='mt-8 pt-6 border-t border-gray-200'>
            <h2 className='text-xl font-heading font-semibold text-secondary mb-3'>
              รายละเอียดสินค้า
            </h2>
            {/* Use prose for styling HTML content from description */}
            <div
              className='prose prose-sm max-w-none text-gray-700'
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            {/* Or use Markdown renderer if description is in Markdown */}
            {/* <ReactMarkdown className="prose prose-sm max-w-none text-gray-700">{product.description}</ReactMarkdown> */}
          </div>

          {/* Optional: SKU */}
          {product.sku && (
            <p className='text-xs text-gray-400 mt-4'>SKU: {product.sku}</p>
          )}
        </div>
      </div>
      {/* TODO: Add Related Products Section */}
    </div>
  );
}
