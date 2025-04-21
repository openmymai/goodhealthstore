// src/app/layout.tsx
import type { Metadata } from 'next';
import { Prompt, Noto_Sans_Thai } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SvgDefinitions from '@/components/SvgDefinitions';
import Providers from '@/app/providers';
import { CartProvider } from '@/context/CartContext';

import './globals.css';

// Configure Prompt for Headings (using CSS Variable)
const prompt = Prompt({
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-prompt',
  display: 'swap',
});

// Configure Noto Sans Thai for Body (applied via className)
const notoSansThai = Noto_Sans_Thai({
  subsets: ['latin', 'thai'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-thai',
  display: 'swap',
});

const GTM_ID = 'GTM-5QXWKCDG';
// 2. Metadata ภาษาไทยที่สละสลวย
export const metadata: Metadata = {
  title: 'GoodHealthStore | สุขภาพดี ครบครันเรื่องบทความและสินค้า',
  description:
    'เลือกสรรสินค้าเพื่อสุขภาพ พร้อมอ่านบทความดีๆ เพื่อการดูแลตัวเอง ครบจบในที่เดียว ที่ GoodHealthStore',
  // เพิ่ม Keywords หรือ Open Graph tags อื่นๆ ได้ตามต้องการ
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='th'>
      <head>
        <Script
          id='google-tag-manager-head'
          strategy='afterInteractive'
        >
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link
          rel='manifest'
          href='/favicon/site.webmanifest'
        />
        <link
          rel='mask-icon'
          href='/favicon/safari-pinned-tab.svg'
          color='#000000'
        />
        <link
          rel='shortcut icon'
          href='/favicon/favicon.ico'
        />
        <meta
          name='msapplication-TileColor'
          content='#000000'
        />
        <meta
          name='msapplication-config'
          content='/favicon/browserconfig.xml'
        />
        <meta
          name='theme-color'
          content='#000'
        />
        <link
          rel='alternate'
          type='application/rss+xml'
          href='/feed.xml'
        />
      </head>
      <body className={`${notoSansThai.className} ${prompt.variable}`}>
        {/* 3. Render SvgDefinitions component here */}
        <SvgDefinitions />
        <Providers>
          <CartProvider>
            {/* <div className='preloader-wrapper'>
              {' '}
              ... Preloader component ...{' '}
            </div> */}
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
