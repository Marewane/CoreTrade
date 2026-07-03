"use client";

import React, { useState, use, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Heart, ShoppingBag, ArrowLeft, Shield, Truck, Sparkles, Check } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  // Find product in DB
  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  // State Management
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Default");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFav = isInWishlist(product.id);

  // Get active color hex
  const activeColorHex = useMemo(() => {
    return product.colors.find((c) => c.name === selectedColor)?.hex || "";
  }, [selectedColor, product.colors]);

  // Related products (same category, excluding current)
  const relatedProducts = useMemo(() => {
    return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  }, [product.category, product.id]);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    
    // Add to cart with quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        tagline: product.tagline,
        price: product.price,
        image: product.images[0],
        color: selectedColor,
      });
    }

    showToast(`Added ${quantity} x ${product.name} (${selectedColor}) to cart!`, "success");
    setQuantity(1); // reset qty
  };

  const handleWishlistToggle = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      tagline: product.tagline,
      price: product.price,
      image: product.images[0],
      category: product.category,
      inStock: product.inStock,
    });
    showToast(
      isFav
        ? `Removed ${product.name} from wishlist`
        : `Saved ${product.name} to wishlist`,
      "info"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-16">
      {/* Back Link */}
      <div className="text-left">
        <Link
          href="/products"
          className="group inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to catalog
        </Link>
      </div>

      {/* Main Detail Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main Visual Frame */}
          <div className="relative aspect-square w-full rounded-2xl bg-zinc-950/80 border border-white/5 overflow-hidden flex items-center justify-center">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 rounded-xl bg-zinc-900 border overflow-hidden cursor-pointer transition-all ${
                    activeImage === img ? "border-indigo-500 ring-2 ring-indigo-500/25" : "border-white/5 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Triggers */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
          <div className="space-y-6">
            {/* Header / Category */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit text-white leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-zinc-400 italic font-light leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Price / Star Rating */}
            <div className="flex items-center gap-6 py-4 border-y border-white/5">
              <span className="text-3xl font-extrabold text-white">
                {formatPrice(product.price)}
              </span>
              <div className="flex items-center gap-1 bg-white/3 border border-white/5 px-2.5 py-1 rounded-lg">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span className="text-xs font-bold text-zinc-200">{product.rating}</span>
                <span className="text-[10px] text-zinc-500">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              {product.longDescription}
            </p>

            {/* Configs (Color Swatches / Quantity selector) */}
            <div className="space-y-6 pt-4">
              {/* Colors */}
              {product.colors.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase text-zinc-400 tracking-wider">
                    Select Color: <span className="text-white capitalize">{selectedColor}</span>
                  </h4>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer transition-all ${
                          selectedColor === color.name
                            ? "border-indigo-500 ring-4 ring-indigo-500/20"
                            : "border-white/10 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === color.name && (
                          <Check className={`w-4 h-4 ${color.hex === "#f4f4f5" || color.hex === "#fafafa" ? "text-slate-950" : "text-white"}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              {product.inStock && (
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase text-zinc-400 tracking-wider">Quantity</h4>
                  <div className="flex items-center border border-white/5 rounded-xl overflow-hidden bg-zinc-950/80 w-32">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer w-10 flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center text-sm font-semibold select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer w-10 flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            <div className="flex gap-4">
              {product.inStock ? (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-indigo-650 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/10 cursor-pointer transition-all duration-200"
                >
                  <ShoppingBag className="w-5 h-5 text-indigo-300 group-hover:scale-105 transition-transform" />
                  Add to Shopping Bag
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-zinc-800 text-zinc-500 font-semibold border border-white/5 cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}

              <button
                onClick={handleWishlistToggle}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-center ${
                  isFav
                    ? "bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500/20"
                    : "bg-white/5 border-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                }`}
                title="Add to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFav ? "fill-rose-500" : ""}`} />
              </button>
            </div>

            {/* Quick benefits */}
            <div className="grid grid-cols-2 gap-4 text-xs text-zinc-400 pt-2 font-light">
              <div className="flex items-center gap-2 bg-white/2 p-3 rounded-xl border border-white/3">
                <Truck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Global Express Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white/2 p-3 rounded-xl border border-white/3">
                <Shield className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>2-Year Full Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Specifications Grid */}
      <div className="space-y-6 pt-12 border-t border-white/5 text-left">
        <h3 className="text-2xl font-bold font-outfit text-white">Technical Specifications</h3>
        <div className="glass-card rounded-2xl overflow-hidden border border-white/5 max-w-3xl">
          <div className="divide-y divide-white/5">
            {product.specs.map((spec) => (
              <div key={spec.name} className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 text-sm gap-2">
                <span className="font-bold text-zinc-400">{spec.name}</span>
                <span className="col-span-2 text-zinc-200 font-light">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="space-y-8 pt-12 border-t border-white/5 text-left">
          <h3 className="text-2xl font-bold font-outfit text-white">Related Collections</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
