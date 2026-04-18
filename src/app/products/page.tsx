import { Suspense } from 'react';
import ProductsClient from './ProductsClient';
import { ProductsGridSkeleton } from '@/components/Skeletons';
import { getCategories } from '@/lib/api';

export const metadata = {
  title: 'Products',
  description: 'Browse VRTAJ premium kitchen products — cookware, cutlery, storage and more.',
};

export default async function ProductsPage() {
  const categories = await getCategories().catch(() => []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-10">
          <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-2">
            Our Collection
          </p>
          <h1 className="section-title">Premium Kitchen Products</h1>
          <p className="text-gray-500 mt-2 text-base">
            Factory-direct kitchenware — quality you can see, price you will love.
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <Suspense
          fallback={
            <div className="flex gap-8">
              {/* Sidebar skeleton */}
              <div className="hidden lg:block w-64 shrink-0">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                  <div className="skeleton h-4 w-20 bg-gray-100" />
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="skeleton h-8 w-full bg-gray-100 rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>
              {/* Grid skeleton */}
              <div className="flex-1">
                <div className="skeleton h-10 w-full bg-gray-100 rounded-xl mb-6" />
                <ProductsGridSkeleton count={6} />
              </div>
            </div>
          }
        >
          <ProductsClient categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
