// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { Post } from '@/types/post'; // ปรับ path ถ้า type อยู่ที่อื่น

const postsDirectory = path.join(process.cwd(), '_posts');

// --- Helper Function: Markdown to HTML (Keep async) ---
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

// --- Helper Function: Category Name to Slug ---
export const categoryToSlug = (categoryName: string): string => {
    if (!categoryName) return 'uncategorized'; // Handle empty category
    return categoryName.toLowerCase().replace(/\s+/g, '-');
};

// --- Get Single Post Data (Keep async) ---
export async function getPostData(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const contentHtml = await markdownToHtml(content);

    // Basic validation
    if (!data.title || !data.imageUrl || !data.excerpt || !data.author || !data.publishedDate || !data.category) {
      console.warn(`Missing required frontmatter fields in ${realSlug}.md`);
      // Consider providing default values or throwing a more specific error
      // For now, we'll let it potentially fail later if needed, or provide defaults
    }

    return {
      slug: realSlug,
      title: data.title || 'Untitled Post', // Provide default
      imageUrl: data.imageUrl || '/images/placeholder.jpg', // Provide default
      excerpt: data.excerpt || '', // Provide default
      author: data.author || 'Unknown Author', // Provide default
      publishedDate: data.publishedDate || new Date().toISOString().split('T')[0], // Provide default
      category: data.category || 'Uncategorized', // Provide default
      tags: data.tags || [], // Provide default
      metaTitle: data.metaTitle, // Optional
      metaDescription: data.metaDescription, // Optional
      id: data.id, // Optional
      contentHtml,
    };
  } catch (error: any) { // Catch specific error types if needed
    console.error(`Error reading or processing post "${realSlug}":`, error.message);
    if (error.code === 'ENOENT') { // File not found error
        throw new Error(`Post not found for slug: ${slug}`);
    }
    throw new Error(`Could not get post data for slug: ${slug}. Reason: ${error.message}`);
  }
}

// --- Get All Posts Metadata (Synchronous) ---
// Reads only frontmatter for faster processing, suitable for lists/client-side filtering
export function getAllPostsMeta(): Omit<Post, 'contentHtml'>[] {
    let fileNames: string[] = [];
    try {
        fileNames = fs.readdirSync(postsDirectory);
    } catch (error) {
        console.error("Error reading post directory:", error);
        return [];
    }

    const allPostsData = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            try {
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const { data } = matter(fileContents); // Only parse frontmatter

                // Provide defaults for essential list view fields
                const postMeta = {
                    slug,
                    title: data.title || 'Untitled Post',
                    imageUrl: data.imageUrl || '/images/placeholder.jpg',
                    excerpt: data.excerpt || '',
                    author: data.author || 'Unknown Author',
                    publishedDate: data.publishedDate || new Date().toISOString().split('T')[0],
                    category: data.category || 'Uncategorized',
                    tags: data.tags || [],
                    metaTitle: data.metaTitle,
                    metaDescription: data.metaDescription,
                    id: data.id,
                };

                // Optional: Add stricter validation if needed for list view
                // if (!postMeta.title || !postMeta.publishedDate) {
                //    console.warn(`Skipping post "${slug}" in list view due to missing essential metadata.`);
                //    return null;
                // }

                return postMeta;

            } catch (readError: any) {
                console.error(`Error reading frontmatter for post "${slug}":`, readError.message);
                return null; // Skip on error
            }
        })
        .filter(post => post !== null) as Omit<Post, 'contentHtml'>[]; // Filter out nulls and assert type

    // Sort posts by date in descending order
    return allPostsData.sort((post1, post2) => {
        // Add error handling for invalid dates
        const date1 = new Date(post1.publishedDate).getTime();
        const date2 = new Date(post2.publishedDate).getTime();
        if (isNaN(date1) || isNaN(date2)) return 0; // Keep original order if dates are invalid
        return date2 - date1;
    });
}

// --- Get All Post Slugs (Keep sync) ---
export function getAllPostSlugs(): { slug: string }[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => ({
        slug: fileName.replace(/\.md$/, ''),
      }));
  } catch (error) {
    console.error('Error reading post directory:', error);
    return [];
  }
}

// --- Get All Posts Sorted (with HTML Content - Async) ---
// Used for server-side rendering where full content is needed (like Blog Index)
export async function getAllPostsSorted(): Promise<Post[]> {
  const slugs = getAllPostSlugs();
  // Fetch full data including HTML content for each
  // Use Promise.allSettled to handle potential errors in getPostData for individual posts
  const results = await Promise.allSettled(slugs.map(({ slug }) => getPostData(slug)));

  const allPostsData = results
      .filter(result => result.status === 'fulfilled') // Keep only successfully fetched posts
      .map(result => (result as PromiseFulfilledResult<Post>).value);

  if (results.some(result => result.status === 'rejected')) {
      console.warn("Some posts failed to load:", results.filter(r => r.status === 'rejected'));
  }

  // Sort posts by date in descending order
  return allPostsData.sort((post1, post2) => {
     const date1 = new Date(post1.publishedDate).getTime();
     const date2 = new Date(post2.publishedDate).getTime();
     if (isNaN(date1) || isNaN(date2)) return 0;
     return date2 - date1;
  });
}


const categoryDisplayNames: { [key: string]: string } = {
  'health-tips': 'Health Tips', // ใช้ชื่อภาษาอังกฤษใน value ถ้า frontmatter เป็นอังกฤษ
  'nutrition-diet': 'Nutrition & Diet',
  'fitness-exercise': 'Fitness & Exercise', // <--- ชื่อนี้น่าจะตรงกับใน frontmatter
  'mental-wellness': 'Mental Wellness',
  'diseases-prevention': 'Diseases & Prevention',
  'organic-living': 'Organic Living',
  'moms-kids-health': 'Moms & Kids Health',
  'beauty-skin': 'Beauty & Skin',
  // เพิ่มหมวดหมู่อื่นๆ ที่มีใน frontmatter ของคุณ
};

export const getPostsByCategory = (category: string): Omit<Post, 'contentHtml'>[] => {
  return getAllPostsMeta().filter(post => post.category.toLowerCase() === category.toLowerCase());
}


// --- Get Posts by Category SLUG (Uses Metadata) ---
// Filters based on the generated slug of the category
export const getPostsByCategorySlug = (slug: string): Omit<Post, 'contentHtml'>[] => {
  // หาชื่อ Category ดั้งเดิมที่ตรงกับ Slug นี้จาก Mapping
  const categoryName = categoryDisplayNames[slug];

  // ถ้าไม่เจอชื่อ Category ที่ตรงกับ Slug ใน Mapping ให้คืนค่า Array ว่าง
  if (!categoryName) {
      console.warn(`No category name found for slug: ${slug}`);
      return [];
  }

  // Filter โดยใช้ชื่อ Category ดั้งเดิมที่หาเจอ
  return getAllPostsMeta().filter(post =>
      // เปรียบเทียบชื่อ Category ใน frontmatter กับชื่อที่ได้จาก mapping (case-insensitive)
      post.category.trim().toLowerCase() === categoryName.trim().toLowerCase()
  );
}