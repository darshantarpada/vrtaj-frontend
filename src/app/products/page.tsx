import { Suspense } from 'react';
import ProductsClient from './ProductsClient';
import { getCategories } from '@/lib/api';

export const metadata = {
  title: 'Products',
  description: 'Browse VRTAJ premium kitchen products.',
};

export default async function ProductsPage() {
  const categories = await getCategories().catch(() => []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-8">
          <h1 className="section-title">Our Products</h1>
          <p className="text-gray-500 mt-2">Premium kitchen products for every need.</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading products...</div>}>
          <ProductsClient categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
