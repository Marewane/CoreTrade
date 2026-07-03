"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  removeFromWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("coretrade_wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (e) {
      console.error("Failed to load wishlist from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("coretrade_wishlist", JSON.stringify(wishlist));
      } catch (e) {
        console.error("Failed to save wishlist to localStorage", e);
      }
    }
  }, [wishlist, isLoaded]);

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((i) => i.id === item.id);
      if (exists) {
        return prevWishlist.filter((i) => i.id !== item.id);
      } else {
        return [...prevWishlist, item];
      }
    });
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id);
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
