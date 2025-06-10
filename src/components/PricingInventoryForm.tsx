"use client";
import React from "react";

const PricingInventoryForm = () => {
  return (
    <div className="space-y-6 bg-background-primary p-6 rounded-sm border border-border-primary">
      <h2 className="text-xl font-semibold">Pricing & Inventory</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Price <span className="text-danger-primary">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="w-full px-3 py-1.5 text-sm border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Sale Price <span className="text-danger-primary">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="w-full px-3 py-1.5 text-sm border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Quantity <span className="text-danger-primary">*</span>
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              className="w-full px-3 py-1.5 text-sm border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              SKU <span className="text-danger-primary">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter SKU"
              className="w-full px-3 py-1.5 text-sm border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingInventoryForm; 