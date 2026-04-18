import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Sparkles,
  Truck,
  Users,
  Award,
  Factory,
  Heart,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about VRTAJ Metaplast — our story, mission, and commitment to premium kitchen products made in India.',
};

const values = [
  {
    Icon: Shield,
    title: 'Uncompromising Quality',
    description:
      'Every product that leaves our factory goes through rigorous quality checks. We use only premium-grade materials to ensure lasting durability.',
  },
  {
    Icon: Factory,
    title: 'Made in India',
    description:
      'Proudly manufactured in India, our products support local craftsmanship while meeting international quality standards.',
  },
  {
    Icon: Heart,
    title: 'Customer First',
    description:
      'We design every product with real kitchens and real people in mind. Your satisfaction drives everything we create.',
  },
  {
    Icon: Sparkles,
    title: 'Thoughtful Design',
    description:
      'Form meets function in every piece. Beautiful in your kitchen, brilliant in use — that is our design philosophy.',
  },
];

const milestones = [
  { year: '2010', label: 'Founded', description: 'VRTAJ Metaplast was established with a vision to bring premium kitchenware to Indian homes.' },
  { year: '2015', label: 'Expanded', description: 'Expanded our product line to over 50 unique kitchen products across multiple categories.' },
  { year: '2020', label: 'Online Launch', description: 'Launched our online store to reach customers across India with factory-direct pricing.' },
  { year: '2024', label: 'Today',  description: 'Serving 500+ happy customers nationwide with a commitment to quality and innovation.' },
];

const stats = [
  { value: '500+',  label: 'Happy Customers', Icon: Users },
  { value: '50+',   label: 'Products',         Icon: Sparkles },
  { value: '99%',   label: 'Satisfaction',     Icon: Award },
  { value: '15+',   label: 'Years Experience', Icon: Factory },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-700/15 rounded-full blur-[80px]" />
        </div>
        <div className="container-custom relative py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-500/15 border border-brand-500/25 text-brand-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
            Our Story
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-3xl mx-auto tracking-tight">
            Crafting Premium Kitchen Experiences
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            At VRTAJ Metaplast, we believe that great cooking starts with great tools.
            For over a decade, we have been bringing premium, factory-direct kitchenware
            to homes across India.
          </p>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────── */}
      <section className="bg-brand-600">
        <div className="container-custom py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {stats.map(({ value, label, Icon }) => (
              <div key={label} className="flex flex-col items-center">
                <Icon className="w-5 h-5 opacity-70 mb-2" />
                <div className="font-display text-3xl md:text-4xl font-bold">{value}</div>
                <div className="text-brand-100 text-xs md:text-sm mt-1.5 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STORY ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div>
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">
                Who We Are
              </p>
              <h2 className="section-title mb-6">
                From Our Factory<br />to Your Kitchen
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  VRTAJ Metaplast was born from a simple belief: every Indian kitchen deserves
                  tools that are both beautiful and built to last. Founded in 2010, we started
                  as a small manufacturing unit with a big ambition — to redefine kitchen
                  products for the modern Indian home.
                </p>
                <p>
                  Today, we manufacture and sell over 50 premium kitchen products, from
                  cookware and cutlery to storage solutions and accessories. Each product is
                  designed in-house, manufactured with precision, and delivered directly to
                  you — cutting out the middlemen so you get the best quality at the best price.
                </p>
                <p>
                  We are more than a kitchenware brand — we are a team of passionate designers,
                  engineers, and kitchen enthusiasts dedicated to making your cooking experience
                  more enjoyable, efficient, and beautiful.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/products" className="btn-primary">
                  Shop Our Products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="btn-outline">
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Products Made', value: '50+', color: 'bg-brand-50 text-brand-700' },
                    { label: 'Years Active',  value: '15+', color: 'bg-gray-900 text-white' },
                    { label: 'Cities Served', value: '100+', color: 'bg-amber-50 text-amber-700' },
                    { label: 'Customer Rating', value: '4.9★', color: 'bg-green-50 text-green-700' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className={`${color} rounded-2xl p-5`}>
                      <div className="font-display text-3xl font-bold leading-none mb-1">{value}</div>
                      <div className="text-xs font-semibold opacity-70 uppercase tracking-wider">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-5 bg-white rounded-2xl border border-gray-100">
                  <p className="text-sm text-gray-600 italic leading-relaxed">
                    &ldquo;We pour our heart into every product we make. When you cook with a VRTAJ
                    product, you feel the difference that genuine craftsmanship makes.&rdquo;
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                      <span className="text-brand-700 font-bold text-sm">V</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">VRTAJ Metaplast</p>
                      <p className="text-xs text-gray-400">Founder&apos;s Note</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">
              What Drives Us
            </p>
            <h2 className="section-title">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-brand-200 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                  <Icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">
              Our Journey
            </p>
            <h2 className="section-title">Milestones</h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-[52px] top-0 bottom-0 w-px bg-gray-200 hidden md:block" />

            <div className="space-y-8">
              {milestones.map(({ year, label, description }, i) => (
                <div key={year} className="flex gap-6 items-start">
                  <div className="shrink-0 flex flex-col items-center">
                    <div className={`w-[52px] h-[52px] md:w-[52px] md:h-[52px] rounded-2xl flex items-center justify-center font-display font-bold text-sm z-10 relative ${
                      i === milestones.length - 1
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-200'
                        : 'bg-white border-2 border-gray-200 text-gray-700'
                    }`}>
                      {year}
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                      <span className="font-bold text-gray-900">{label}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMMITMENT ───────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 md:p-14 border border-gray-100 shadow-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">
                  Our Commitment
                </p>
                <h2 className="section-title mb-5">Quality You Can Trust</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We stand behind every product we sell. If you are not completely satisfied,
                  we will make it right. That is the VRTAJ promise — built on integrity,
                  delivered with care.
                </p>
                <ul className="space-y-3">
                  {[
                    'ISI-certified manufacturing processes',
                    'Food-grade, BPA-free materials',
                    'Rigorous quality testing before dispatch',
                    'Transparent factory-direct pricing',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { Icon: Shield,  title: 'Quality Assured',   desc: 'Every product is tested before it reaches you.' },
                  { Icon: Truck,   title: 'Pan-India Delivery', desc: 'Fast, reliable shipping across all states.' },
                  { Icon: Award,   title: 'Industry Certified',  desc: 'Manufactured to national quality standards.' },
                ].map(({ Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="relative bg-brand-600 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-500/40 rounded-full blur-[60px]" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-700/40 rounded-full blur-[60px]" />
        </div>
        <div className="container-custom relative py-20 text-center text-white">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-5">
            Experience the VRTAJ Difference
          </h2>
          <p className="text-brand-100 mb-10 max-w-md mx-auto leading-relaxed">
            Browse our collection and discover why thousands of Indian families trust VRTAJ
            for their kitchen essentials.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-8 py-3.5 rounded-xl hover:bg-brand-50 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
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
    </div>
  );
}
