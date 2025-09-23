"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimplifiedProduct } from "@/types/productTypes";
import { useAddProductDirectToCart } from "@/hooks/cartHooks";
import { useAddToWishlist, useGetAllLists } from "@/hooks/wishlistHooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: SimplifiedProduct;
  onQuickView?: (product: SimplifiedProduct) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const router = useRouter();

  const { mutate: addToCart } = useAddProductDirectToCart();
  const { mutate: addToWishlist } = useAddToWishlist();
  const { data: wishlistsData } = useGetAllLists();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.quantity === 0) {
      toast.error("Product is out of stock");
      return;
    }

    setIsCartLoading(true);

    try {
      addToCart(
        {
          productId: product._id,
          quantity: 1,
        },
        {
          onSuccess: () => {
            toast.success("Added to cart successfully!");
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || "Failed to add to cart"
            );
          },
          onSettled: () => {
            setIsCartLoading(false);
          },
        }
      );
    } catch (error) {
      toast.error("Failed to add to cart");
      setIsCartLoading(false);
    }
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if product is already wishlisted
    if (product.isWishlisted) {
      toast.error("Product is already in your wishlist!");
      return;
    }

    setIsWishlistLoading(true);

    try {
      const defaultWishlistId = wishlistsData?.wishlists?.[0]?._id;

      if (!defaultWishlistId) {
        toast.error("Please create a wishlist first");
        return;
      }

      addToWishlist(
        {
          wishlistId: defaultWishlistId,
          productId: product._id,
        },
        {
          onSuccess: () => {
            toast.success("Added to wishlist successfully!");
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || "Failed to add to wishlist"
            );
          },
          onSettled: () => {
            setIsWishlistLoading(false);
          },
        }
      );
    } catch (error) {
      toast.error("Failed to add to wishlist");
      setIsWishlistLoading(false);
    }
  };

  const handleCardClick = () => {
    router.push(`/customer/products/${product._id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getStockStatus = () => {
    if (product.quantity === 0) return "Out of Stock";
    if (product.quantity <= 10) return "Low Stock";
    return "In Stock";
  };

  const getStockStatusColor = () => {
    if (product.quantity === 0) return "text-danger-primary";
    if (product.quantity <= 10) return "text-warning-primary";
    return "text-success-primary";
  };

  return (
    <div
      className="group relative bg-background-primary rounded-lg border border-border-primary shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      <div className="relative bg-background-secondary overflow-hidden">
        <Image
          src={product.image || "/placeholder-product.jpg"}
          alt={product.title}
          width={600}
          height={600}
          className="object-cover w-[400px] h-[300px] group-hover:scale-105 transition-transform duration-300"
        />

        <button
          onClick={handleAddToWishlist}
          disabled={isWishlistLoading}
          title={
            product.isWishlisted ? "Already in wishlist" : "Add to wishlist"
          }
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110 ${
            product.isWishlisted
              ? "bg-button-primary/90 hover:bg-button-primary"
              : "bg-background-primary/80 hover:bg-background-primary"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlistLoading
                ? "text-text-secondary animate-pulse"
                : product.isWishlisted
                ? "text-white fill-current"
                : "text-text-secondary hover:text-button-primary hover:fill-current"
            }`}
          />
        </button>

        <div
          className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full ${
            product.quantity === 0
              ? "bg-danger-secondary text-danger-primary border border-danger-border"
              : product.quantity <= 10
              ? "bg-warning-secondary text-warning-primary border border-warning-border"
              : "bg-success-secondary text-success-primary"
          }`}
        >
          {getStockStatus()}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="font-medium text-text-primary text-lg leading-tight mb-2 line-clamp-2 transition-colors">
            {product.title}
          </h3>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-1">
            {product.category}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-text-primary">
              {formatPrice(product.price)}
            </span>
          </div>
          <span className={`text-xs font-medium ${getStockStatusColor()}`}>
            {product.quantity} left
          </span>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={product.quantity === 0 || isCartLoading}
          className="w-full bg-button-primary hover:bg-button-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          {isCartLoading
            ? "Adding..."
            : product.quantity === 0
            ? "Out of Stock"
            : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
