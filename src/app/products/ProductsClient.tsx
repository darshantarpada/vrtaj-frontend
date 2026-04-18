'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, ChevronLeft, ChevronRight, Search, Package } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Skeletons';
import { getProducts, Category, Product, PaginatedResponse } from '@/lib/api';

interface Props {
  categories: Category[];
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function ProductsClient({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search: local state only — NOT in URL
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 400);

  // Other filters: synced with URL for shareability
  const category  = searchParams.get('category')  || '';
  const minPrice  = searchParams.get('minPrice')   || '';
  const maxPrice  = searchParams.get('maxPrice')   || '';
  const sortBy    = searchParams.get('sortBy')     || 'createdAt';
  const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';
  const page      = parseInt(searchParams.get('page') || '1');

  const [products, setProducts] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading]   = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const isFirstRender = useRef(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts({
        category:   category || undefined,
        minPrice:   minPrice ? parseFloat(minPrice) : undefined,
        maxPrice:   maxPrice ? parseFloat(maxPrice) : undefined,
        search:     debouncedSearch || undefined,
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
  }, [category, minPrice, maxPrice, debouncedSearch, sortBy, sortOrder, page]);

  // Reset page to 1 when search changes (debounced)
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    router.replace(`/products?${params.toString()}`, { scroll: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    router.push(`/products?${params.toString()}`, { scroll: false });
  }

  function clearFilters() {
    setSearchInput('');
    router.push('/products', { scroll: false });
  }

  const hasActiveFilters = category || minPrice || maxPrice || debouncedSearch;

  return (
    <div className="flex gap-8">

      {/* ─── SIDEBAR FILTERS ─────────────────────────────── */}
      <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-64 shrink-0`}>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 sticky top-24">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
              >
                <X className="w-3 h-3" /> Clear all
              </button>
            )}
          </div>

          {/* Category */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Category
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => updateParam('category', '')}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${
                    !category
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  All Categories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat._id}>
                  <button
                    onClick={() => updateParam('category', cat._id)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${
                      category === cat._id
                        ? 'bg-brand-50 text-brand-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Price Range (₹)
            </h3>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => updateParam('minPrice', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => updateParam('maxPrice', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Sort By
            </h3>
            <select
              value={`${sortBy}_${sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split('_');
                const params = new URLSearchParams(searchParams.toString());
                params.set('sortBy', by);
                params.set('sortOrder', order);
                router.push(`/products?${params.toString()}`, { scroll: false });
              }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400 transition-all bg-white"
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

      {/* ─── PRODUCTS GRID ───────────────────────────────── */}
      <div className="flex-1 min-w-0">

        {/* Search bar + mobile filter toggle */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all bg-white"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`lg:hidden flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-all ${
              showFilters
                ? 'border-brand-400 text-brand-600 bg-brand-50'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-brand-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Result count */}
        {!loading && products && (
          <p className="text-sm text-gray-500 mb-4 font-medium">
            {products.meta.total}{' '}
            {products.meta.total === 1 ? 'product' : 'products'} found
            {debouncedSearch && (
              <span className="text-gray-400">
                {' '}for &ldquo;<span className="text-brand-600">{debouncedSearch}</span>&rdquo;
              </span>
            )}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products?.data.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <Package className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-gray-700 font-semibold text-lg">No products found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search query.</p>
            <button
              onClick={clearFilters}
              className="mt-5 text-brand-600 text-sm font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {products?.data.map((product, i) => (
                <div
                  key={product._id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 40}ms`, opacity: 0 }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {products && products.meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  disabled={page <= 1}
                  onClick={() => updateParam('page', String(page - 1))}
                  className="p-2.5 rounded-xl border border-gray-200 disabled:opacity-40 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: products.meta.totalPages }, (_, i) => i + 1)
                    .filter((p) => Math.abs(p - page) <= 2)
                    .map((p) => (
                      <button
                        key={p}
                        onClick={() => updateParam('page', String(p))}
                        className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                          p === page
                            ? 'bg-brand-600 text-white shadow-sm'
                            : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                </div>

                <button
                  disabled={page >= products.meta.totalPages}
                  onClick={() => updateParam('page', String(page + 1))}
                  className="p-2.5 rounded-xl border border-gray-200 disabled:opacity-40 hover:bg-gray-50 hover:border-gray-300 transition-all"
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
