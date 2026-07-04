import React from "react";
import Link from "next/link";
import { Truck, Globe, Compass, ShieldAlert, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Shipping Policy & Rates | CoreTrade",
  description: "CoreTrade standard and express shipping options, international transit, duties, and tracking details.",
};

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-12 text-left">
      {/* Back Link */}
      <div>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors font-light"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold font-outfit text-white tracking-tight">
          Shipping Policy & Rates
        </h1>
        <p className="text-zinc-400 font-light max-w-2xl leading-relaxed text-sm">
          We work with leading global couriers (DHL, FedEx, UPS) to ensure that your premium hardware arrives swiftly, safely, and in pristine condition.
        </p>
      </div>

      {/* Shipping Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Domestic Tier */}
        <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-550/20">
                <Truck className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Domestic Shipping</h3>
                <p className="text-xs text-zinc-400">United States & Canada</p>
              </div>
            </div>
            
            <div className="divide-y divide-white/5 text-sm pt-2">
              <div className="py-3 flex justify-between">
                <span className="text-zinc-400 font-light">Standard Ground (3-5 Days)</span>
                <span className="font-bold text-white">$4.99 <span className="text-xs text-indigo-400 font-normal ml-1">(Free over $150)</span></span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-zinc-400 font-light">Express Delivery (1-2 Days)</span>
                <span className="font-bold text-white">$14.99</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-zinc-400 font-light">Same-Day Courier (Select Metro Cities)</span>
                <span className="font-bold text-white">$24.99</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-zinc-500 font-light">
            * Orders placed before 1:00 PM EST ship same business day.
          </p>
        </div>

        {/* International Tier */}
        <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-550/20">
                <Globe className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">International Shipping</h3>
                <p className="text-xs text-zinc-400">Europe, Asia, Australia & Americas</p>
              </div>
            </div>

            <div className="divide-y divide-white/5 text-sm pt-2">
              <div className="py-3 flex justify-between">
                <span className="text-zinc-400 font-light">DHL Express Worldwide (3-6 Days)</span>
                <span className="font-bold text-white">$29.99 <span className="text-xs text-indigo-400 font-normal ml-1">(Free over $350)</span></span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-zinc-400 font-light">Standard International (8-14 Days)</span>
                <span className="font-bold text-white">$19.99</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-zinc-400 font-light">Customs & Duties Pre-Cleared (DDP)</span>
                <span className="font-bold text-indigo-450">Calculated at Checkout</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-zinc-500 font-light">
            * Recipient is responsible for regional customs charges if DDU is selected.
          </p>
        </div>
      </div>

      {/* Helpful Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Real-time Tracking</span>
          </div>
          <p className="text-xs text-zinc-450 leading-relaxed font-light">
            A confirmation email containing a detailed tracking number and tracking link will be sent to you as soon as the carrier scans your package.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-indigo-400" />
            <span>Fully Insured Cargo</span>
          </div>
          <p className="text-xs text-zinc-450 leading-relaxed font-light">
            Every shipment is covered by CoreTrade transit protection. If your order is lost or severely damaged in transit, we will dispatch a replacement immediately.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Truck className="w-4 h-4 text-indigo-400" />
            <span>Environmentally Safe Packaging</span>
          </div>
          <p className="text-xs text-zinc-450 leading-relaxed font-light">
            All cardboard boxes, internal custom wraps, and packing materials are FSC-certified and biodegradable.
          </p>
        </div>
      </div>
    </div>
  );
}
