"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown, HelpCircle, ArrowLeft } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "Shipping" | "Returns" | "Products" | "Warranty";
}

export default function FAQPage() {
  const faqs: FAQItem[] = [
    {
      category: "Shipping",
      question: "How long does shipping take?",
      answer: "Standard domestic shipping takes 3-5 business days. International shipping varies by location but typically takes 3-6 business days via DHL Express. Orders placed before 1:00 PM EST ship out on the same business day."
    },
    {
      category: "Shipping",
      question: "Where can I find my tracking number?",
      answer: "Once your package is hand-signed and dispatched, a confirmation email containing your tracking number and carrier link will automatically be sent. You can also view this in your customer dashboard."
    },
    {
      category: "Shipping",
      question: "Do you ship worldwide?",
      answer: "Yes, we ship to over 120 countries worldwide. We offer Customs & Duties Pre-Cleared (DDP) options at checkout so that you don't face unexpected brokerage fees upon delivery."
    },
    {
      category: "Returns",
      question: "What is your return policy?",
      answer: "We offer 30-day hassle-free returns on all products. If you are not satisfied with your purchase, you can return it within 30 days of receipt in its original packaging. Return shipping is free for domestic customers."
    },
    {
      category: "Returns",
      question: "How do I request a prepaid return label?",
      answer: "Head over to our Contact Us page or email support@coretrade.io with your order number. Our support team will verify your purchase window and email you a printable prepaid FedEx shipping label."
    },
    {
      category: "Returns",
      question: "How long does a refund take to process?",
      answer: "Once our intake warehouse receives your returned item and performs a standard inspect check (typically 48 hours), your refund is immediately processed. It can take 3-5 business days to appear on your bank statement."
    },
    {
      category: "Products",
      question: "Do the smart rings require a monthly subscription?",
      answer: "No. Unlike other wellness brands, the Aura Ring Slate stores and displays your biometric telemetry entirely subscription-free through our local mobile application."
    },
    {
      category: "Products",
      question: "Are your mechanical keyboards hot-swappable?",
      answer: "Yes, the Neon 75 keyboard has standard hot-swappable MX sockets. It supports both 3-pin and 5-pin linear, tactile, or clicky mechanical switches without any soldering."
    },
    {
      category: "Warranty",
      question: "What does the 2-year warranty cover?",
      answer: "The 2-year warranty covers all structural components and internal electronics failures due to manufacturing defects. This includes dead screen pixels, faulty switches, failed charging docks, or acoustic driver rattle."
    },
    {
      category: "Warranty",
      question: "Does the warranty cover water damage?",
      answer: "It covers water damage only for products specifically rated as waterproof (like the Aura Ring Slate rated for 100M). Accidental drops in liquid or immersion of non-waterproof gear (like the mechanical keyboard) is excluded."
    }
  ];

  // State
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = ["All", "Shipping", "Returns", "Products", "Warranty"];

  // Toggle Accordion
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
      const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

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
          Frequently Asked Questions
        </h1>
        <p className="text-zinc-400 font-light max-w-2xl leading-relaxed text-sm">
          Have a question about tracking, setup guides, return processes, or custom hardware? Find your answer instantly below.
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-6 border-b border-white/5">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-indigo-500/50 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none placeholder-zinc-555 transition-colors"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-650/20"
                  : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-2xl border border-dashed border-white/10">
            <HelpCircle className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
            <p className="text-sm text-zinc-400">No FAQs match your current search.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl border border-white/5 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.01] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-outfit text-indigo-400 px-2 py-1 bg-indigo-500/10 rounded-md border border-indigo-500/10">
                      {faq.category}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-zinc-200">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-60 border-t border-white/5" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-sm text-zinc-400 font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
