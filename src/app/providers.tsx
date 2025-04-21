// src/app/providers.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // ไม่จำเป็นต้องส่ง session prop ถ้าใช้ JWT strategy
  return <SessionProvider>{children}</SessionProvider>;
}
