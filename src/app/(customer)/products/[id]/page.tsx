"use client";
import React, { useState } from "react";
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
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSingleProduct } from "@/hooks/productHooks";
import { useAddToCart } from "@/hooks/cartHooks";
import { useAddToWishlist, useGetAllLists } from "@/hooks/wishlistHooks";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

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

      addToCart(
        cartEntries,
        {
          onSuccess: () => {
            toast.success(`Added ${quantity} item(s) to cart successfully!`);
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to add to cart");
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
            toast.error(error?.response?.data?.message || "Failed to add to wishlist");
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
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-background-secondary animate-pulse rounded-lg" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-background-secondary animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
          
          {/* Content Skeleton */}
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
      <div className="container mx-auto px-4 py-8">
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square relative bg-background-secondary rounded-lg overflow-hidden">
            <Image
              src={product.productImages?.[selectedImageIndex] || product.productImageStrings?.[selectedImageIndex] || "/placeholder-product.jpg"}
              alt={product.title}
              fill
              className="object-cover"
            />
            
            {/* Stock Badge */}
            <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full ${
              parseInt(product.quantity) === 0 
                ? "bg-danger-secondary text-danger-primary border border-danger-border" 
                : parseInt(product.quantity) <= 10 
                ? "bg-warning-secondary text-warning-primary border border-warning-border"
                : "bg-success-secondary text-success-primary"
            }`}>
              {getStockStatus()}
            </div>
          </div>

          {/* Thumbnail Images */}
          {(product.productImages?.length > 1 || product.productImageStrings?.length > 1) && (
            <div className="grid grid-cols-4 gap-2">
              {(product.productImages || product.productImageStrings || []).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square relative bg-background-secondary rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index 
                      ? "border-text-quaternary" 
                      : "border-border-primary hover:border-text-secondary"
                  }`}
                >
                  <Image
                    src={image || "/placeholder-product.jpg"}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
              {product.sku && (
                <span className="text-xs text-text-secondary">SKU: {product.sku}</span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-text-secondary">(4.0) • 24 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-text-primary">
                {formatPrice(product.price)}
              </span>
              {product.salePrice && (
                <span className="text-lg text-text-secondary line-through">
                  {formatPrice(product.salePrice)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              <span className={`text-sm font-medium ${getStockStatusColor()}`}>
                {getStockStatus()}
              </span>
              <span className="text-text-secondary">•</span>
              <span className="text-sm text-text-secondary">
                {product.quantity} left in stock
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            {product.brand && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-text-primary">Brand:</span>
                <span className="text-text-secondary">{product.brand}</span>
              </div>
            )}
            
            {product.model && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-text-primary">Model:</span>
                <span className="text-text-secondary">{product.model}</span>
              </div>
            )}

            {(product.color || product.colour) && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-text-primary">Color:</span>
                <span className="text-text-secondary">{product.color || product.colour}</span>
              </div>
            )}

            {product.storage && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-text-primary">Storage:</span>
                <span className="text-text-secondary">{product.storage}</span>
              </div>
            )}

            {product.ram && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-text-primary">RAM:</span>
                <span className="text-text-secondary">{product.ram}</span>
              </div>
            )}
          </div>

          {/* Quantity Selector & Actions */}
          <div className="space-y-4">
            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-medium text-text-primary">Quantity:</span>
              <div className="flex items-center border border-border-primary rounded-lg">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-background-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  disabled={!product || quantity >= parseInt(product.quantity)}
                  className="p-2 hover:bg-background-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={parseInt(product.quantity) === 0 || isCartLoading}
                className="flex-1 bg-button-primary hover:bg-button-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {isCartLoading ? "Adding..." : parseInt(product.quantity) === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              
              <Button
                onClick={handleAddToWishlist}
                disabled={isWishlistLoading}
                variant="outline"
                className="px-4 py-3 border-border-primary hover:border-text-quaternary hover:text-text-quaternary transition-all duration-200"
              >
                <Heart className={`w-5 h-5 ${isWishlistLoading ? "animate-pulse" : ""}`} />
              </Button>

              <Button
                variant="outline"
                className="px-4 py-3 border-border-primary hover:border-text-quaternary hover:text-text-quaternary transition-all duration-200"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border-primary">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-text-quaternary" />
              <div>
                <p className="font-medium text-text-primary text-sm">Free Shipping</p>
                <p className="text-xs text-text-secondary">On orders over $50</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-text-quaternary" />
              <div>
                <p className="font-medium text-text-primary text-sm">Warranty</p>
                <p className="text-xs text-text-secondary">1 year protection</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-text-quaternary" />
              <div>
                <p className="font-medium text-text-primary text-sm">Easy Returns</p>
                <p className="text-xs text-text-secondary">30 day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description & Specifications */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Description */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Description</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-text-secondary leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success-primary mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Specifications */}
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-4">Specifications</h2>
          <div className="bg-background-primary rounded-lg border border-border-primary p-6">
            <div className="space-y-3">
              {product.specifications && product.specifications.length > 0 ? (
                product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border-primary last:border-b-0">
                    <span className="font-medium text-text-primary text-sm">{spec}</span>
                  </div>
                ))
              ) : (
                <p className="text-text-secondary text-sm">No specifications available</p>
              )}
            </div>
          </div>

          {/* Seller Information */}
          <div className="mt-6 bg-background-primary rounded-lg border border-border-primary p-6">
            <h3 className="font-semibold text-text-primary mb-3">Seller Information</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium text-text-primary">Store:</span>
                <span className="text-text-secondary ml-2">Premium Electronics</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-text-primary">Rating:</span>
                <span className="text-text-secondary ml-2">4.8/5 (1,234 reviews)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;