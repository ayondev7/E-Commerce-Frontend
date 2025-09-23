"use client";
import React, { useState, useMemo } from "react";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import { useProducts } from "@/hooks/productHooks";
import ProductCard from "@/components/products/ProductCard";
import CustomPagination from "@/components/ui/custom-pagination";
import { SimplifiedProduct } from "@/types/productTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const PRODUCTS_PER_PAGE = 8;

const ProductsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, isError } = useProducts();

  
  const filteredAndSortedProducts = useMemo(() => {
    if (!data?.products) return [];

    let filtered = data.products;

    

    
    if (categoryFilter !== "all") {
      filtered = filtered.filter((product) => 
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    
    if (priceRange !== "all") {
      filtered = filtered.filter((product) => {
        switch (priceRange) {
          case "under-50":
            return product.price < 50;
          case "50-100":
            return product.price >= 50 && product.price <= 100;
          case "100-200":
            return product.price >= 100 && product.price <= 200;
          case "over-200":
            return product.price > 200;
          default:
            return true;
        }
      });
    }

    
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "newest":
        default:
          return 0; // Keep original order for newest
      }
    });

    return sorted;
  }, [data?.products, sortBy, categoryFilter, priceRange]);

  
  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  
  const categories = useMemo(() => {
    if (!data?.products) return [];
    const uniqueCategories = [...new Set(data.products.map(p => p.category))];
    return uniqueCategories;
  }, [data?.products]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSortBy("newest");
    setCategoryFilter("all");
    setPriceRange("all");
    setCurrentPage(1);
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-background-secondary">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-danger-primary mb-4">
              Error Loading Products
            </h1>
            <p className="text-text-secondary">
              Something went wrong while loading the products. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-secondary">
      
      <div className="bg-background-primary border-b border-border-primary">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-text-primary">Products</h1>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="flex items-center gap-2"
                >
                  {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                  {viewMode === "grid" ? "List" : "Grid"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 lg:hidden"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>

          
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:w-64 flex-shrink-0`}>
            <div className="bg-background-primary rounded-lg border border-border-primary p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-xs text-text-quaternary hover:text-text-quaternary"
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-6">
            
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Category
                  </label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Price Range
                  </label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-50">Under $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100-200">$100 - $200</SelectItem>
                      <SelectItem value="over-200">Over $200</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          
          <div className="flex-1">
            
            <div className="flex items-center justify-between mb-6">
              <p className="text-text-secondary">
                {isLoading 
                  ? "Loading products..." 
                  : `Showing ${startIndex + 1}-${Math.min(endIndex, filteredAndSortedProducts.length)} of ${filteredAndSortedProducts.length} products`
                }
              </p>
            </div>

            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-background-primary rounded-lg border border-border-primary overflow-hidden"
                  >
                    <div className="aspect-square bg-background-secondary animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-background-secondary rounded animate-pulse" />
                      <div className="h-4 bg-background-secondary rounded animate-pulse w-3/4" />
                      <div className="h-8 bg-background-secondary rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1"
              }`}>
                {paginatedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  No products found
                </h3>
                <p className="text-text-secondary mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button onClick={resetFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}

            
            {totalPages > 1 && (
              <div className="mt-12">
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;