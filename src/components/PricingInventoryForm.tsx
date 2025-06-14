"use client";
import React, { useEffect, useState } from "react";

interface PricingInventoryFormProps {
  initialData?: {
    price?: number;
    salePrice?: number;
    quantity?: number;
    sku?: string;
  };
}

const PricingInventoryForm = ({ initialData }: PricingInventoryFormProps) => {
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sku, setSku] = useState("");

  useEffect(() => {
    if (initialData) {
      if (initialData.price !== undefined) setPrice(initialData.price.toString());
      if (initialData.salePrice !== undefined) setSalePrice(initialData.salePrice.toString());
      if (initialData.quantity !== undefined) setQuantity(initialData.quantity.toString());
      if (initialData.sku !== undefined) setSku(initialData.sku);
    }
  }, [initialData]);

  return (
    <div className="space-y-6.5 bg-background-primary p-6 rounded-lg border border-border-primary">
      <h2 className="text-2xl font-medium">Pricing & Inventory</h2>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xl font-medium mb-2.5">
              Price ($) <span className="text-danger-primary">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-5 py-2.5 text-base border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xl font-medium mb-2.5">
              Sale Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="w-full px-5 py-2.5 text-base border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xl font-medium mb-2.5">
              Quantity <span className="text-danger-primary">*</span>
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-5 py-2.5 text-base border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xl font-medium mb-2.5">
              SKU
            </label>
            <input
              type="text"
              placeholder="Enter SKU"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full px-5 py-2.5 text-base border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingInventoryForm;
