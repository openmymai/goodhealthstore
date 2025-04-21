// src/app/admin/posts/edit/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PostForm from '@/components/admin/PostForm';
import { Post } from '@prisma/client';

export default function EditPostPage() {
  const params = useParams();
  const id = params?.id;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== 'string') {
      setError('ID บทความไม่ถูกต้อง');
      setLoading(false);
      return;
    }

    const fetchPostData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/admin/posts/${id}`);
        if (!response.ok) {
          // Try to parse error, but don't require it
          let errorMsg = `HTTP error! status: ${response.status} ${
            response.statusText || ''
          }`;
          try {
            const errorData = await response.json();
            errorMsg = errorData.error || errorMsg;
          } catch {
            // Ignore if response body is not JSON
          }
          throw new Error(errorMsg.trim());
        }
        const data: Post = await response.json(); // Parse JSON only on success
        setPost(data);
      } catch (e: unknown) {
        console.error('Failed to fetch post data for editing:', e);
        const errorMessage = e instanceof Error ? e.message : String(e);
        setError(`ไม่สามารถโหลดข้อมูลบทความ: ${errorMessage}`);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  // ... (ส่วน JSX เหมือนเดิม)
  return (
    <div>
      <h1 className='font-heading text-2xl font-bold text-secondary mb-6'>
        แก้ไขบทความ (ID: {id})
      </h1>
      {loading && (
        <p className='text-center text-gray-500'>กำลังโหลดข้อมูล...</p>
      )}
      {error && (
        <p className='text-center text-red-600 bg-red-100 p-3 rounded-md'>
          {error}
        </p>
      )}
      {!loading && !error && post && (
        <PostForm post={post} /> // Render form in edit mode with fetched data
      )}
      {!loading && !error && !post && (
        <p className='text-center text-gray-500'>
          ไม่พบข้อมูลบทความที่ต้องการแก้ไข
        </p>
      )}
    </div>
  );
}
