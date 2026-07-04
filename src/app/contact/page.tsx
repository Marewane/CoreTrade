"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Clock, MapPin, Send, HelpCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const { showToast } = useToast();

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock submission latency
    setTimeout(() => {
      showToast(
        `Thank you ${formData.name}! Your message regarding "${formData.subject}" has been received.`,
        "success"
      );
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-12 text-left">
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
          Contact Support & Inquiry
        </h1>
        <p className="text-zinc-400 font-light max-w-2xl leading-relaxed text-sm">
          Have a inquiry about an order status, a complex warranty claim, or a business development partnership? Submit a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Contact Form */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-white/5 space-y-6">
          <h3 className="font-bold text-lg text-white">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none placeholder-zinc-550 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none placeholder-zinc-550 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Product Inquiry / Return Claim / Support"
                className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none placeholder-zinc-550 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Detailed Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Briefly explain your concern or inquiry here..."
                className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none placeholder-zinc-550 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-550 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-semibold shadow-lg shadow-indigo-600/10 cursor-pointer disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-indigo-300" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Coordinate Information */}
        <div className="lg:col-span-5 space-y-6">
          {/* Email Info */}
          <div className="glass-card rounded-2xl p-6 border border-white/5 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-550/20 shrink-0">
              <Mail className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-white text-sm">Direct Channels</h4>
              <p className="text-xs text-zinc-450 leading-relaxed font-light">
                Customer Support: <a href="mailto:support@coretrade.io" className="text-indigo-400 hover:underline">support@coretrade.io</a>
              </p>
              <p className="text-xs text-zinc-450 leading-relaxed font-light">
                Media & Press: <a href="mailto:media@coretrade.io" className="text-indigo-400 hover:underline">media@coretrade.io</a>
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="glass-card rounded-2xl p-6 border border-white/5 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-550/20 shrink-0">
              <Clock className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-white text-sm">Business Operations</h4>
              <p className="text-xs text-zinc-450 font-light">
                Monday - Friday: 9:00 AM - 6:00 PM EST
              </p>
              <p className="text-xs text-zinc-450 font-light">
                Saturday: 10:00 AM - 4:00 PM EST
              </p>
              <p className="text-xs text-zinc-500 font-light italic">
                * Note: Closed on Sundays and major public holidays.
              </p>
            </div>
          </div>

          {/* Location / Headquarters */}
          <div className="glass-card rounded-2xl p-6 border border-white/5 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-550/20 shrink-0">
              <MapPin className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-white text-sm">Corporate Headquarters</h4>
              <p className="text-xs text-zinc-450 leading-relaxed font-light">
                CoreTrade Inc.<br />
                450 Broadway, Suite 1200<br />
                New York, NY 10013
              </p>
            </div>
          </div>

          {/* Instant FAQ redirection */}
          <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-3">
            <div className="flex gap-2 items-center text-sm font-bold text-white">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>Looking for quick answers?</span>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              We highly recommend browsing our FAQ for solutions on instant troubleshooting, returns tracking, and setup guidelines.
            </p>
            <Link
              href="/faq"
              className="inline-block text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Browse FAQs &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
