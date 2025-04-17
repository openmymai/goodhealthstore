import type { Product } from '@/types/product'; // ปรับ path ตามโครงสร้างของคุณ

const products: Product[] = [
  {
    id: 1,
    title: 'Whole Wheat Sandwich Bread',
    slug: 'whole-wheat-sandwich-bread',
    imageUrl: '/images/product-thumb-1.png',
    rating: 4.5,
    reviews: 222,
    originalPrice: 24.0,
    discountedPrice: 18.0,
    // discountPercent: 10, // คำนวณได้ หรือใส่ตรงๆ
    category: 'breads-sweets',
    description:
      'Delicious and healthy whole wheat bread, perfect for sandwiches.',
  },
];

export default products;

export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter((product) => product.category === categorySlug);
};
