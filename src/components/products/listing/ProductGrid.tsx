"use client";
import React from "react";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";

type Product = {
  _id: string;
  title: string;
  price: number;
  category: string;
  // additional props are ignored by this component
};

type ProductGridProps = {
  products: Product[];
  isLoading?: boolean;
  startIndex: number;
  endIndex: number;
  total: number;
  onClearFilters?: () => void;
};

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  startIndex,
  endIndex,
  total,
  onClearFilters,
}) => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <p className="text-text-secondary">
          {isLoading
            ? "Loading products..."
            : `Showing ${startIndex + 1}-${Math.min(
                endIndex,
                total
              )} of ${total} products`}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-background-primary h-[344px] rounded-lg border border-border-primary overflow-hidden"
            >
              <div className=" bg-background-secondary animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-[200px] bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div
          className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3`}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product as any} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No products found
          </h3>
          <p className="text-text-secondary mb-4">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
          {onClearFilters && (
            <Button onClick={onClearFilters} variant="outline">
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
