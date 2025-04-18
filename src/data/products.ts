import type { Product } from '@/types/product'; // ปรับ path ตามโครงสร้างของคุณ

const products: Product[] = [
  {
    id: 1,
    title: 'Protandim NRF1',
    slug: 'protandim-nrf1',
    imageUrl: '/images/products/gallery-protandim-nrf1-TH.png',
    rating: 5,
    reviews: 0,
    originalPrice: 2100.0,
    discountedPrice: 1750.0,
    // discountPercent: 10, // คำนวณได้ หรือใส่ตรงๆ
    category: 'Protandim',
    description:
      'โปรแทนดิม NRF1 เป็นความก้าวหน้าทางเทคโนโลยีแห่งวงการโภชนพันธุศาสตร์ เพื่อชะลอความเสื่อมวัย โดยใช้ส่วนผสมของสมุนไพรจากธรรมชาติ ในการกระตุ้นการทำงานของไมโตรคอนเดรีย เพื่อให้กระบวนการเผาผลาญสารอาหารในร่างกายดีขึ้น',
  },
  {
    id: 2,
    title: 'Protandim NRF2',
    slug: 'protandim-nrf2',
    imageUrl: '/images/products/gallery-protandim-nrf2-TH.png',
    rating: 5,
    reviews: 0,
    originalPrice: 2100.0,
    discountedPrice: 1750.0,
    // discountPercent: 10, // คำนวณได้ หรือใส่ตรงๆ
    category: 'Protandim',
    description:
      'โปรแทนดิม ผลิตจากสมุนไพรที่ดี 4 ชนิดที่มีประสิทธิภาพในการต่อต้านสารอนุมูลอิสระ ได้อย่างสมบูรณ์และมีประสิทธิผล',
  },
  {
    id: 3,
    title: 'ProBio',
    slug: 'probio',
    imageUrl: '/images/products/gallery-lifevantage-probio-TH.png',
    rating: 5,
    reviews: 0,
    originalPrice: 1800.0,
    discountedPrice: 1500.0,
    // discountPercent: 10, // คำนวณได้ หรือใส่ตรงๆ
    category: 'Protandim',
    description:
      'ไลฟ์เวนเทจ โปรไบโอ ให้แบคทีเรียที่ดีต่อสุขภาพ 6 พันล้านหน่วย ซีเอฟยู* ที่ส่งเสริมระบบการย่อยอาหารให้มีความสมดุล',
  },
  {
    id: 4,
    title: 'Value Stack',
    slug: 'value-stack',
    imageUrl: '/images/products/shop-truescience-system-TH.png',
    rating: 5,
    reviews: 0,
    originalPrice: 6100.0,
    discountedPrice: 7320.0,
    // discountPercent: 10, // คำนวณได้ หรือใส่ตรงๆ
    category: 'Protandim',
    description:
      'โปรแทนดิม เอ็นอาร์เอฟวัน และ เอ็นอาร์เอฟทู พร้อมมอยเจอร์ไรเซอร์เพิ่มความกระจ่างใสที่ให้ความชุ่มชื้นและเรียบเนียนอย่างเห็นได้ชัด เพื่อมอบผิวที่กระจ่างใส ฟื้นบำรุงอย่างล้ำลึก ดูอ่อนเยาว์',
  },
  {
    id: 5,
    title: 'TrueScience TrueClean Refining Cleanser',
    slug: 'trueScience-trueClean-refining-cleanser',
    imageUrl: '/images/products/gallery-truescience-TrueClean-tube-TH.png',
    rating: 5,
    reviews: 0,
    originalPrice: 1200.0,
    discountedPrice: 1000.0,
    // discountPercent: 10, // คำนวณได้ หรือใส่ตรงๆ
    category: 'TrueScience',
    description:
      'ชำระล้างและขับออกด้วยผลิตภัณฑ์ 2 อิน 1 นี้ที่จะทำให้ผิวของคุณสะอาดและนุ่มนวลโดยไม่ให้ความรู้สึกตึงหรือแห้งเลย',
  },
  {
    id: 6,
    title: 'TrueScience Perfecting Lotion',
    slug: 'trueScience-perfecting-lotion',
    imageUrl: '/images/products/gallery-truescience-perfecting-lotion-TH.png',
    rating: 5,
    reviews: 0,
    originalPrice: 1560.0,
    discountedPrice: 1300.0,
    // discountPercent: 10, // คำนวณได้ หรือใส่ตรงๆ
    category: 'TrueScience',
    description:
      'เพอร์เฟ็คติ้ง โลชั่น คืนความสดใส ความมีชีวิตชีวา เปล่งประกาย, ความชุ่มชื้นของผิวหน้า และโทนผิวที่สม่ำเสมอภายใน 4 สัปดาห์ ด้วยนวัตกรรม Nrf2 ของเรา',
  },
  {
    id: 7,
    title: 'TrueScience TrueLift Illuminating Eye Cream',
    slug: 'trueScience-trueLift-illuminating-eye-cream',
    imageUrl: '/images/products/gallery-truescience-TrueLift-tube-TH.png',
    rating: 5,
    reviews: 0,
    originalPrice: 1800.0,
    discountedPrice: 1500.0,
    // discountPercent: 10, // คำนวณได้ หรือใส่ตรงๆ
    category: 'TrueScience',
    description:
      'ดูแลดวงตาของคุณด้วยครีมบำรุงรอบดวงตาที่เปล่งประกายซึ่งตรงไปที่สัญญาณแห่งวัยที่มองเห็นได้ 7 ประการ เพื่อมอบคุณประโยชน์ที่ช่วยชะลอวัยแบบ 360 องศา',
  },
  {
    id: 8,
    title: 'TrueScience TrueRenew Daily Firming Complex',
    slug: 'trueScience-trueRenew-daily-firming-complex',
    imageUrl: '/images/products/gallery-truescience-TrueRenew-jar-TH.png',
    rating: 5,
    reviews: 0,
    originalPrice: 2850.0,
    discountedPrice: 2250.0,
    // discountPercent: 10, // คำนวณได้ หรือใส่ตรงๆ
    category: 'TrueScience',
    description:
      'เผยผิวใหม่ที่แท้จริงของคุณด้วยส่วนผสมที่อ่อนโยนต่อผิวในตัวเลือกที่ดีกว่าเรตินอล ซึ่งผ่านการพิสูจน์ทางคลินิกแล้วว่าสามารถจัดการกับสัญญาณความชราที่เห็นได้ชัด 11 สัญญาณ เพื่อให้ผิวคุณคืนความเปล่งปลั่งอ่อนเยาว์ได้อีกครั้ง',
  },
  {
    id: 9,
    title: 'TrueScience TrueHydrate Brightening Moisturizer',
    slug: 'trueScience-trueHydrate-brightening-moisturizer',
    imageUrl: '/images/products/gallery-truescience-TrueHydrate-jar-TH.png',
    rating: 5,
    reviews: 0,
    originalPrice: 2976.0,
    discountedPrice: 2480.0,
    // discountPercent: 10, // คำนวณได้ หรือใส่ตรงๆ
    category: 'TrueScience',
    description:
      'มอยเจอร์ไรเซอร์เพิ่มความกระจ่างใสที่ให้ความชุ่มชื้นและเรียบเนียนอย่างเห็นได้ชัด เพื่อมอบผิวที่กระจ่างใส ฟื้นบำรุงอย่างล้ำลึก ดูอ่อนเยาว์',
  },
  {
    id: 10,
    title: 'TrueScience Activated Skin Care Collection',
    slug: 'trueScience-activated-skin-care-collection',
    imageUrl: '/images/products/gallery-truescience-TrueHydrate-jar-TH.png',
    rating: 5,
    reviews: 0,
    originalPrice: 6.0,
    discountedPrice: 2480.0,
    // discountPercent: 10, // คำนวณได้ หรือใส่ตรงๆ
    category: 'TrueScience',
    description:
      'มอยเจอร์ไรเซอร์เพิ่มความกระจ่างใสที่ให้ความชุ่มชื้นและเรียบเนียนอย่างเห็นได้ชัด เพื่อมอบผิวที่กระจ่างใส ฟื้นบำรุงอย่างล้ำลึก ดูอ่อนเยาว์',
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
