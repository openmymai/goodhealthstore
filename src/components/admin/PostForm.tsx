// src/components/admin/PostForm.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@prisma/client';
import Image from 'next/image';

interface PostFormProps {
  post?: Post | null;
}

export default function PostForm({ post }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isEditing = !!post;

  useEffect(() => {
    if (isEditing && post) {
      setTitle(post.title);
      setContent(post.content);
      setExcerpt(post.excerpt || '');
      setImageUrl(post.imageUrl || '');
      setIsPublished(post.published);
    } else if (!isEditing) {
      setTitle('');
      setContent('');
      setExcerpt('');
      setImageUrl('');
      setIsPublished(false);
    }
  }, [isEditing, post]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const postData = {
      title,
      content,
      excerpt,
      imageUrl: imageUrl || null,
      published: isPublished,
    };

    const url = isEditing ? `/api/admin/posts/${post?.id}` : '/api/admin/posts';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        // Try to parse error, but don't require it
        let errorMsg = `HTTP error! status: ${response.status} ${
          response.statusText || ''
        }`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {
          // <-- Changed jsonError to _innerJsonError or remove try-catch
          // Ignore
        }
        throw new Error(errorMsg);
      }

      alert(`บันทึกบทความ${isEditing ? 'แก้ไข' : 'ใหม่'}สำเร็จ!`);
      router.push('/admin');
      router.refresh();
    } catch (e: unknown) {
      // <-- Change any to unknown
      console.error('Failed to save post:', e);
      const errorMessage = e instanceof Error ? e.message : String(e);
      setError(`เกิดข้อผิดพลาด: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  // ... (ส่วน JSX เหมือนเดิม)
  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6 bg-white p-8 rounded-lg shadow-md'
    >
      {error && (
        <p className='text-red-600 bg-red-100 p-3 rounded-md mb-4'>{error}</p>
      )}

      {/* Title Input */}
      <div>
        <label
          htmlFor='title'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          หัวข้อบทความ <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          disabled={isLoading}
        />
      </div>

      {/* Content Textarea */}
      <div>
        <label
          htmlFor='content'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          เนื้อหา <span className='text-red-500'>*</span> (รองรับ HTML)
        </label>
        <textarea
          id='content'
          rows={15}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono'
          disabled={isLoading}
          placeholder='ใส่เนื้อหาบทความที่นี่ (สามารถใช้ HTML tags ได้)'
        />
        <p className='mt-1 text-xs text-gray-500'>
          {
            'คำแนะนำ: ใช้ `<p>`, `<h2>`, `<h3>`, `<ul>`, `<ol>`, `<li>`, `<a>`, `<img>`, `<em>`, `<strong>`, `<blockquote>` สำหรับจัดรูปแบบ.'
          }
        </p>
      </div>

      {/* Excerpt Textarea */}
      <div>
        <label
          htmlFor='excerpt'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          คำอธิบายย่อ (Excerpt)
        </label>
        <textarea
          id='excerpt'
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          disabled={isLoading}
          placeholder='สรุปสั้นๆ เกี่ยวกับบทความ (ไม่เกิน 150-160 ตัวอักษร)'
          maxLength={160}
        />
        <p className='mt-1 text-xs text-gray-500'>
          หากเว้นว่าง ระบบจะสร้างให้อัตโนมัติจากเนื้อหา
        </p>
      </div>

      {/* Image URL Input */}
      <div>
        <label
          htmlFor='imageUrl'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          URL รูปภาพหลัก (Image URL)
        </label>
        <input
          type='url'
          id='imageUrl'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          disabled={isLoading}
          placeholder='เช่น /images/my-post-image.jpg'
        />
        <p className='mt-1 text-xs text-gray-500'>
          ใส่ path รูปภาพที่อยู่ในโฟลเดอร์ `public` หรือ URL เต็มจากแหล่งอื่น
        </p>
        {imageUrl && (
          <div className='mt-2'>
            <p className='text-xs text-gray-500 mb-1'>ตัวอย่างรูปภาพ:</p>
            <Image
              src={imageUrl}
              alt='Preview'
              className='max-h-40 rounded border border-gray-200'
            />
          </div>
        )}
      </div>

      {/* Published Checkbox */}
      <div className='flex items-center'>
        <input
          id='published'
          name='published'
          type='checkbox'
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
          disabled={isLoading}
        />
        <label
          htmlFor='published'
          className='ml-2 block text-sm text-gray-900'
        >
          เผยแพร่บทความนี้
        </label>
      </div>

      {/* Action Buttons */}
      <div className='flex justify-end space-x-3 border-t pt-5 mt-6'>
        <button
          type='button'
          onClick={() => router.back()}
          className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md text-sm disabled:opacity-50'
          disabled={isLoading}
        >
          ยกเลิก
        </button>
        <button
          type='submit'
          className='bg-primary hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md text-sm disabled:opacity-50 flex items-center'
          disabled={isLoading}
        >
          {isLoading && (
            <svg
              className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          )}
          {isLoading
            ? isEditing
              ? 'กำลังอัปเดต...'
              : 'กำลังสร้าง...'
            : isEditing
            ? 'บันทึกการแก้ไข'
            : 'สร้างบทความ'}
        </button>
      </div>
    </form>
  );
}
