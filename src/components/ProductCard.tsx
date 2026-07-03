"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFav = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addToCart({
      id: product.id,
      name: product.name,
      tagline: product.tagline,
      price: product.price,
      image: product.images[0],
      color: product.colors[0]?.name || "Default",
    });
    showToast(`Added ${product.name} to cart`, "success");
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <Link href={`/products/${product.id}`} className="group block">
      <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full relative">
        {/* Badges / Actions Overlay */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.badge && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-indigo-600 text-white rounded-full shadow-md">
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-full border border-white/5">
              Sold Out
            </span>
          )}
        </div>

        {/* Favorite Trigger */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-[#07070b]/60 hover:bg-[#07070b]/80 border border-white/5 text-zinc-400 hover:text-white cursor-pointer backdrop-blur-md transition-colors"
        >
          <Heart
            className={`w-4.5 h-4.5 transition-colors ${
              isFav ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </button>

        {/* Product Visual */}
        <div className="relative aspect-square w-full bg-zinc-950/80 overflow-hidden flex items-center justify-center border-b border-white/5">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Details Area */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              {product.category}
            </span>
            <h3 className="font-bold text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-zinc-400 font-light line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-3">
            {/* Color Swatches */}
            {product.colors.length > 0 && (
              <div className="flex items-center gap-1.5 pt-1">
                {product.colors.map((color) => (
                  <span
                    key={color.name}
                    title={color.name}
                    className="w-2.5 h-2.5 rounded-full border border-white/10"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            )}

            {/* Price / Add Trigger */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-white">
                  {formatPrice(product.price)}
                </span>
                {/* Rating */}
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                  <span className="text-[10px] font-semibold text-zinc-300">
                    {product.rating}
                  </span>
                  <span className="text-[9px] text-zinc-500">
                    ({product.reviewsCount})
                  </span>
                </div>
              </div>

              {product.inStock ? (
                <button
                  onClick={handleAddToCart}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-indigo-650 hover:text-white text-indigo-400 border border-white/5 group-hover:border-indigo-500/20 group-hover:bg-indigo-500/10 cursor-pointer transition-all duration-300 flex items-center justify-center"
                  title="Add to Cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-xs text-zinc-500 font-medium">Notify Me</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
