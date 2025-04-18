// app/register/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

   // --- Redirect if already logged in ---
   useEffect(() => {
    if (status === 'authenticated') {
      router.push('/'); // Redirect to home if already logged in
    }
  }, [status, router]);
  // ------------------------------------

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    // --- Client-side Validation ---
    if (password !== confirmPassword) {
      setError('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }
    if (password.length < 6) { // Example: Minimum password length
        setError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
        return;
    }
    // Add more validation if needed (e.g., email format)
    // -----------------------------

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', { // Call the API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json(); // Always try to parse JSON

      if (!response.ok) {
        // Handle errors from the API (e.g., email already exists)
        setError(data.message || 'การลงทะเบียนล้มเหลว');
      } else {
        // Registration successful
        setSuccess('ลงทะเบียนสำเร็จ! กรุณาเข้าสู่ระบบ');
        // Optional: Redirect to login page after a short delay
        setTimeout(() => {
          router.push('/login');
        }, 2000); // Redirect after 2 seconds
        // Clear form (optional)
        // setName(''); setEmail(''); setPassword(''); setConfirmPassword('');
      }
    } catch (err) {
      console.error('Registration exception:', err);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองอีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

   // Don't render the form if authentication status is loading or authenticated
   if (status === 'loading' || status === 'authenticated') {
    return <div className="flex justify-center items-center min-h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 md:p-10 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            สร้างบัญชีใหม่
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            หรือ{' '}
            <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
              เข้าสู่ระบบหากมีบัญชีอยู่แล้ว
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}
          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <p className="text-sm font-medium text-green-800">{success}</p>
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4"> {/* Added space-y-4 */}
             <div>
              <label htmlFor="name" className="sr-only">ชื่อ</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="ชื่อ"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">อีเมล</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="อีเมล"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">รหัสผ่าน</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
              />
            </div>
             <div>
              <label htmlFor="confirm-password" className="sr-only">ยืนยันรหัสผ่าน</label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="ยืนยันรหัสผ่าน"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                isLoading ? 'cursor-not-allowed opacity-70' : ''
              }`}
            >
              {isLoading ? 'กำลังลงทะเบียน...' : 'สร้างบัญชี'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}