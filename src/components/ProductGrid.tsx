"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search, RotateCcw, ChevronDown } from "lucide-react";
import { products, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { AnimatePresence, motion } from "framer-motion";

interface ProductGridProps {
  initialCategory?: string;
  initialSearch?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  initialCategory = "All",
  initialSearch = "",
}) => {
  const searchParams = useSearchParams();
  
  // States
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<string>("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Sync state with URL search parameters
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    
    const query = searchParams.get("search");
    if (query !== null) setSearch(query);
  }, [searchParams]);

  // Categories list
  const categories = ["All", "Audio", "Gear", "Computing", "Wearables"];

  // Price brackets filter function
  const matchPrice = (price: number, bracket: string) => {
    if (bracket === "All") return true;
    if (bracket === "under-150") return price < 150;
    if (bracket === "150-400") return price >= 150 && price <= 400;
    if (bracket === "over-400") return price > 400;
    return true;
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    if (priceRange !== "All") {
      result = result.filter((p) => matchPrice(p.price, priceRange));
    }

    // Stock availability filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sort order
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // featured / default
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [search, selectedCategory, priceRange, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setPriceRange("All");
    setInStockOnly(false);
    setSortBy("featured");
  };

  return (
    <div className="space-y-6">
      {/* Top Bar (Search & Sort) */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-6 border-b border-white/5">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Filter current view..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-indigo-500/50 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none placeholder-zinc-500 transition-colors"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-between sm:justify-end">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm hover:text-white cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
            Filters
          </button>

          {/* Custom Sort Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center bg-white/5 border border-white/5 hover:border-white/10 rounded-xl px-4 py-2 text-sm font-semibold text-zinc-200 hover:text-white cursor-pointer transition-colors"
            >
              <span className="text-xs text-zinc-400 mr-2 font-normal">Sort by:</span>
              <span>
                {sortBy === "featured" && "Featured"}
                {sortBy === "price-asc" && "Price: Low to High"}
                {sortBy === "price-desc" && "Price: High to Low"}
                {sortBy === "rating" && "Top Rated"}
              </span>
              <ChevronDown className={`ml-2 w-4 h-4 text-zinc-400 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsSortOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900/95 border border-white/10 backdrop-blur-xl shadow-2xl p-1.5 z-20 animate-slide-in"
                  >
                    {[
                      { value: "featured", label: "Featured" },
                      { value: "price-asc", label: "Price: Low to High" },
                      { value: "price-desc", label: "Price: High to Low" },
                      { value: "rating", label: "Top Rated" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setSortBy(opt.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between cursor-pointer ${
                          sortBy === opt.value
                            ? "bg-indigo-600/20 text-indigo-400 font-bold"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {opt.label}
                        {sortBy === opt.value && (
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Grid Body */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters (Desktop) */}
        <div className={`space-y-6 lg:block ${showMobileFilters ? "block" : "hidden"} bg-slate-950 lg:bg-transparent p-5 lg:p-0 rounded-2xl border border-white/5 lg:border-none`}>
          {/* Category Filter */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase text-zinc-400 tracking-wider">Categories</h4>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-3 py-2 rounded-xl text-sm transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-indigo-600/10 text-indigo-400 font-semibold border-l-2 border-indigo-500 pl-4"
                      : "text-zinc-400 hover:text-white hover:bg-white/3"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Brackets */}
          <div className="space-y-3 pt-6 border-t border-white/5">
            <h4 className="font-bold text-xs uppercase text-zinc-400 tracking-wider">Price Range</h4>
            <div className="flex flex-col gap-1.5">
              {[
                { label: "All Prices", value: "All" },
                { label: "Under $150", value: "under-150" },
                { label: "$150 to $400", value: "150-400" },
                { label: "Over $400", value: "over-400" },
              ].map((bracket) => (
                <label
                  key={bracket.value}
                  className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-white cursor-pointer py-1"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    checked={priceRange === bracket.value}
                    onChange={() => setPriceRange(bracket.value)}
                    className="accent-indigo-500 cursor-pointer"
                  />
                  {bracket.label}
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-3 pt-6 border-t border-white/5">
            <h4 className="font-bold text-xs uppercase text-zinc-400 tracking-wider">Availability</h4>
            <label className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-white cursor-pointer py-1">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={() => setInStockOnly(!inStockOnly)}
                className="accent-indigo-500 cursor-pointer w-4 h-4 rounded border-white/10"
              />
              In Stock Only
            </label>
          </div>

          {/* Reset Action */}
          <button
            onClick={resetFilters}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/3 hover:bg-white/5 text-xs text-zinc-400 hover:text-white border border-white/5 transition-all mt-4 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </div>

        {/* Products Grid Content */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 rounded-3xl glass-card border border-dashed border-white/10 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <Search className="w-5 h-5 text-zinc-400" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-200">No products match search criteria</h3>
                <p className="text-sm text-zinc-500 mt-1">Try resetting filters or expanding terms.</p>
              </div>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-indigo-600/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20 hover:bg-indigo-600/20 transition-all cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductGrid;
