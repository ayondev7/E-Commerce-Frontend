"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Minus,
  Plus,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSingleProduct } from "@/hooks/productHooks";
import { useAddToCart } from "@/hooks/cartHooks";
import { useAddToWishlist, useGetAllLists } from "@/hooks/wishlistHooks";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import ProductGallery from "@/components/products/SingleProduct/ProductGallery";
import ProductInfo from "@/components/products/SingleProduct/ProductInfo";
import ProductDescription from "@/components/products/SingleProduct/ProductDescription";
import ProductSpecifications from "@/components/products/SingleProduct/ProductSpecifications";

const SingleProductPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const { data: product, isLoading, isError } = useSingleProduct(productId);
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addToWishlist } = useAddToWishlist();
  const { data: wishlistsData } = useGetAllLists();

  const handleAddToCart = async () => {
    if (!product || quantity <= 0) return;

    if (parseInt(product.quantity) === 0) {
      toast.error("Product is out of stock");
      return;
    }

    if (quantity > parseInt(product.quantity)) {
      toast.error(`Only ${product.quantity} items available`);
      return;
    }

    setIsCartLoading(true);

    try {
      const defaultWishlistId = wishlistsData?.wishlists?.[0]?._id;

      if (!defaultWishlistId) {
        toast.error("Please create a wishlist first");
        return;
      }

      // Add multiple items to cart based on quantity
      const cartEntries = Array.from({ length: quantity }, () => ({
        wishlistId: defaultWishlistId,
        productId: productId,
      }));

      addToCart(cartEntries, {
        onSuccess: () => {
          toast.success(`Added ${quantity} item(s) to cart successfully!`);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to add to cart"
          );
        },
        onSettled: () => {
          setIsCartLoading(false);
        },
      });
    } catch (error) {
      toast.error("Failed to add to cart");
      setIsCartLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;

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
          productId: productId,
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

  const incrementQuantity = () => {
    if (product && quantity < parseInt(product.quantity)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(numPrice);
  };

  const getStockStatus = () => {
    if (!product) return "Unknown";
    const qty = parseInt(product.quantity);
    if (qty === 0) return "Out of Stock";
    if (qty <= 10) return "Low Stock";
    return "In Stock";
  };

  const getStockStatusColor = () => {
    if (!product) return "text-text-secondary";
    const qty = parseInt(product.quantity);
    if (qty === 0) return "text-danger-primary";
    if (qty <= 10) return "text-warning-primary";
    return "text-success-primary";
  };

  const getImageSrc = (index: number) => {
    const src =
      product?.productImageStrings?.[index] ??
      product?.productImages?.[index] ??
      "/placeholder-product.jpg";
    return src as unknown as string;
  };

  if (isLoading) {
    return (
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className=" bg-background-secondary animate-pulse rounded-lg" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className=" bg-background-secondary animate-pulse rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-8 bg-background-secondary animate-pulse rounded" />
            <div className="h-6 bg-background-secondary animate-pulse rounded w-3/4" />
            <div className="h-12 bg-background-secondary animate-pulse rounded" />
            <div className="h-20 bg-background-secondary animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-danger-primary mb-4">
            Product Not Found
          </h1>
          <p className="text-text-secondary mb-4">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.back()} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-hidden">
      <div className="flex justify-start gap-x-10">
        <ProductGallery
          product={product}
          selectedImageIndex={selectedImageIndex}
          setSelectedImageIndex={setSelectedImageIndex}
          getImageSrc={getImageSrc}
          getStockStatus={getStockStatus}
          getStockStatusColor={getStockStatusColor}
        />

        <ProductInfo
          product={product}
          quantity={quantity}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          handleAddToCart={handleAddToCart}
          handleAddToWishlist={handleAddToWishlist}
          isCartLoading={isCartLoading}
          isWishlistLoading={isWishlistLoading}
          formatPrice={formatPrice}
          getStockStatus={getStockStatus}
          getStockStatusColor={getStockStatusColor}
        />

        <ProductDescription product={product} />
      </div>
    </div>
  );
};

export default SingleProductPage;
