"use client";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import CartContent from "./CartContent";
import { useGetWishlist, useCreateWishlist } from "@/hooks/wishlistHooks";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAddToCart } from "@/hooks/cartHooks";
import toast from "react-hot-toast";
import { WishlistGroup } from "@/types/wishlistTypes";

const Wishlist = () => {
  const { data, isLoading, isError } = useGetWishlist();
  const { getSelected, deselectAll, getSelectedByWishlist } = useWishlistStore();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: createList, isPending: creating } = useCreateWishlist();

  const selectedIds = getSelected();
  const hasSelected = selectedIds.length > 0;

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");

  const handleAddToCart = () => {
    if (!hasSelected) return;

   
    const selectedByWishlist = getSelectedByWishlist(data?.lists || []);
    
    
    const cartEntries = selectedByWishlist.map(group => ({
      wishlistId: group.wishlistId,
      productId: group.productIds
    }));

    addToCart(cartEntries, {
      onSuccess: () => {
        toast.success("Added to cart");
        setTimeout(() => {
          deselectAll();
        }, 2000);
      },
      onError: () => {
        toast.error("Failed to add to cart");
      },
    });
  };

  const handleCreateList = () => {
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    createList(title, {
      onSuccess: () => {
        toast.success("Wishlist created");
        setShowModal(false);
        setTitle("");
      },
      onError: () => {
        toast.error("Failed to create wishlist");
      },
    });
  };


  return (
    <div>
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Wishlist</h1>
          <h3 className="text-base text-text-secondary">
            Manage your saved items across multiple wishlists.
          </h3>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center min-w-43.5 h-13 gap-2.5 px-5 py-2.5 font-medium bg-button-primary text-white rounded-sm hover:bg-opacity-90 transition-colors cursor-pointer"
        >
          <Plus className="w-6 h-6" />
          Create New List
        </button>
      </div>

      <div className="space-y-5">
        <div className="bg-white border border-border-primary rounded-lg px-5 min-h-16 flex w-full items-center">
          <button
            className="flex gap-x-2.5 items-center text-text-secondary hover:cursor-pointer"
            onClick={handleAddToCart}
            disabled={!hasSelected}
          >
            <Plus className="w-6 h-6" />
            Add All To Cart
          </button>
        </div>

        {isLoading && (
          <p className="text-text-secondary">Loading wishlist...</p>
        )}
        {isError && <p className="text-red-500">Failed to load wishlist</p>}

        {data?.lists?.map((list: WishlistGroup) => (
          <CartContent
            key={list?._id}
            list={list}
            type="wishlist"
          />
        ))}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Create New Wishlist
            </h2>
            <input
              type="text"
              placeholder="Enter list title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-border-primary rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-sm border border-border-primary text-text-secondary hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateList}
                disabled={creating}
                className="px-4 py-2 rounded-sm bg-button-primary text-white hover:bg-opacity-90 transition disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;