import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Package, ChevronRight, MessageCircle, CheckCircle, Tag } from 'lucide-react';
import { getProductBySlug, getProductReviews, getImageUrl } from '@/lib/api';
import ReviewForm from './ReviewForm';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  try {
    const product = await getProductBySlug(params.slug);
    return {
      title: product.name,
      description: product.shortDescription || product.description.slice(0, 160),
    };
  } catch {
    return { title: 'Product Not Found' };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  let product;
  try {
    product = await getProductBySlug(params.slug);
  } catch {
    notFound();
  }

  const reviews = await getProductReviews(product._id).catch(() => []);
  const hasDiscount = product.discountPrice > 0 && product.discountPrice < product.price;
  const displayPrice = hasDiscount ? product.discountPrice : product.price;
  const discount = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;
  const specs = product.specifications ? Object.entries(product.specifications) : [];

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-brand-600 transition-colors font-medium">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <Link href="/products" className="hover:text-brand-600 transition-colors font-medium">Products</Link>
            {product.category?.name && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                <span className="text-gray-400">{product.category.name}</span>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-gray-700 font-semibold line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ─── IMAGES ─── */}
          <div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-card">
              {product.images[0] ? (
                <Image
                  src={getImageUrl(product.images[0])}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <Package className="w-24 h-24 text-gray-200" />
                </div>
              )}
              {hasDiscount && (
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
                    -{discount}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                      i === 0 ? 'border-brand-400' : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={getImageUrl(img)}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ─── PRODUCT INFO ─── */}
          <div className="flex flex-col">
            {product.category?.name && (
              <Link
                href={`/products?category=${product.category._id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 uppercase tracking-wider mb-3 hover:text-brand-700 transition-colors w-fit"
              >
                <Tag className="w-3.5 h-3.5" />
                {product.category.name}
              </Link>
            )}

            <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.reviewCount > 0 && (
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.averageRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {product.averageRating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-400">
                  ({product.reviewCount} {product.reviewCount === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5 pb-5 border-b border-gray-100">
              <span className="text-4xl font-bold text-gray-900 tracking-tight">
                ₹{displayPrice.toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-gray-400 line-through font-medium">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-2.5 py-1 rounded-full">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Short description */}
            {product.shortDescription && (
              <p className="text-gray-600 text-base leading-relaxed mb-5">
                {product.shortDescription}
              </p>
            )}

            {/* Stock status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-semibold px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" />
                  In Stock ({product.stock} available)
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-sm font-semibold px-3 py-1.5 rounded-full">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8 text-sm">
              {product.description}
            </p>

            {/* CTA */}
            <Link
              href={`/contact?product=${product.slug}`}
              className="btn-primary w-full justify-center text-base py-4"
            >
              <MessageCircle className="w-5 h-5" />
              Enquire About This Product
            </Link>

            {/* SKU */}
            <p className="text-xs text-gray-400 mt-4 text-center">
              SKU: <span className="font-mono font-medium">{product.sku}</span>
            </p>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { label: 'Factory Direct', sub: 'Best pricing' },
                { label: 'Quality Assured', sub: 'Tested products' },
                { label: 'Easy Returns', sub: 'Hassle-free' },
              ].map(({ label, sub }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs font-bold text-gray-800">{label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── SPECIFICATIONS ─── */}
        {specs.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
              Specifications
            </h2>
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-card">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map(([key, value], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-gray-50/70' : 'bg-white'}>
                      <td className="px-6 py-3.5 font-semibold text-gray-700 w-2/5">{key}</td>
                      <td className="px-6 py-3.5 text-gray-600">{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── REVIEWS ─── */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-gray-900">
              Customer Reviews
              {reviews.length > 0 && (
                <span className="ml-3 text-lg text-gray-400 font-normal">({reviews.length})</span>
              )}
            </h2>
          </div>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                  <div className="flex items-center gap-2.5 pt-3 border-t border-gray-200">
                    <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center">
                      <span className="text-brand-700 text-xs font-bold">
                        {review.customerName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {review.customerName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-8 text-center mb-10 border border-gray-100">
              <Star className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No reviews yet</p>
              <p className="text-gray-400 text-sm mt-1">Be the first to review this product!</p>
            </div>
          )}

          <ReviewForm productId={product._id} />
        </div>
      </div>
    </div>
  );
}
