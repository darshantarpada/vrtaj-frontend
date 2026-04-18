export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card">
      {/* Image skeleton */}
      <div className="skeleton aspect-square bg-gray-100" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Category label */}
        <div className="skeleton h-3.5 w-20 rounded-full bg-gray-100" />
        {/* Product name — 2 lines */}
        <div className="space-y-1.5">
          <div className="skeleton h-4 w-full bg-gray-100" />
          <div className="skeleton h-4 w-3/4 bg-gray-100" />
        </div>
        {/* Rating */}
        <div className="skeleton h-3.5 w-24 rounded-full bg-gray-100" />
        {/* Price */}
        <div className="skeleton h-5 w-28 rounded-full bg-gray-100 mt-1" />
      </div>
    </div>
  );
}

export function ProductsGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="container-custom py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="skeleton aspect-square rounded-2xl bg-gray-100" />

        {/* Info */}
        <div className="space-y-5">
          <div className="skeleton h-4 w-28 rounded-full bg-gray-100" />
          <div className="skeleton h-9 w-3/4 bg-gray-100" />
          <div className="skeleton h-4 w-32 rounded-full bg-gray-100" />
          <div className="skeleton h-10 w-40 bg-gray-100" />
          <div className="space-y-2 pt-2">
            <div className="skeleton h-4 w-full bg-gray-100" />
            <div className="skeleton h-4 w-full bg-gray-100" />
            <div className="skeleton h-4 w-2/3 bg-gray-100" />
          </div>
          <div className="skeleton h-12 w-full rounded-xl bg-gray-100 mt-4" />
        </div>
      </div>
    </div>
  );
}

export function ReviewSkeleton() {
  return (
    <div className="bg-gray-50 rounded-xl p-5 space-y-3">
      <div className="skeleton h-4 w-24 bg-gray-200 rounded-full" />
      <div className="skeleton h-4 w-full bg-gray-200" />
      <div className="skeleton h-4 w-4/5 bg-gray-200" />
      <div className="skeleton h-3.5 w-28 bg-gray-200 rounded-full" />
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-3">
      <div className="skeleton h-8 w-64 bg-gray-100" />
      <div className="skeleton h-4 w-96 bg-gray-100" />
    </div>
  );
}
