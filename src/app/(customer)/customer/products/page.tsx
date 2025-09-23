"use client";
import React, { useState, useMemo } from "react";
import { useProducts } from "@/hooks/productHooks";
import CustomPagination from "@/components/ui/custom-pagination";
import ProductsToolbar from "@/components/products/listing/ProductsToolbar";
import MobileFilters from "@/components/products/listing/MobileFilters";
import ProductGrid from "@/components/products/listing/ProductGrid";

const PRODUCTS_PER_PAGE = 8;

const ProductsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, isError } = useProducts(
    currentPage,
    PRODUCTS_PER_PAGE,
    sortBy,
    categoryFilter,
    priceRange
  );

  const paginatedProducts = data?.products ?? [];
  const total = data?.total ?? 0;
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + paginatedProducts.length;

  const categories = useMemo(() => {
    if (data?.categories && data.categories.length > 0) return data.categories;
    return [];
  }, [data?.categories]);

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
      <div className="bg-background-secondary">
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
      
      <ProductsToolbar
        title="Products"
        sortBy={sortBy}
        onSortByChange={setSortBy}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        categories={categories}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      <div className="container">
        <div className="flex gap-6">
          
          <MobileFilters
            open={showFilters}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            categories={categories}
            onClearAll={resetFilters}
          />

          
          <ProductGrid
            products={paginatedProducts}
            isLoading={isLoading}
            startIndex={startIndex}
            endIndex={endIndex}
            total={total}
            onClearFilters={resetFilters}
          />
        </div>
        <div className="mt-12">
          <CustomPagination
            currentPage={currentPage}
            totalPages={Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE))}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;