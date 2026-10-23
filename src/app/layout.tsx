import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import PwaRegister from '@/components/PwaRegister';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#070913',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: 'APSB Nexus | Independent Student Prep Platform for SDSUV BA Students',
  description: 'Independent Student Prep Platform for SDSUV BA Students. Chapter-wise PYQs, cinema lectures, 3-hour exam simulators, and career blueprints for Sri Dev Suman Uttarakhand University.',
  keywords: ['APSB Nexus', 'SDSUV', 'Sri Dev Suman University', 'BA Arts', 'PYQ Vault', 'NEP 2020', 'Exam Simulator', 'Student Prep Platform'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'APSB Nexus',
  },
  icons: {
    icon: [
      { url: '/images/apsb_logo.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  localStorage.setItem('apsb_theme', 'dark');
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                  var sb = localStorage.getItem('sdsuv_primary_sidebar_collapsed_v2');
                  var isCol = sb !== null ? sb === 'true' : (window.innerWidth < 1024);
                  document.documentElement.setAttribute('data-sidebar', isCol ? 'collapsed' : 'expanded');
                } catch(e) {}
              })();
            `,
          }}
        />
        <link rel="icon" type="image/svg+xml" href="/images/apsb_logo.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#070913] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black transition-colors duration-200`}
      >
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
