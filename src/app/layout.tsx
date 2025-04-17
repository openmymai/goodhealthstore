import SvgDefinitions from '@/app/_components/SvgDefinitions';
import ClientLayout from '@/app/_components/ClientLayout';
import Header from '@/app/_components/header';
import Footer from '@/app/_components/footer';
import Script from 'next/script';
import type { Metadata } from 'next';
import { Noto_Sans_Thai, Prompt } from 'next/font/google';
import { StoreProvider } from './context/StoreContext';

import './globals.css';

// Configure Noto (สำหรับ body)
const noto = Noto_Sans_Thai({
  subsets: ['thai', 'latin'], // Include subsets needed
  weight: ['400', '700'], // Include weights needed (400=regular, 700=bold)
  variable: '--font-noto-thai', // Define CSS Variable name
  display: 'swap', // Font display strategy
});

// Configure Prompt (สำหรับ heading)
const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['400', '700'], // Include weights needed
  variable: '--font-prompt', // Define CSS Variable name
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'บทความสุขภาพ อาหารออร์แกนิก เคล็ดลับดีๆ | Good Health Store Blog',
  description:
    'อ่านบทความล่าสุดเกี่ยวกับสุขภาพ โภชนาการ การออกกำลังกาย ไลฟ์สไตล์ออร์แกนิก และเคล็ดลับดูแลตัวเองง่ายๆ จาก Good Health Store',
};

const GTM_ID = 'GTM-5QXWKCDG';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${noto.variable} ${prompt.variable}`}
    >
      <head>
        <Script id="google-tag-manager-head" strategy="afterInteractive">
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
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <SvgDefinitions />
        <StoreProvider>
          <ClientLayout>
            <Header />
            <main>
              <div className='min-h-screen'>{children}</div>
            </main>
            <Footer />
          </ClientLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
