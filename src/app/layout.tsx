import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'VRTAJ Metaplast — Premium Kitchen Products',
    template: '%s | VRTAJ Metaplast',
  },
  description:
    'Shop premium kitchen products at VRTAJ Metaplast. Factory-direct pricing, thoughtful design, and reliable delivery across India.',
  keywords: ['kitchen products', 'kitchenware', 'premium kitchen', 'VRTAJ', 'metaplast'],
  openGraph: {
    siteName: 'VRTAJ Metaplast',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
            },
          }}
        />
      </body>
    </html>
  );
}
