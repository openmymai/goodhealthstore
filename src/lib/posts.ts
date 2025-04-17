// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // สำหรับอ่าน frontmatter
import { remark } from 'remark'; // สำหรับแปลง markdown
import html from 'remark-html'; // plugin แปลงเป็น html
import type { Post } from '@/types/post'; // ปรับ path

// หา path ไปยังโฟลเดอร์ _posts
const postsDirectory = path.join(process.cwd(), '_posts'); // process.cwd() คือ root ของ project

// --- Function to get processed HTML from markdown content ---
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

// --- Function to get data for a single post ---
export async function getPostData(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.md$/, ''); // เอา .md ออกจากชื่อไฟล์ (ถ้ามี)
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // ใช้ gray-matter แยก frontmatter (data) และ content
    const { data, content } = matter(fileContents);

    // แปลง markdown content เป็น HTML
    const contentHtml = await markdownToHtml(content);

    // ตรวจสอบ properties ที่จำเป็นจาก frontmatter
    if (
      !data.title ||
      !data.imageUrl ||
      !data.excerpt ||
      !data.author ||
      !data.publishedDate ||
      !data.category
    ) {
      throw new Error(`Missing required frontmatter fields in ${realSlug}.md`);
    }

    // รวม data จาก frontmatter และ contentHtml
    return {
      slug: realSlug, // ใช้ชื่อไฟล์เป็น slug (หรืออ่านจาก frontmatter ถ้าต้องการ)
      ...(data as {
        // Cast data ให้มี type ที่คาดหวัง
        title: string;
        imageUrl: string;
        excerpt: string;
        author: string;
        publishedDate: string;
        category: string;
        tags?: string[];
        metaTitle?: string;
        metaDescription?: string;
        id?: number | string; // id เป็น optional
      }),
      contentHtml, // เพิ่ม content ที่แปลงแล้ว
    };
  } catch (error) {
    console.error(`Error reading or processing post "${realSlug}":`, error);
    // ในกรณีที่หาไฟล์ไม่เจอ หรือมีปัญหา ควรจะ throw error หรือ return ค่าที่บ่งบอกว่าไม่เจอ
    // ซึ่งจะถูกจัดการโดย notFound() ใน page component
    throw new Error(`Could not get post data for slug: ${slug}`);
  }
}

// --- Function to get all post slugs (for generateStaticParams) ---
export function getAllPostSlugs(): { slug: string }[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.md')) // เอาเฉพาะไฟล์ .md
      .map((fileName) => ({
        slug: fileName.replace(/\.md$/, ''), // เอา .md ออก
      }));
  } catch (error) {
    console.error('Error reading post directory:', error);
    return []; // Return empty array on error
  }
}

// --- Function to get all posts sorted by date ---
export async function getAllPostsSorted(): Promise<Post[]> {
  const slugs = getAllPostSlugs();
  const allPostsData = await Promise.all(
    slugs.map(({ slug }) => getPostData(slug))
  );

  // Sort posts by date in descending order (newest first)
  return allPostsData.sort((post1, post2) => {
    return (
      new Date(post2.publishedDate).getTime() -
      new Date(post1.publishedDate).getTime()
    );
  });
}
