import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const quickLinks = [
  { href: '/',         label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about',    label: 'About Us' },
  { href: '/contact',  label: 'Contact' },
];

const categories = [
  { label: 'Cookware',     href: '/products?category=cookware' },
  { label: 'Knives',       href: '/products?category=knives' },
  { label: 'Storage',      href: '/products?category=storage' },
  { label: 'Accessories',  href: '/products?category=accessories' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">

      {/* Main footer */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand column */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                <span className="text-white font-display font-bold">V</span>
              </div>
              <div className="leading-none">
                <span className="font-display font-bold text-white text-lg">VRTAJ</span>
                <span className="block text-[10px] text-gray-500 tracking-widest uppercase mt-0.5">Metaplast</span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs mb-6">
              Premium kitchen products crafted for style, durability, and everyday use.
              Factory-direct pricing with no compromise on quality.
            </p>

            <div className="space-y-3 text-sm">
              <a href="mailto:info@vrtajmetaplast.in" className="flex items-center gap-3 hover:text-brand-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-brand-600/20 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-brand-400" />
                </div>
                info@vrtajmetaplast.in
              </a>
              <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-3 hover:text-brand-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-brand-600/20 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-brand-400" />
                </div>
                +91 XXXXX XXXXX
              </a>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-brand-400" />
                </div>
                India
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm flex items-center gap-1.5 hover:text-brand-400 transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-4">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-5">
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm flex items-center gap-1.5 hover:text-brand-400 transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA card */}
            <div className="mt-8 bg-gray-900 rounded-2xl p-5 border border-gray-800">
              <p className="text-white font-semibold text-sm mb-1">Ready to order?</p>
              <p className="text-gray-500 text-xs mb-4">Get factory-direct pricing on bulk orders.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Get a Quote <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-900">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} VRTAJ Metaplast. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about"   className="hover:text-gray-400 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
