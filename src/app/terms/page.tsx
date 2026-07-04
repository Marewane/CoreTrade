import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export const metadata = {
  title: "Terms of Use | CoreTrade",
  description: "CoreTrade Terms of Use agreement, user requirements, payment rules, and liability clauses.",
};

export default function TermsPage() {
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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-550/20 shrink-0">
            <Scale className="w-5 h-5 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-extrabold font-outfit text-white tracking-tight">
            Terms of Use
          </h1>
        </div>
        <p className="text-zinc-500 text-xs font-light">
          Last Updated: July 4, 2026
        </p>
      </div>

      {/* Terms Prose Content */}
      <div className="glass-card rounded-2xl p-8 border border-white/5 space-y-8 text-zinc-300 font-light text-sm leading-relaxed">
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white font-outfit">1. Agreement to Terms</h3>
          <p>
            By accessing or using the CoreTrade website and e-commerce portal, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use the website or purchase products from us.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white font-outfit">2. Customer Account Responsibilities</h3>
          <p>
            When registering an account or placing orders:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li>You agree to provide true, current, and accurate purchase and account credentials.</li>
            <li>You are responsible for keeping your login credentials confidential and secure.</li>
            <li>You accept sole responsibility for all operations happening under your account.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white font-outfit">3. Purchases, Pricing & Stock Availability</h3>
          <p>
            All purchases are subject to the following guidelines:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li>We reserve the right to change product prices, specifications, and availability details without prior notification.</li>
            <li>In the event of a pricing error on the store, we reserve the right to cancel any orders placed at the incorrect price and issue a full refund.</li>
            <li>We reserve the right to reject or limit order quantities at our discretion.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white font-outfit">4. Intellectual Property Rights</h3>
          <p>
            All original media, text, graphics, designs, logos, interfaces, and code assets on this website are the proprietary property of CoreTrade Inc. and are protected by international copyright, trademark, and intellectual property laws.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white font-outfit">5. Limitation of Liability</h3>
          <p>
            To the maximum extent permitted by law, CoreTrade Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, our products or website. In no event shall our maximum liability exceed the total dollar amount paid by you for the specific product in question.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white font-outfit">6. Governing Law</h3>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles. Any dispute arising out of these terms shall be resolved exclusively in the state or federal courts located in New York, NY.
          </p>
        </section>
      </div>
    </div>
  );
}
