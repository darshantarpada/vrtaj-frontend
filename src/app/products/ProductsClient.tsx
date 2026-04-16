'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProducts, Category, Product, PaginatedResponse } from '@/lib/api';

interface Props {
  categories: Category[];
}

export default function ProductsClient({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter state from URL
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';
  const page = parseInt(searchParams.get('page') || '1');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts({
        category: category || undefined,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        search: search || undefined,
        sortBy,
        sortOrder,
        page,
        limit: 12,
      });
      setProducts(data);
    } catch {
      setProducts({ data: [], meta: { total: 0, page: 1, limit: 12, totalPages: 0 } });
    } finally {
      setLoading(false);
    }
  }, [category, minPrice, maxPrice, search, sortBy, sortOrder, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page'); // reset page on filter change
    router.push(`/products?${params.toString()}`);
  }

  function clearFilters() {
    router.push('/products');
  }

  const hasActiveFilters = category || minPrice || maxPrice || search;

  return (
    <div className="flex gap-8">
      {/* ─── SIDEBAR FILTERS ─── */}
      <aside
        className={`${
          showFilters ? 'block' : 'hidden'
        } lg:block w-64 shrink-0`}
      >
        <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Clear all
              </button>
            )}
          </div>

          {/* Category */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => updateParam('category', '')}
                  className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    !category ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All Categories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat._id}>
                  <button
                    onClick={() => updateParam('category', cat._id)}
                    className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                      category === cat._id
                        ? 'bg-brand-50 text-brand-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range (₹)</h3>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => updateParam('minPrice', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => updateParam('maxPrice', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Sort By</h3>
            <select
              value={`${sortBy}_${sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split('_');
                const params = new URLSearchParams(searchParams.toString());
                params.set('sortBy', by);
                params.set('sortOrder', order);
                router.push(`/products?${params.toString()}`);
              }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
            >
              <option value="createdAt_desc">Newest First</option>
              <option value="createdAt_asc">Oldest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="averageRating_desc">Top Rated</option>
            </select>
          </div>
        </div>
      </aside>

      {/* ─── PRODUCTS GRID ─── */}
      <div className="flex-1 min-w-0">
        {/* Search + mobile filter toggle */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => updateParam('search', e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : products?.data.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">No products found</p>
            <button onClick={clearFilters} className="mt-4 text-brand-600 text-sm hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              {products?.meta.total} product{products?.meta.total !== 1 ? 's' : ''} found
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {products?.data.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {products && products.meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  disabled={page <= 1}
                  onClick={() => updateParam('page', String(page - 1))}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600 px-3">
                  Page {page} of {products.meta.totalPages}
                </span>
                <button
                  disabled={page >= products.meta.totalPages}
                  onClick={() => updateParam('page', String(page + 1))}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Need to import Package in this file too
import { Package } from 'lucide-react';
