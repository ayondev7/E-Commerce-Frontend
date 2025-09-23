"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Share2, Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  product: any;
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  handleAddToCart: () => void;
  handleAddToWishlist: () => void;
  isCartLoading: boolean;
  isWishlistLoading: boolean;
  formatPrice: (p: string | number) => string;
  getStockStatus: () => string;
  getStockStatusColor: () => string;
};

const ProductInfo: React.FC<Props> = ({
  product,
  quantity,
  incrementQuantity,
  decrementQuantity,
  handleAddToCart,
  handleAddToWishlist,
  isCartLoading,
  isWishlistLoading,
  formatPrice,
  getStockStatus,
  getStockStatusColor,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          {product.sku && (
            <span className="text-xs text-text-secondary">SKU: {product.sku}</span>
          )}
        </div>

        <h1 className="text-3xl font-bold text-text-primary mb-2">{product.title}</h1>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-3xl font-bold text-text-primary">{formatPrice(product.price)}</span>
          {product.salePrice && product.salePrice !== product.price && (
            <span className="text-lg text-text-secondary line-through">{formatPrice(product.salePrice)}</span>
          )}
          {product.salePrice && product.salePrice < product.price && (
            <Badge variant="destructive" className="text-xs">
              Save {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className={`text-sm font-medium ${getStockStatusColor()}`}>{getStockStatus()}</span>
          <span className="text-text-secondary">•</span>
          <span className="text-sm text-text-secondary">{product.quantity} left in stock</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
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
            <span className="text-text-secondary">{product.storage}GB</span>
          </div>
        )}

        {product.ram && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-text-primary">RAM:</span>
            <span className="text-text-secondary">{product.ram}GB</span>
          </div>
        )}

        {product.conditions && product.conditions.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-text-primary">Condition:</span>
            <div className="flex gap-1">
              {product.conditions.map((condition: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {condition}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {product.negotiable !== undefined && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-text-primary">Negotiable:</span>
            <Badge 
              variant={product.negotiable ? "default" : "secondary"} 
              className="text-xs"
            >
              {product.negotiable ? "Yes" : "No"}
            </Badge>
          </div>
        )}
      </div>

      {/* Tags section - full width */}
      {product.tags && product.tags.length > 0 && (
        <div className="space-y-2">
          <span className="font-medium text-text-primary">Tags:</span>
          <div className="flex flex-wrap gap-1">
            {product.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}   

      {/* Quantity Selector */}
      <div className="space-y-3">
        <span className="font-medium text-text-primary">Quantity:</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border-primary rounded-lg">
            <Button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 disabled:opacity-50"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="px-4 py-2 text-text-primary font-medium min-w-[3rem] text-center">
              {quantity}
            </span>
            <Button
              onClick={incrementQuantity}
              disabled={quantity >= parseInt(product.quantity)}
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <span className="text-sm text-text-secondary">
            {parseInt(product.quantity)} available
          </span>
        </div>
      </div>   

        <div className="flex gap-3">
          <Button
            onClick={handleAddToCart}
            disabled={parseInt(product.quantity) === 0 || isCartLoading}
            className="flex-1 bg-button-primary hover:bg-button-primary/90 text-white font-medium py-5 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            {isCartLoading ? "Adding..." : parseInt(product.quantity) === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>

          <Button
            onClick={handleAddToWishlist}
            disabled={isWishlistLoading}
            variant="outline"
            className="px-6 py-5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Heart className={`w-5 h-5 ${isWishlistLoading ? "animate-pulse" : ""}`} />
          </Button>
        </div>
      
    </div>
  );
};

export default ProductInfo;
