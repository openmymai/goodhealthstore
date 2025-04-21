// src/app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation'; // <-- Remove this line
import { Post } from '@prisma/client';

type AdminPost = Pick<
  Post,
  'id' | 'title' | 'slug' | 'published' | 'createdAt' | 'updatedAt'
>;

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter(); // <-- Remove this line

  async function fetchPosts() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: AdminPost[] = await response.json();
      setPosts(data);
    } catch (e: unknown) {
      // <-- Change any to unknown
      console.error('Failed to fetch posts:', e);
      // Type guard for Error object
      const errorMessage = e instanceof Error ? e.message : String(e);
      setError(`ไม่สามารถโหลดข้อมูลได้: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบบทความ "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        // If response is not OK, just use the status text or a generic message
        const errorMsg = `HTTP error! status: ${response.status} ${
          response.statusText || ''
        }`;
        throw new Error(errorMsg.trim()); // Throw the error directly
      }
      // No need to parse JSON for successful DELETE (usually 204 No Content)

      setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id));
      alert('ลบบทความสำเร็จ');
    } catch (e: unknown) {
      console.error('Failed to delete post:', e);
      const errorMessage = e instanceof Error ? e.message : String(e);
      setError(`เกิดข้อผิดพลาดในการลบ: ${errorMessage}`);
      alert(`เกิดข้อผิดพลาดในการลบ: ${errorMessage}`);
    }
  };

  const formatDate = (dateString: Date | string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // ... (ส่วน JSX เหมือนเดิม)
  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='font-heading text-2xl font-bold text-secondary'>
          จัดการบทความ
        </h1>
        <Link
          href='/admin/posts/new'
          className='btn btn-primary bg-primary hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold'
        >
          + เพิ่มบทความใหม่
        </Link>
      </div>

      {loading && <p className='text-center text-gray-500'>กำลังโหลด...</p>}
      {error && (
        <p className='text-center text-red-600 bg-red-100 p-3 rounded-md'>
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className='bg-white shadow-md rounded-lg overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  ID
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  หัวข้อ
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  สถานะ
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  อัปเดตล่าสุด
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className='hover:bg-gray-50'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {post.id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                    {post.title}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    {post.published ? (
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                        เผยแพร่แล้ว
                      </span>
                    ) : (
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                        ฉบับร่าง
                      </span>
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {formatDate(post.updatedAt)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2'>
                    <Link
                      href={`/admin/posts/edit/${post.id}`}
                      className='text-indigo-600 hover:text-indigo-900'
                    >
                      แก้ไข
                    </Link>
                    <Link
                      href={`/blog/${post.slug}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:text-blue-900'
                    >
                      ดู
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className='text-red-600 hover:text-red-900'
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className='text-center py-4 text-gray-500'
                  >
                    ไม่พบข้อมูลบทความ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
