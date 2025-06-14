"use client";
import React from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductTable from "../ProductTable";
import OrderProductSearchBar from "../OrderProductSearchBar";
import { useProducts } from "@/hooks/productHooks";
import { SimplifiedProduct } from "@/types/productTypes";

const Products = () => {
  const router = useRouter();
  const { data, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Products</h1>
          <button 
            className="flex items-center min-w-43.5 min-h-13 gap-2.5 px-5 py-2.5 font-medium bg-button-primary text-white rounded-sm hover:bg-opacity-90 transition-colors cursor-pointer"
            disabled
          >
            <Plus className="w-6 h-6" />
            Add Product
          </button>
        </div>
        <div>
          <OrderProductSearchBar type="product" />
        </div>
        <div>Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Products</h1>
          <button 
            className="flex items-center min-w-43.5 min-h-13 gap-2.5 px-5 py-2.5 font-medium bg-button-primary text-white rounded-sm hover:bg-opacity-90 transition-colors cursor-pointer"
          >
            <Plus className="w-6 h-6" />
            Add Product
          </button>
        </div>
        <div>
          <OrderProductSearchBar type="product" />
        </div>
        <div className="text-red-500">Error loading products</div>
      </div>
    );
  }

  const products: SimplifiedProduct[] = data?.products || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Products</h1>
        <button 
          onClick={() => router.push('/seller/add-product')}
          className="flex items-center min-w-43.5 min-h-13 gap-2.5 px-5 py-2.5 font-medium bg-button-primary text-white rounded-sm hover:bg-opacity-90 transition-colors cursor-pointer"
        >
          <Plus className="w-6 h-6" />
          Add Product
        </button>
      </div>

      <div>
        <OrderProductSearchBar type="product" />
      </div>

      <ProductTable products={products} />
    </div>
  );
};

export default Products;