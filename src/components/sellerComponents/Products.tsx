"use client";
import React from "react";
import { Plus } from "lucide-react";
import ProductTable from "../ProductTable";
import ProductSearchBar from "../ProductSearchBar"; 

const Products = () => {
  const sampleProducts = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      name: "Premium Headphones",
      sku: "SKU123",
      price: 99.99,
      stock: 200,
      status: "active" as const,
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      name: "Smart Watch",
      sku: "SKU124",
      price: 199.99,
      stock: 10,
      status: "low_stock" as const,
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=200&fit=crop",
      name: "Wireless Earbuds",
      sku: "SKU125",
      price: 79.99,
      stock: 0,
      status: "out_of_stock" as const,
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
      name: "Running Shoes",
      sku: "SKU126",
      price: 129.99,
      stock: 150,
      status: "active" as const,
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop",
      name: "Leather Wallet",
      sku: "SKU127",
      price: 49.99,
      stock: 5,
      status: "low_stock" as const,
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop",
      name: "Backpack",
      sku: "SKU128",
      price: 89.99,
      stock: 75,
      status: "active" as const,
    },
    {
      id: "7",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      name: "Sunglasses",
      sku: "SKU129",
      price: 149.99,
      stock: 0,
      status: "out_of_stock" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Products</h1>
        <button className="flex items-center gap-2 px-5 py-[10px] bg-button-primary text-white rounded-sm hover:bg-opacity-90 transition-colors">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

     <div>
     <ProductSearchBar />
     </div>

      <ProductTable products={sampleProducts} />
    </div>
  );
};

export default Products;
