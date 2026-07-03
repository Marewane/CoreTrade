"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cpu, Github, Twitter, Instagram } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast("Thank you for subscribing to CoreTrade updates!", "success");
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#040407] border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-indigo-400" />
              <span className="font-extrabold text-xl tracking-wider font-outfit text-white">
                CoreTrade
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Curating elite workspace items, audiophile components, and premium modular electronics for creators and builders.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h4 className="font-semibold text-sm text-white uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=Audio" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Audio Collection
                </Link>
              </li>
              <li>
                <Link href="/products?category=Gear" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Desk & Deskmat Gear
                </Link>
              </li>
              <li>
                <Link href="/products?category=Computing" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  High Performance PC
                </Link>
              </li>
              <li>
                <Link href="/products?category=Wearables" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Minimal Smart Rings
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-sm text-white uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Shipping Rates
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Warranty & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-white uppercase tracking-wider mb-4">
              CoreTrade Newsletter
            </h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Get notified of exclusive hardware drops, early reservations, and discount releases.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border border-white/5 hover:border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-2 text-sm focus:outline-none w-full placeholder-zinc-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} CoreTrade Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-zinc-500">
            <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
