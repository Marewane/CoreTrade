"use client";

import React from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();

  const shippingCost = cartTotal > 150 ? 0 : cart.length > 0 ? 15 : 0;
  const taxCost = Math.round(cartTotal * 0.08); // 8% tax
  const grandTotal = cartTotal + shippingCost + taxCost;

  const handleRemove = (id: string, name: string, color: string) => {
    removeFromCart(id, color);
    showToast(`Removed ${name} (${color}) from cart`, "info");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8 text-left">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold font-outfit text-white">Shopping Bag</h1>
        <p className="text-sm text-zinc-400 font-light">
          Review your items and adjust quantities before placing order.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 rounded-3xl glass-card border border-dashed border-white/10 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-500">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div>
            <h2 className="font-bold text-zinc-200">Your bag is empty</h2>
            <p className="text-sm text-zinc-500 mt-1">Looks like you haven't added any luxury tech gear yet.</p>
          </div>
          <Link
            href="/products"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors mt-2"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart items list */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Products ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
              <button
                onClick={() => {
                  clearCart();
                  showToast("Cleared shopping bag", "info");
                }}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.color}`}
                  className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl glass-card border border-white/5"
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-zinc-950/80 rounded-xl overflow-hidden shrink-0 border border-white/5 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-white text-base sm:text-lg">
                            <Link href={`/products/${item.id}`} className="hover:text-indigo-400 transition-colors">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="text-xs text-zinc-400 mt-1 capitalize font-light">Color: {item.color}</p>
                        </div>
                        <span className="text-lg font-extrabold text-indigo-300">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-white/5 rounded-xl overflow-hidden bg-zinc-950/80">
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                          className="p-2 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center font-bold"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-sm font-semibold w-8 text-center select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                          className="p-2 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove action */}
                      <button
                        onClick={() => handleRemove(item.id, item.name, item.color)}
                        className="text-zinc-500 hover:text-rose-400 p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Card Summary */}
          <div className="lg:col-span-4 rounded-2xl glass-card border border-white/5 p-6 space-y-6">
            <h3 className="font-bold font-outfit text-white text-lg">Order Summary</h3>

            <div className="divide-y divide-white/5 text-sm">
              <div className="flex justify-between py-3">
                <span className="text-zinc-400">Subtotal</span>
                <span className="font-bold text-white">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-zinc-400">Shipping</span>
                <span className="font-bold text-white">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-400">Free Shipping</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-zinc-400">Estimated Tax</span>
                <span className="font-bold text-white">{formatPrice(taxCost)}</span>
              </div>
              <div className="flex justify-between py-3 border-t border-white/5 pt-4 text-base">
                <span className="font-bold text-white">Grand Total</span>
                <span className="font-extrabold text-lg text-indigo-400">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {shippingCost > 0 && (
              <p className="text-xs text-zinc-500 leading-normal">
                💡 Add <span className="text-indigo-300 font-semibold">{formatPrice(150 - cartTotal)}</span> more of eligible gear to get <span className="text-emerald-400 font-semibold">Free Worldwide Shipping</span>.
              </p>
            )}

            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/checkout"
                className="group w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold shadow-lg shadow-amber-500/10 text-center transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products"
                className="w-full py-3 text-center rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-semibold transition-colors border border-white/5"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
