// components/SessionProviderWrapper.tsx
'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // ไม่จำเป็นต้องส่ง session prop ถ้าใช้ strategy 'jwt'
  return <SessionProvider>{children}</SessionProvider>;
}