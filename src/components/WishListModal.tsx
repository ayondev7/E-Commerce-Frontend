"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllLists } from "@/hooks/wishlistHooks";
import { WishlistDocument } from "@/types/wishlistTypes";

interface WishListModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (wishlistId: string) => void;
}

const WishListModal: React.FC<WishListModalProps> = ({ open, onClose, onSelect }) => {
  const [selectedList, setSelectedList] = useState<string>("");
  const { data, isLoading, isError } = useGetAllLists();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-text-primary mb-4">Select Wishlist</h2>

        <div className="mb-6">
          {isLoading ? (
            <div className="text-text-secondary">Loading...</div>
          ) : isError || !data?.wishlists.length ? (
            <div className="text-center py-4">
              <p className="text-text-secondary mb-2">You don't have any wishlists available.</p>
              <p className="text-text-secondary">Create a new list now...</p>
            </div>
          ) : (
            <>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Wishlist
              </label>
              <Select
                onValueChange={(value) => setSelectedList(value)}
                value={selectedList}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a wishlist" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-border-primary rounded-md">
                  {data.wishlists.map((list: WishlistDocument) => (
                    <SelectItem key={list?._id} value={list?._id}>
                      {list?.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-sm border border-border-primary text-text-secondary hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          {!isLoading && !isError && data?.wishlists.length > 0 && (
            <button
              disabled={!selectedList}
              onClick={() => {
                onSelect(selectedList);
                onClose();
              }}
              className="px-4 py-2 rounded-sm bg-button-primary text-white hover:bg-opacity-90 transition disabled:opacity-50"
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishListModal;