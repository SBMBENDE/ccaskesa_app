import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'CCASKESA Alumni',
    template: '%s | CCASKESA',
  },
  description:
    'CCASKESA 1994–1996 Batch – Empowering the next generation through education. Supporting students with scholarships, computer donations, and community development across the globe.',
  keywords: ['CCASKESA', 'alumni', 'education', 'scholarships', 'Cameroon', 'diaspora'],
  authors: [{ name: 'CCASKESA Alumni' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'CCASKESA Alumni',
    title: 'CCASKESA Alumni',
    description: 'Empowering the next generation through education.',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CCASKESA',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#5272F2' },
    { media: '(prefers-color-scheme: dark)', color: '#01204E' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1e3a8a',
                  color: '#fff',
                  border: '1px solid #38bdf8',
                  borderRadius: '8px',
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
