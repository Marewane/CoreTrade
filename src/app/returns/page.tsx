import React from "react";
import Link from "next/link";
import { ShieldCheck, Undo2, Send, PackageOpen, CreditCard, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Warranty & Returns | CoreTrade",
  description: "CoreTrade 30-day returns policy, refund details, and 2-year full coverage warranty details.",
};

export default function ReturnsPage() {
  const steps = [
    {
      num: "01",
      title: "Initiate Request",
      icon: <Send className="w-5 h-5 text-indigo-400" />,
      desc: "Reach out via our Contact page or email support@coretrade.io with your order number."
    },
    {
      num: "02",
      title: "Securely Package",
      icon: <PackageOpen className="w-5 h-5 text-indigo-400" />,
      desc: "Place the item back in its original packaging along with all documentation and accessories."
    },
    {
      num: "03",
      title: "Drop Off or Ship",
      icon: <Undo2 className="w-5 h-5 text-indigo-400" />,
      desc: "Affix the prepaid shipping label we provide and hand it over to the designated carrier."
    },
    {
      num: "04",
      title: "Receive Refund",
      icon: <CreditCard className="w-5 h-5 text-indigo-400" />,
      desc: "Once received and inspected (typically 48 hours), your refund will process back to your card."
    }
  ];

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
          Warranty & Returns
        </h1>
        <p className="text-zinc-400 font-light max-w-2xl leading-relaxed text-sm">
          We want you to feel fully confident in your investment. That&apos;s why we offer a comprehensive 30-day return policy and a robust 2-year warranty on all products.
        </p>
      </div>


      {/* 30 Day Returns policy description */}
      <div className="glass-card rounded-2xl p-8 border border-white/5 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-550/20">
            <Undo2 className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">30-Day Hassle-Free Returns</h3>
            <p className="text-xs text-zinc-400">Satisfaction guaranteed</p>
          </div>
        </div>
        <p className="text-sm text-zinc-300 font-light leading-relaxed">
          If you are not completely satisfied with your hardware purchase, you can return the product for a full refund within 30 days of delivery. Items must be in their original packaging, containing all parts, cords, and manuals. We cover return shipping costs for domestic customers.
        </p>
      </div>

      {/* Steps workflow grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold font-outfit text-white">The Return Process</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="glass-card rounded-2xl p-5 border border-white/5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="w-8 h-8 rounded-lg bg-indigo-550/5 border border-white/5 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold font-outfit text-indigo-400/50">{step.num}</span>
                </div>
                <h4 className="text-sm font-bold text-white pt-2">{step.title}</h4>
              </div>
              <p className="text-xs text-zinc-450 leading-relaxed font-light">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Warranty specifications */}
      <div className="glass-card rounded-2xl p-8 border border-white/5 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-550/20">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">2-Year Full Coverage Warranty</h3>
            <p className="text-xs text-zinc-400">Our quality commitment</p>
          </div>
        </div>
        <p className="text-sm text-zinc-300 font-light leading-relaxed">
          Every piece of CoreTrade hardware comes standard with a 2-year manufacturer warranty. This covers any functional breakdown or hardware malfunction resulting from standard operational wear and tear or factory defects.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-light pt-2">
          <div className="p-4 rounded-xl bg-white/2 border border-white/3 space-y-2">
            <span className="font-bold text-white text-[13px]">What is covered:</span>
            <ul className="list-disc pl-4 space-y-1 text-zinc-400">
              <li>Defective buttons, optical sensors, or switches</li>
              <li>Sudden battery failure or charging controller defects</li>
              <li>Acoustic driver distortions or speaker static</li>
              <li>Display panel dead pixels or backlighting issues</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-white/2 border border-white/3 space-y-2">
            <span className="font-bold text-white text-[13px]">What is not covered:</span>
            <ul className="list-disc pl-4 space-y-1 text-zinc-400">
              <li>Damage caused by physical drops or impact</li>
              <li>Water submersion beyond rated IP standards</li>
              <li>Unauthorized opening or modding of components</li>
              <li>Cosmetic scratches and finish degradation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
