"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      tagline: item.tagline,
      price: item.price,
      image: item.image,
      color: "Default",
    });
    removeFromWishlist(item.id);
    showToast(`Moved ${item.name} to cart!`, "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8 text-left">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold font-outfit text-white">Wishlist</h1>
        <p className="text-sm text-zinc-400 font-light">
          Your saved items. Move them to cart or browse other gear collections.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 rounded-3xl glass-card border border-dashed border-white/10 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-500">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div>
            <h2 className="font-bold text-zinc-200">Your wishlist is empty</h2>
            <p className="text-sm text-zinc-500 mt-1">Tap the heart on any product card to save it here.</p>
          </div>
          <Link
            href="/products"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors mt-2"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between h-full border border-white/5 relative group"
            >
              {/* Image Frame */}
              <div className="relative aspect-square w-full bg-zinc-950/80 overflow-hidden flex items-center justify-center border-b border-white/5">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                
                {/* Remove Trigger */}
                <button
                  onClick={() => {
                    removeFromWishlist(item.id);
                    showToast(`Removed ${item.name} from wishlist`, "info");
                  }}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-[#07070b]/60 hover:bg-[#07070b]/80 border border-white/5 text-zinc-400 hover:text-white cursor-pointer backdrop-blur-md transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Contents Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-zinc-100 group-hover:text-white transition-colors">
                    <Link href={`/products/${item.id}`} className="hover:underline">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-zinc-400 font-light line-clamp-1">{item.tagline}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-lg font-extrabold text-white">{formatPrice(item.price)}</span>
                  
                  {item.inStock ? (
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/10 cursor-pointer transition-all"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Bag
                    </button>
                  ) : (
                    <span className="text-xs text-zinc-500 font-medium">Sold Out</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
