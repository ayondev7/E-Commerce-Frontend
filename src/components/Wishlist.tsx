"use client";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import CartContent from "./CartContent";
import { useGetWishlist } from "@/hooks/wishlistHooks"; 

const Wishlist = () => {
  const { data, isLoading, isError } = useGetWishlist();

 console.log("wishlist data", data);

  return (
    <div>
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Wishlist</h1>
          <h3 className="text-base text-text-secondary">
            Manage your saved items across multiple wishlists.
          </h3>
        </div>
        <button className="flex items-center min-w-43.5 h-13 gap-2.5 px-5 py-2.5 font-medium bg-button-primary text-white rounded-sm hover:bg-opacity-90 transition-colors cursor-pointer">
          <Plus className="w-6 h-6" />
          Create New List
        </button>
      </div>

      <div className="space-y-5">
        <div className="bg-white border border-border-primary rounded-lg px-5 min-h-16 flex w-full items-center">
          <button className="flex gap-x-2.5 items-center text-text-secondary">
            <Plus className="w-6 h-6" />
            Add All To Cart
          </button>
        </div>

        {isLoading && <p className="text-text-secondary">Loading wishlist...</p>}
        {isError && <p className="text-red-500">Failed to load wishlist</p>}

        {data?.sellers.map((seller) => (
          <CartContent key={seller.sellerId} seller={seller.sellerName} products={seller?.products} type="wishlist" />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
