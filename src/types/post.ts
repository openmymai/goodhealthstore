// types/index.ts (หรือ types/post.ts)

export interface Post {
    // Properties from frontmatter
    id?: number | string; // Optional if using slug as primary ID
    title: string;
    slug: string; // สำคัญ: ควรตรงกับชื่อไฟล์ (ไม่รวม .md) หรือกำหนดใน frontmatter
    imageUrl: string;
    excerpt: string;
    author: string;
    publishedDate: string; // Format YYYY-MM-DD ใน frontmatter
    category: string;
    tags?: string[];
    metaTitle?: string;
    metaDescription?: string;
  
    // Added by processing
    contentHtml: string; // เนื้อหาที่แปลงเป็น HTML แล้ว
  }
  
  // ... other types ...