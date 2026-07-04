import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | CoreTrade",
  description: "CoreTrade privacy policy, describing data collection, encryption, cookies, and consumer choices.",
};

export default function PrivacyPage() {
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
            <Shield className="w-5 h-5 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-extrabold font-outfit text-white tracking-tight">
            Privacy Policy
          </h1>
        </div>
        <p className="text-zinc-500 text-xs font-light">
          Last Updated: July 4, 2026
        </p>
      </div>

      {/* Legal Prose Content */}
      <div className="glass-card rounded-2xl p-8 border border-white/5 space-y-8 text-zinc-300 font-light text-sm leading-relaxed">
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white font-outfit">1. Information We Collect</h3>
          <p>
            When you browse CoreTrade, purchase products, or establish a customer account, we collect specific details:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li>
              <strong className="text-zinc-300 font-semibold">Personal Identifiers:</strong> Your name, billing address, shipping address, email address, and contact numbers.
            </li>
            <li>
              <strong className="text-zinc-300 font-semibold">Payment Data:</strong> All payments are processed through secure, PCI-compliant gateways (Stripe/PayPal). We do not record or retain your raw card details.
            </li>
            <li>
              <strong className="text-zinc-300 font-semibold">Device Metadata:</strong> Your IP address, browser footprint, OS parameters, and page browsing logs collected automatically via local analytical cookies.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white font-outfit">2. How We Use Your Information</h3>
          <p>
            Your telemetry and data are deployed solely for operation-based demands, including:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li>Processing, packing, and dispatching your hardware purchases.</li>
            <li>Managing shipping insurances and processing returns/refund requests.</li>
            <li>Distributing newsletter content or stock notifications if you opt-in.</li>
            <li>Detecting and preventing fraudulent purchases or unauthorized access.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white font-outfit">3. Data Sharing & Third-Party Service Providers</h3>
          <p>
            We strictly do not rent or sell customer databases to advertising hubs. We share minimal information only with verified third parties strictly needed to fulfill order operations:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li>Logistical carriers (DHL, FedEx, UPS) to handle physical parcel drops.</li>
            <li>PCI-compliant financial systems (Stripe, PayPal) to clear payment auths.</li>
            <li>Cloud database services and analytical providers (Google Analytics) to optimize storefront performance.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white font-outfit">4. Security Measures</h3>
          <p>
            CoreTrade implements enterprise-grade security structures. Our storefront runs strictly over HTTPS, with all sensitive data payloads encrypted in transit utilizing SSL/TLS protocols. We regularly inspect and review our internal storage vaults to prevent security gaps.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white font-outfit">5. Your Choices & Data Rights</h3>
          <p>
            You hold total authority over your private details. You have the right to request access to the data we retain, demand amendments, or ask for complete deletion of your customer profile. To exercise these rights, please email us directly at <a href="mailto:privacy@coretrade.io" className="text-indigo-400 hover:underline">privacy@coretrade.io</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
