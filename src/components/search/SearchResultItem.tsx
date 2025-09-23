"use client";
import React from "react";
import { PlusIcon } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  image: string | null;
  model: string;
  colour: string;
  price: number;
}

interface SearchResultItemProps {
  item: Product;
  userType: string | null;
  wishlistLoading: boolean;
  onAddToWishlist: (productId: string, e: React.MouseEvent) => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  item,
  userType,
  wishlistLoading,
  onAddToWishlist,
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
        {item.image ? (
          <img
            src={item?.image ?? "/placeholder-product.jpg"}
            alt={item?.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}
      </div>

      <div className="flex-1">
        <div className="w-full flex gap-x-2.5 justify-between items-center">
          <h3 className="text-xl font-medium text-text-primary">
            {item.title}
          </h3>
        </div>
        <p className="text-text-secondary text-base mb-2.5">
          {item?.model || item?.colour || ""}
        </p>
        <div className="flex justify-between gap-x-2.5 w-full items-center">
          <p className="text-xl font-medium text-text-primary">
            ${(item.price ?? 0).toFixed(2)}
          </p>
          <div>
            {userType !== "seller" && (
              <button
                onClick={(e) => onAddToWishlist(item._id, e)}
                disabled={wishlistLoading}
                className="flex items-center md:min-h-12 justify-center gap-x-2.5 px-2 md:px-4 py-1 md:py-2 text-white font-medium text-base rounded-sm bg-button-primary hover:cursor-pointer"
              >
                <PlusIcon className="w-6 h-6" />
                <span className="text-sm font-medium hidden md:block">
                  {wishlistLoading ? "Adding..." : "Add to Wishlist"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;