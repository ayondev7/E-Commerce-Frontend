"use client";
import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SORT_OPTIONS, PRICE_RANGES, CATEGORY_OPTIONS } from "@/constants/toolbarConstants";

type ProductsToolbarProps = {
  title?: string;
  sortBy: string;
  onSortByChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
  categories: string[];
  onToggleFilters: () => void;
};

const ProductsToolbar: React.FC<ProductsToolbarProps> = ({
  title = "Products",
  sortBy,
  onSortByChange,
  categoryFilter,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  categories,
  onToggleFilters,
}) => {
  return (
    <div className="container">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold text-text-primary">{title}</h1>

          <div className="hidden lg:flex items-center gap-4 ml-auto">
            <div>
              <label className="sr-only">Sort By</label>
              <Select value={sortBy} onValueChange={onSortByChange}>
                <SelectTrigger className="text-text-secondary border border-text-secondary text-base focus:ring-0 focus:ring-offset-0 space-x-3 [&>svg]:w-5 [&>svg]:h-5 [&[data-state=open]>svg]:rotate-180">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[100] text-base text-text-secondary bg-white border-text-secondary">
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-base hover:bg-background-hover hover:text-text-primary cursor-pointer"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="sr-only">Category</label>
              <Select value={categoryFilter} onValueChange={onCategoryChange}>
                <SelectTrigger className="text-text-secondary border border-text-secondary text-base focus:ring-0 focus:ring-offset-0 space-x-3 [&>svg]:w-5 [&>svg]:h-5 [&[data-state=open]>svg]:rotate-180">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[100] text-base text-text-secondary bg-white border-text-secondary">
                  {CATEGORY_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-base hover:bg-background-hover hover:text-text-primary cursor-pointer"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category.toLowerCase()}
                      className="text-base hover:bg-background-hover hover:text-text-primary cursor-pointer"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="sr-only">Price Range</label>
              <Select value={priceRange} onValueChange={onPriceRangeChange}>
                <SelectTrigger className="text-text-secondary border border-text-secondary text-base focus:ring-0 focus:ring-offset-0 space-x-3 [&>svg]:w-5 [&>svg]:h-5 [&[data-state=open]>svg]:rotate-180">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[100] text-base text-text-secondary bg-white border-text-secondary">
                  {PRICE_RANGES.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-base hover:bg-background-hover hover:text-text-primary cursor-pointer"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleFilters}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsToolbar;
