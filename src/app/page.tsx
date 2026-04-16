import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Shield, Tag, Sparkles, Truck, Users, Package, ThumbsUp } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import {
  getHomepageContent,
  getFeaturedProducts,
  getHomepageReviews,
} from '@/lib/api';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  tag: Tag,
  sparkles: Sparkles,
  truck: Truck,
};

export const revalidate = 60; // ISR: revalidate every 60s

export default async function HomePage() {
  const [content, featuredProducts, reviews] = await Promise.all([
    getHomepageContent().catch(() => null),
    getFeaturedProducts().catch(() => []),
    getHomepageReviews().catch(() => []),
  ]);

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-600 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Premium Kitchen Products
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
              {content?.heroTitle || 'Premium Kitchen Products & Kitchenware'}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl">
              {content?.heroSubtitle || 'Top-quality products crafted for style and durability.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white/10">
                {content?.heroCta || 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section className="bg-brand-600 text-white py-10">
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: content?.statCustomers || '500+', label: 'Happy Customers', Icon: Users },
              { value: content?.statProducts || '50+', label: 'Unique Products', Icon: Package },
              { value: content?.statSatisfaction || '99%', label: 'Satisfaction Rate', Icon: ThumbsUp },
            ].map(({ value, label, Icon }) => (
              <div key={label}>
                <Icon className="w-6 h-6 mx-auto mb-1 opacity-80" />
                <div className="font-display text-2xl md:text-3xl font-bold">{value}</div>
                <div className="text-brand-100 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">{content?.featuredTitle || 'OUR FEATURED PRODUCTS'}</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              {content?.featuredDescription}
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">Products coming soon.</p>
          )}

          <div className="text-center mt-10">
            <Link href="/products" className="btn-outline">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE ───────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose VRTAJ?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content?.whyChooseFeatures || []).map((feature, i) => {
              const Icon = iconMap[feature.icon] || Shield;
              return (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ──────────────────────────────────────────── */}
      {reviews.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">{content?.reviewsTitle || 'What Our Customers Say'}</h2>
              <p className="text-gray-500 mt-3">{content?.reviewsSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review._id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">"{review.comment}"</p>
                  <div className="font-semibold text-gray-900 text-sm">{review.customerName}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA BANNER ───────────────────────────────────────── */}
      <section className="bg-brand-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Upgrade Your Kitchen?
          </h2>
          <p className="text-brand-100 mb-8 max-w-md mx-auto">
            Explore our full range of premium kitchen products.
          </p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-8 py-3 rounded-lg hover:bg-brand-50 transition-colors">
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
