// app/login/page.tsx
'use client';

// Import Suspense from React
import React, { useState, useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// --- Component ที่ใช้ Hooks อ่าน URL ---
// สร้าง Component ใหม่เพื่อห่อ Logic ที่ใช้ useSearchParams
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook นี้ต้องอยู่ใน Suspense boundary
  const { data: session, status } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in (Logic นี้ก็ควรอยู่ใน Component ที่ใช้ searchParams)
  useEffect(() => {
    if (status === 'authenticated') {
      const callbackUrl = searchParams ? searchParams.get('callbackUrl') || '/' : '/'; // Get callbackUrl safely
      console.log("Already authenticated, redirecting to:", callbackUrl); // Debug log
      router.push(callbackUrl);
    }
  }, [status, router, searchParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      });

      setIsLoading(false);

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        } else {
           // Log the actual error for debugging, but show a generic message
           console.error('Sign in error details:', result.error);
           setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
        }
      } else if (result?.ok) {
        console.log('Sign in successful');
        const callbackUrl = searchParams ? searchParams.get('callbackUrl') || '/' : '/'; // Get callbackUrl safely
        router.push(callbackUrl);
        // Consider router.refresh() if session state update is slow
      } else {
          setError('ไม่สามารถเข้าสู่ระบบได้ กรุณาลองอีกครั้ง');
      }
    } catch (err) {
      setIsLoading(false);
      setError('เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองอีกครั้ง');
      console.error('Sign in exception:', err);
    }
  };

  // Don't render the form if authentication status is loading or authenticated
  // This check might run before the redirect effect, showing "Loading..." briefly
  if (status === 'loading' || status === 'authenticated') {
    return <div className="flex justify-center items-center min-h-screen"><p>Loading session...</p></div>;
  }

  // --- Return JSX for the form ---
  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 md:p-10 rounded-lg shadow-md">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          เข้าสู่ระบบ Good Health Store
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          หรือ{' '}
          <Link href="/register" className="font-medium text-primary hover:text-primary-dark">
            สร้างบัญชีใหม่
          </Link>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">อีเมล</label>
            <input
              id="email-address" name="email" type="email" autoComplete="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              placeholder="อีเมล"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">รหัสผ่าน</label>
            <input
              id="password" name="password" type="password" autoComplete="current-password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              placeholder="รหัสผ่าน"
            />
          </div>
        </div>
        <div>
          <button type="submit" disabled={isLoading}
            className={`group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
          >
            {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </div>
      </form>
    </div>
  );
}


// --- Main Page Component ---
export default function LoginPage() {
  return (
    // Wrap the component that uses useSearchParams in Suspense
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
      <Suspense fallback={<LoadingFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

// --- Fallback Component ---
// Shown while LoginForm is waiting for client-side rendering/data
function LoadingFallback() {
    return (
        <div className="w-full max-w-md space-y-8 bg-white p-8 md:p-10 rounded-lg shadow-md animate-pulse">
             <div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
             <div className="mt-8 space-y-6">
                 <div className="rounded-md shadow-sm space-y-px">
                     <div className="h-10 bg-gray-200 rounded-t-md"></div>
                     <div className="h-10 bg-gray-200 rounded-b-md"></div>
                 </div>
                 <div className="h-10 bg-gray-300 rounded-md"></div>
             </div>
        </div>
    );
}