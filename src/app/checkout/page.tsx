"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, CreditCard, ShoppingBag, Sparkles, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postal: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shippingCost = cartTotal > 150 ? 0 : cart.length > 0 ? 15 : 0;
  const taxCost = Math.round(cartTotal * 0.08);
  const grandTotal = cartTotal + shippingCost + taxCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }

    setIsSubmitting(true);

    // Simulate payment API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      setOrderId("AUR-" + Math.floor(100000 + Math.random() * 900000));
      clearCart();
      showToast("Order placed successfully!", "success");
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 flex-1 w-full text-center space-y-8 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full pointer-events-none" />
          <CheckCircle2 className="w-16 h-16 text-emerald-400 relative z-10 shrink-0" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit text-white">Order Confirmed</h1>
          <p className="text-sm text-zinc-400 font-light max-w-md mx-auto">
            Your payment went through successfully. We've sent a detailed receipt and tracking link to your email.
          </p>
        </div>

        <div className="glass-card rounded-2xl border border-white/5 p-6 w-full max-w-sm text-left divide-y divide-white/5 space-y-4">
          <div className="flex justify-between pb-3 text-sm">
            <span className="text-zinc-500">Order ID</span>
            <span className="font-bold text-white font-mono">{orderId}</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="text-zinc-500">Estimated Delivery</span>
            <span className="font-bold text-emerald-400">3-5 Business Days</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="text-zinc-500">Status</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
              Preparing Shipment
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm pt-4">
          <Link
            href="/products"
            className="flex-1 py-3 text-center rounded-xl bg-indigo-650 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/10 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="flex-1 py-3 text-center rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-semibold border border-white/5 transition-colors"
          >
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8 text-left">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold font-outfit text-white">Secure Checkout</h1>
        <p className="text-sm text-zinc-400 font-light">
          Complete your purchase by detailing your shipping and payment information.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 rounded-3xl glass-card border border-dashed border-white/10 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-500">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-bold text-zinc-200">No items to checkout</h2>
            <p className="text-sm text-zinc-500 mt-1">Add items to your cart before proceeding.</p>
          </div>
          <Link
            href="/products"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors mt-2"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Shipping / Payment Info Form */}
          <div className="lg:col-span-8 space-y-6">
            {/* Shipping Address Section */}
            <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
              <h3 className="font-bold text-white text-lg border-b border-white/5 pb-2">
                1. Shipping Address
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-1 sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950/80 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none placeholder-zinc-600 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950/80 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none placeholder-zinc-600 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400">Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950/80 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none placeholder-zinc-600 transition-colors"
                    placeholder="123 Luxury Ave, Apt 4"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950/80 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none placeholder-zinc-600 transition-colors"
                    placeholder="New York"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400">Postal Code</label>
                  <input
                    type="text"
                    name="postal"
                    required
                    value={formData.postal}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950/80 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none placeholder-zinc-600 transition-colors"
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>

            {/* Payment Info Section */}
            <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h3 className="font-bold text-white text-lg">
                  2. Payment Method
                </h3>
                <div className="flex gap-1.5 text-zinc-400">
                  <CreditCard className="w-5 h-5 text-indigo-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="col-span-1 sm:col-span-4 space-y-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    required
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950/80 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none placeholder-zinc-600 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="col-span-1 sm:col-span-4 space-y-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    maxLength={19}
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950/80 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none placeholder-zinc-600 transition-colors"
                    placeholder="4111 2222 3333 4444"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400">Expiration Date</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    required
                    maxLength={5}
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950/80 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none placeholder-zinc-600 transition-colors"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400">CVC / CVV</label>
                  <input
                    type="password"
                    name="cardCvc"
                    required
                    maxLength={4}
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950/80 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none placeholder-zinc-600 transition-colors"
                    placeholder="•••"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Cart Review Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl glass-card border border-white/5 p-6 space-y-4">
              <h3 className="font-bold font-outfit text-white text-lg border-b border-white/5 pb-2">
                Order Review
              </h3>

              <div className="divide-y divide-white/5 space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex gap-3 py-3 items-center">
                    <div className="w-12 h-12 bg-zinc-950 rounded-lg overflow-hidden shrink-0 border border-white/5 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-zinc-200 truncate">{item.name}</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5 capitalize">
                        Qty: {item.quantity} • {item.color}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-zinc-300">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="divide-y divide-white/5 text-xs pt-2">
                <div className="flex justify-between py-2 text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between py-2 text-zinc-400">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between py-2 text-zinc-400">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-white">{formatPrice(taxCost)}</span>
                </div>
                <div className="flex justify-between py-3 text-sm font-bold border-t border-white/5 pt-3">
                  <span className="text-white">Grand Total</span>
                  <span className="text-indigo-400 text-base">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 text-zinc-950 disabled:text-zinc-500 font-extrabold shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    Complete Purchase ({formatPrice(grandTotal)})
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
