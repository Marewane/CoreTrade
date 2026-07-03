"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { showToast } = useToast();

  const handleRemove = (id: string, name: string, color: string) => {
    removeFromCart(id, color);
    showToast(`${name} (${color}) removed from cart`, "info");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-[#0b0b12] border-l border-white/5 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-lg">Your Cart</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-16 h-16 text-zinc-600 stroke-[1.5]" />
                  <div>
                    <h4 className="font-semibold text-zinc-300">Your cart is empty</h4>
                    <p className="text-zinc-500 text-sm mt-1">Add some luxury tech to get started.</p>
                  </div>
                  <Link href="/products" onClick={onClose} className="text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors mt-2">
                    Browse Catalog →
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.id}-${item.color}`}
                    className="flex gap-4 p-3 rounded-xl bg-white/3 border border-white/5"
                  >
                    <div className="relative w-20 h-20 bg-zinc-900 rounded-lg overflow-hidden shrink-0 border border-white/5 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-medium text-sm text-zinc-100 line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="text-sm font-semibold text-indigo-300 shrink-0">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5 capitalize">Color: {item.color}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-white/5 rounded-lg overflow-hidden bg-zinc-950">
                          <button
                            onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                            className="p-1 hover:bg-white/5 text-zinc-400 hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-medium w-6 text-center select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                            className="p-1 hover:bg-white/5 text-zinc-400 hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => handleRemove(item.id, item.name, item.color)}
                          className="text-zinc-500 hover:text-rose-400 p-1 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-white/5 bg-white/2 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="font-bold text-lg text-white">{formatPrice(cartTotal)}</span>
                </div>
                <p className="text-xs text-zinc-500">Shipping and taxes calculated at checkout.</p>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="w-full text-center py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-500/10 transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="w-full text-center py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/5"
                  >
                    View Shopping Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default CartSidebar;
