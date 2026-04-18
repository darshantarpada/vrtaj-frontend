import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Shield, Tag, Sparkles, Truck, Users, Package, ThumbsUp, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Skeletons';
import {
  getHomepageContent,
  getFeaturedProducts,
  getHomepageReviews,
} from '@/lib/api';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield:   Shield,
  tag:      Tag,
  sparkles: Sparkles,
  truck:    Truck,
};

export const revalidate = 60;

export default async function HomePage() {
  const [content, featuredProducts, reviews] = await Promise.all([
    getHomepageContent().catch(() => null),
    getFeaturedProducts().catch(() => []),
    getHomepageReviews().catch(() => []),
  ]);

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-brand-950 text-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-700/15 rounded-full blur-[80px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(227,115,9,0.08),transparent_60%)]" />
        </div>

        <div className="container-custom relative py-24 md:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-500/15 border border-brand-500/25 text-brand-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Premium Kitchen Products
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.08] mb-6 tracking-tightest">
              {content?.heroTitle || (
                <>Elevate Your<br /><span className="text-brand-400">Kitchen</span> Experience</>
              )}
            </h1>

            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl leading-relaxed font-light">
              {content?.heroSubtitle ||
                'Factory-direct premium kitchenware crafted for home chefs who demand quality, style, and durability.'}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary text-base px-8 py-3.5">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-base backdrop-blur-sm"
              >
                Our Story
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap gap-6 text-sm text-gray-400">
              {['Factory Direct', 'Free Consultation', 'India-wide Delivery'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-400 rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BANNER ─────────────────────────────────── */}
      <section className="bg-brand-600">
        <div className="container-custom py-10">
          <div className="grid grid-cols-3 gap-6 text-center text-white">
            {[
              { value: content?.statCustomers || '500+',  label: 'Happy Customers', Icon: Users },
              { value: content?.statProducts  || '50+',   label: 'Unique Products',  Icon: Package },
              { value: content?.statSatisfaction || '99%', label: 'Satisfaction Rate', Icon: ThumbsUp },
            ].map(({ value, label, Icon }) => (
              <div key={label} className="flex flex-col items-center">
                <Icon className="w-5 h-5 opacity-70 mb-2" />
                <div className="font-display text-3xl md:text-4xl font-bold leading-none">{value}</div>
                <div className="text-brand-100 text-xs md:text-sm mt-1.5 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-2">
                Handpicked Selection
              </p>
              <h2 className="section-title">
                {content?.featuredTitle || 'Featured Products'}
              </h2>
              {content?.featuredDescription && (
                <p className="text-gray-500 mt-3 max-w-lg leading-relaxed">
                  {content.featuredDescription}
                </p>
              )}
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors shrink-0"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}

          <div className="text-center mt-10 md:hidden">
            <Link href="/products" className="btn-outline">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-2">
              Our Promise
            </p>
            <h2 className="section-title">Why Choose VRTAJ?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content?.whyChooseFeatures ?? [
              { icon: 'shield',   title: 'Premium Quality',     description: 'Every product is crafted with the finest materials and rigorous quality standards.' },
              { icon: 'tag',      title: 'Factory Direct',      description: 'Buy directly from the manufacturer for the best prices with no middlemen.' },
              { icon: 'truck',    title: 'Fast Delivery',       description: 'Reliable and fast delivery to your doorstep anywhere in India.' },
              { icon: 'sparkles', title: 'Thoughtful Design',   description: 'Designed for both function and aesthetics to elevate your kitchen experience.' },
            ]).map((feature, i) => {
              const Icon = iconMap[feature.icon] || Shield;
              return (
                <div
                  key={i}
                  className="group p-7 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2.5">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ──────────────────────────────────────── */}
      {reviews.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-2">
                Customer Love
              </p>
              <h2 className="section-title">
                {content?.reviewsTitle || 'What Our Customers Say'}
              </h2>
              {content?.reviewsSubtitle && (
                <p className="text-gray-500 mt-3 max-w-md mx-auto">{content.reviewsSubtitle}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100"
                >
                  <div className="flex gap-1 mb-4">
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
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                      <span className="text-brand-700 text-sm font-bold">
                        {review.customerName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">{review.customerName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA BANNER ───────────────────────────────────── */}
      <section className="relative bg-brand-600 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-500/40 rounded-full blur-[60px]" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-700/40 rounded-full blur-[60px]" />
        </div>
        <div className="container-custom relative py-20 text-center text-white">
          <p className="text-xs font-semibold text-brand-200 uppercase tracking-widest mb-3">
            Ready to Get Started?
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Upgrade Your Kitchen Today
          </h2>
          <p className="text-brand-100 mb-10 max-w-md mx-auto leading-relaxed">
            Explore our full range of premium kitchen products. Factory-direct pricing, no compromise on quality.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-8 py-3.5 rounded-xl hover:bg-brand-50 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Browse Products <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
