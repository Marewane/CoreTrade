import React from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import {
  Headphones,
  Keyboard,
  Laptop,
  Activity,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  BadgePercent,
} from "lucide-react";

export default function Home() {
  // Get 3 featured/trending items
  const trendingProducts = products.filter((p) => p.trending).slice(0, 3);

  const categories = [
    { name: "Audio", count: "3 Items", icon: Headphones, path: "/products?category=Audio", color: "from-blue-500/10 to-indigo-500/10" },
    { name: "Gear", count: "3 Items", icon: Keyboard, path: "/products?category=Gear", color: "from-purple-500/10 to-pink-500/10" },
    { name: "Computing", count: "2 Items", icon: Laptop, path: "/products?category=Computing", color: "from-emerald-500/10 to-teal-500/10" },
    { name: "Wearables", count: "2 Items", icon: Activity, path: "/products?category=Wearables", color: "from-amber-500/10 to-orange-500/10" },
  ];

  const trustBadges = [
    { icon: Truck, title: "Worldwide Shipping", desc: "Free premium express delivery for orders over $150" },
    { icon: ShieldCheck, title: "Secure Guarantee", desc: "2-year full replacement warranty on all electronics" },
    { icon: RotateCcw, title: "Hassle-Free Returns", desc: "30-day trial period on all headphones and gear" },
  ];

  return (
    <div className="pb-16 space-y-24">
      {/* Hero Intro */}
      <Hero />

      {/* Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold font-outfit text-white">Curated Collections</h2>
            <p className="text-sm text-zinc-400 font-light">Explore state-of-the-art tech built for form and function.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  href={cat.path}
                  className="group relative rounded-2xl overflow-hidden glass-card p-6 flex flex-col justify-between aspect-square cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors mt-4">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{cat.count}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Items Grid */}
      <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-outfit text-white">Trending Hardware</h2>
              <p className="text-sm text-zinc-400 font-light">The most popular setups right now.</p>
            </div>
            <Link
              href="/products"
              className="group text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
            >
              View All Catalog
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Big Promo Spotlight banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-8 border border-indigo-500/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="flex-1 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold uppercase tracking-wider">
              <BadgePercent className="w-3.5 h-3.5" />
              Special Desk Integration Offer
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-outfit leading-tight text-white">
              Create The Ultimate <br />
              <span className="text-amber-400">Zen Workspace</span>
            </h2>
            <p className="text-zinc-400 max-w-lg font-light leading-relaxed">
              Order our solid American Walnut floating desk along with the premium Neon mechanical keyboard today, and receive a free leather deskmat.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/products/zen-desk"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition-all hover:scale-102 active:scale-98 cursor-pointer"
              >
                Buy Walnut Desk
              </Link>
              <Link
                href="/products/kb-neon"
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all border border-white/5 cursor-pointer"
              >
                View Neon Keyboard
              </Link>
            </div>
          </div>

          <div className="flex-1 max-w-md w-full relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop"
                alt="Minimalist Desk Setup"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center text-indigo-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-zinc-100">{badge.title}</h4>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
