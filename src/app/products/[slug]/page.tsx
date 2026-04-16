import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Package, ChevronRight, ShoppingBag } from 'lucide-react';
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
  const specs = product.specifications ? Object.entries(product.specifications) : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container-custom py-4 border-b border-gray-100">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-brand-600">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
        </nav>
      </div>

      <div className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ─── IMAGES ─── */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
              {product.images[0] ? (
                <Image
                  src={getImageUrl(product.images[0])}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-24 h-24 text-gray-200" />
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 border-gray-100">
                    <Image src={getImageUrl(img)} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ─── PRODUCT INFO ─── */}
          <div>
            <p className="text-sm text-brand-600 font-medium mb-2">{product.category?.name}</p>
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

            {/* Rating */}
            {product.reviewCount > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(product.averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.averageRating.toFixed(1)} ({product.reviewCount} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ₹{displayPrice.toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-gray-400 line-through">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-0.5 rounded-full">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off
                  </span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="text-green-600 text-sm font-medium">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-500 text-sm font-medium">Out of Stock</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            {/* Contact CTA */}
            <Link href={`/contact?product=${product.slug}`} className="btn-primary w-full justify-center">
              <ShoppingBag className="w-5 h-5" />
              Enquire About This Product
            </Link>

            <p className="text-xs text-gray-400 mt-3 text-center">SKU: {product.sku}</p>
          </div>
        </div>

        {/* ─── SPECIFICATIONS ─── */}
        {specs.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="overflow-hidden rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map(([key, value], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-3 font-medium text-gray-700 w-1/3">{key}</td>
                      <td className="px-6 py-3 text-gray-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── REVIEWS ─── */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">
            Customer Reviews ({reviews.length})
          </h2>

          {reviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {reviews.map((review) => (
                <div key={review._id} className="bg-gray-50 rounded-xl p-5">
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-3">"{review.comment}"</p>
                  <p className="text-xs font-semibold text-gray-900">{review.customerName}</p>
                </div>
              ))}
            </div>
          )}

          <ReviewForm productId={product._id} />
        </div>
      </div>
    </div>
  );
}
