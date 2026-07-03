"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Heart, Search, Menu, X, Cpu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CartSidebar } from "./CartSidebar";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  // Scroll handler for transparent to glass transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Wishlist", path: "/wishlist" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled || isOpen
            ? "glass-nav shadow-lg"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 rounded-xl bg-indigo-600/10 border border-indigo-500/20 group-hover:bg-indigo-600/20 transition-all">
                  <Cpu className="w-6 h-6 text-indigo-400 animate-pulse" />
                </div>
                <span className="font-extrabold text-2xl tracking-wider font-outfit text-white">
                  CoreTrade
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    pathname === link.path ? "text-indigo-400" : "text-zinc-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions (Search, Wishlist, Cart, Mobile Toggle) */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search gear..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/5 hover:border-white/10 focus:border-indigo-500/50 rounded-full py-1.5 pl-4 pr-10 text-sm focus:outline-none w-48 focus:w-64 transition-all duration-300 placeholder-zinc-500"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white cursor-pointer">
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative text-zinc-400 hover:text-white transition-colors"
                title="Wishlist"
              >
                <Heart className="w-5.5 h-5.5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border border-[#07070b]">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Cart"
              >
                <ShoppingBag className="w-5.5 h-5.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-zinc-950 text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border border-[#07070b]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-zinc-950 text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-400 hover:text-white focus:outline-none p-1 cursor-pointer"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        {isOpen && (
          <div className="md:hidden bg-slate-950 border-b border-white/5 animate-slide-in">
            <div className="px-2 pt-2 pb-6 space-y-3 sm:px-3">
              <form onSubmit={handleSearchSubmit} className="relative px-3 mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 focus:border-indigo-500 rounded-xl py-2 pl-4 pr-10 text-sm focus:outline-none w-full"
                />
                <button type="submit" className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer">
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-xl text-base font-medium transition-colors ${
                    pathname === link.path
                      ? "bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/wishlist"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-base font-medium text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                <span>Wishlist</span>
                {wishlist.length > 0 && (
                  <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
export default Navbar;
