// src/app/signin/page.tsx
'use client'; // หน้า Login ต้องเป็น Client Component เพื่อใช้ State และ Event Handler

import React, { useState, FormEvent, Suspense } from 'react';
import { signIn } from 'next-auth/react'; // Import signIn function
import { useRouter, useSearchParams } from 'next/navigation'; // Import hooks

function SignInFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams(); // ใช้ Hook ใน Component ย่อยนี้
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  const error = searchParams.get('error');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(
    error ? getErrorMessage(error) : null
  );

  function getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'CredentialsSignin':
        return 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
      case 'AccessDenied':
        return 'คุณไม่มีสิทธิ์เข้าถึง';
      default:
        return 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง';
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username: username,
        password: password,
      });

      if (result?.error) {
        console.error('Sign in error:', result.error);
        setLoginError(getErrorMessage(result.error));
        setIsLoading(false);
      } else if (result?.ok) {
        console.log('Sign in successful, redirecting to:', callbackUrl);
        router.push(callbackUrl);
      } else {
        setLoginError('เกิดข้อผิดพลาดที่ไม่คาดคิด');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Sign in exception:', error);
      setLoginError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
      setIsLoading(false);
    }
  };

  return (
    <form
      className='mt-8 space-y-6 bg-white p-8 shadow-lg rounded-lg'
      onSubmit={handleSubmit}
    >
      {loginError && (
        <div
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
          role='alert'
        >
          <strong className='font-bold'>ผิดพลาด!</strong>
          <span className='block sm:inline'> {loginError}</span>
        </div>
      )}
      <input
        type='hidden'
        name='remember'
        defaultValue='true'
      />
      <div className='rounded-md shadow-sm -space-y-px'>
        <div>
          <label
            htmlFor='username-input'
            className='sr-only'
          >
            Username
          </label>
          <input
            id='username-input'
            name='username'
            type='text'
            autoComplete='username'
            required
            className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div>
          <label
            htmlFor='password-input'
            className='sr-only'
          >
            Password
          </label>
          <input
            id='password-input'
            name='password'
            type='password'
            autoComplete='current-password'
            required
            className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <button
          type='submit'
          className='group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50'
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className='animate-spin h-5 w-5 text-white'
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
          ) : (
            'เข้าสู่ระบบ'
          )}
        </button>
      </div>
    </form>
  );
}

export default function SignInPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          {/* Optional: Add Logo here */}
          <h2 className='mt-6 text-center text-3xl font-heading font-bold tracking-tight text-secondary'>
            เข้าสู่ระบบ Admin
          </h2>
        </div>
        <Suspense
          fallback={
            <div className='text-center p-8 bg-white rounded-lg shadow-lg text-gray-500'>
              กำลังโหลดฟอร์ม...
            </div>
          }
        >
          <SignInFormComponent />
        </Suspense>
        {/* Optional: Link to forgot password or other providers */}
      </div>
    </div>
  );
}
