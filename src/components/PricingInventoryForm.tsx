"use client";
import React from "react";

const PricingInventoryForm = () => {
  return (
    <div className="space-y-6.5 bg-background-primary p-6 rounded-sm border border-border-primary">
      <h2 className="text-2xl font-medium">Pricing & Inventory</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xl font-medium 2.5">
              Price ($) <span className="text-danger-primary">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="w-full px-5 py-2.5 text-base border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
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
              className="w-full px-5 py-2.5 text-base border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
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
              className="w-full px-5 py-2.5 text-base border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xl font-medium mb-2.5">
              SKU
            </label>
            <input
              type="text"
              placeholder="Enter SKU"
              className="w-full px-5 py-2.5 text-base border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingInventoryForm; 