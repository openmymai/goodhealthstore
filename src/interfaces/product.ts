export interface Product {
  id: number | string; // ใช้ number หรือ string ก็ได้ แต่ต้องสอดคล้องกัน
  title: string;
  slug: string; // สำหรับสร้าง URL เฉพาะของสินค้า
  imageUrl: string;
  rating: number; // เช่น 4.5
  reviews: number;
  originalPrice?: number; // ราคาเดิม (optional)
  discountedPrice: number; // ราคาปัจจุบัน/ลดแล้ว
  discountPercent?: number; // % ส่วนลด (optional, คำนวณได้)
  category: string; // เช่น 'fruits-veges', 'breads-sweets'
  description?: string; // รายละเอียด (สำหรับหน้า product detail)
  // เพิ่ม properties อื่นๆ ตามต้องการ
}

export interface CartItem extends Product {
  quantity: number;
}

// Wishlist item can just be the Product itself for simplicity now
export type WishlistItem = Product;
