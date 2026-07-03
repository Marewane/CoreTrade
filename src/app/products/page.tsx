import React, { Suspense } from "react";
import { ProductGrid } from "@/components/ProductGrid";

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
      <div className="space-y-2 mb-8 text-left">
        <h1 className="text-3xl font-extrabold font-outfit text-white">Product Catalog</h1>
        <p className="text-sm text-zinc-400 font-light">
          Browse our curated line of premium workspace items, audio components, and smart wearables.
        </p>
      </div>

      <Suspense fallback={
        <div className="text-center py-20 text-zinc-500">
          <svg className="animate-spin h-8 w-8 text-indigo-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading Catalog...
        </div>
      }>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
