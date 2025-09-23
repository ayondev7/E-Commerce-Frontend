"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchProducts } from "@/hooks/productHooks";
import { useAddToWishlist } from "@/hooks/wishlistHooks";
import { toast } from "react-hot-toast";
import WishListModal from "@/components/cart/WishListModal";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import SearchInput from "@/components/search/SearchInput";
import SearchDropdown from "@/components/search/SearchDropdown";

const SearchBar: React.FC<{}> = ({}) => {
  const { userType } = useUserStore();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading } = useSearchProducts(category, debouncedKeyword);

  const { mutate: addToWishlist, isPending: wishlistLoading } =
    useAddToWishlist();

  const handleAddWishlistClick = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const handleModalSelect = (wishlistId: string) => {
    if (!selectedProductId) return;
    addToWishlist(
      { wishlistId, productId: selectedProductId },
      {
        onSuccess: () => {
          toast.success("Added to wishlist", { position: "top-center" });
          setShowModal(false);
          setSelectedProductId(null);
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.error ||
            err?.response?.data?.message ||
            "Could not add to wishlist";
          toast.error(msg, { position: "top-center" });
        },
      }
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setShowDropdown(!!keyword.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="w-full px-4 md:px-8 lg:px-6">
      <div className="container h-full flex flex-col">
        <div className="w-full relative flex items-center gap-x-5">
          <SearchInput
            category={category}
            setCategory={setCategory}
            keyword={keyword}
            setKeyword={setKeyword}
          />

          {userType === "customer" && (
            <div className="flex gap-x-2.5">
              <Link className="text-decoration: none" href="/customer/wishlist">
                <div className="flex items-center px-2 lg:px-2 py-2 justify-center gap-x-2.5 text-base text-text-secondary hover:cursor-pointer">
                  <Heart className="w-6 h-6" />
                  <span className="hidden lg:block">Wishlist</span>
                </div>
              </Link>
              <Link className="text-decoration: none" href="/shopping-cart">
                <div className="flex items-center px-2 lg:px-2 py-2 gap-x-2.5 justify-center text-base text-text-secondary hover:cursor-pointer">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="hidden lg:block">Cart</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        <SearchDropdown
          showDropdown={showDropdown}
          data={data}
          dropdownRef={dropdownRef}
          userType={userType}
          wishlistLoading={wishlistLoading}
          onAddToWishlist={handleAddWishlistClick}
        />
      </div>

      <WishListModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleModalSelect}
      />
    </div>
  );
};

export default SearchBar;
