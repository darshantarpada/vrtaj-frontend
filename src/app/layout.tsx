import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'VRTAJ - Premium Kitchen Products & Kitchenware',
    template: '%s | VRTAJ',
  },
  description:
    'Shop premium kitchen products at VRTAJ. Factory-direct pricing, thoughtful design, and reliable delivery.',
  keywords: ['kitchen products', 'kitchenware', 'premium kitchen', 'VRTAJ'],
  openGraph: {
    siteName: 'VRTAJ Metaplast',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
