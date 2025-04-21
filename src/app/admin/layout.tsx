// src/app/admin/layout.tsx
import Link from 'next/link';
import { getServerSession } from 'next-auth/next'; // Import getServerSession
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation'; // Import redirect

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // !!! Placeholder for Authentication Check !!!
  // In a real app, you would verify the user is authenticated and authorized here.
  // If not, redirect to login page.
  const session = await getServerSession(authOptions);

  // --- Authentication Check ---
  if (!session || !session.user) {
    // Redirect to NextAuth's default sign-in page if not logged in
    // Pass the current path as callbackUrl so user returns here after login
    const callbackUrl = encodeURIComponent('/admin'); // Or get current path dynamically if needed
    redirect(`/api/auth/signin?callbackUrl=${callbackUrl}`);
    // Or redirect to your custom signin page: redirect(`/signin?callbackUrl=${callbackUrl}`);
  }

  return (
    <div className='flex min-h-screen'>
      {/* Optional Sidebar */}
      <aside className='w-64 bg-secondary text-gray-200 p-5 hidden md:block'>
        {/* ... Sidebar content ... */}
        <h2 className='font-heading text-xl font-semibold mb-6 text-white'>
          Admin Panel
        </h2>
        <nav>
          <ul>
            <li className='mb-2'>
              <Link
                href='/admin'
                className='hover:text-white block py-1'
              >
                จัดการบทความ
              </Link>
            </li>
            <li className='mb-2'>
              <Link
                href='/admin/products'
                className='hover:text-white block py-1'
              >
                จัดการสินค้า
              </Link>
            </li>
            {/* Add a Sign Out link */}
            <li className='mb-2'>
              <Link
                href='/api/auth/signout'
                className='hover:text-white block py-1 text-sm border-t border-gray-700 mt-4 pt-2'
              >
                ออกจากระบบ
              </Link>
            </li>
            <li className='mb-2'>
              <Link
                href='/'
                className='hover:text-white block py-1 text-sm border-t border-gray-700 mt-1 pt-2'
              >
                กลับหน้าหลัก
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className='flex-1 p-6 md:p-10 bg-gray-50'>
        {/* ... Main content header/children ... */}
        <div className='md:hidden mb-4 flex justify-between items-center'>
          <h1 className='font-heading text-2xl font-bold text-secondary'>
            Admin
          </h1>
          <Link
            href='/api/auth/signout'
            className='text-sm text-red-600 hover:underline'
          >
            ออกจากระบบ
          </Link>
        </div>
        {children}
      </main>
    </div>
  );
}
