"use client";
import React from "react";
import SearchResultItem from "./SearchResultItem";

interface Product {
  _id: string;
  title: string;
  image: string | null;
  model: string;
  colour: string;
  price: number;
}

interface SearchDropdownProps {
  showDropdown: boolean;
  data: { products: Product[] } | undefined;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  userType: string | null;
  wishlistLoading: boolean;
  onAddToWishlist: (productId: string, e: React.MouseEvent) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  showDropdown,
  data,
  dropdownRef,
  userType,
  wishlistLoading,
  onAddToWishlist,
}) => {
  if (!showDropdown) return null;

  if (data?.products && data.products.length > 0) {
    return (
      <div
        ref={dropdownRef}
        className="mt-6 space-y-6 max-h-[500px] hide-scrollbar overflow-y-scroll border border-border-secondary rounded-lg p-5 z-20 top-14 bg-white w-full max-w-sm md:max-w-xl lg:max-w-[800px] absolute"
      >
        {data.products.map((item) => (
          <SearchResultItem
            key={item._id}
            item={item}
            userType={userType}
            wishlistLoading={wishlistLoading}
            onAddToWishlist={onAddToWishlist}
          />
        ))}
      </div>
    );
  }

  return (
    <p className="text-text-secondary text-center py-4 mt-6">
      No products found
    </p>
  );
};

export default SearchDropdown;