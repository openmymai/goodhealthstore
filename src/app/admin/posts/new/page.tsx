// src/app/admin/posts/new/page.tsx
import PostForm from '@/components/admin/PostForm';

export default function NewPostPage() {
  return (
    <div>
      <h1 className='font-heading text-2xl font-bold text-secondary mb-6'>
        สร้างบทความใหม่
      </h1>
      <PostForm /> {/* Render form in create mode */}
    </div>
  );
}
