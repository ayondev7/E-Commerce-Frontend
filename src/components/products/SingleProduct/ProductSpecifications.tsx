"use client";
import React from "react";

type Props = {
  product: any;
};

const ProductSpecifications: React.FC<Props> = ({ product }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-4">Specifications</h2>
      <div className="bg-background-primary rounded-lg border border-border-primary p-6">
        <div className="space-y-3">
          {product.specifications && product.specifications.length > 0 ? (
            product.specifications.map((spec: any, index: number) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-border-primary last:border-b-0">
                <span className="font-medium text-text-primary text-sm">{spec}</span>
              </div>
            ))
          ) : (
            <p className="text-text-secondary text-sm">No specifications available</p>
          )}
        </div>
      </div>

      <div className="mt-6 bg-background-primary rounded-lg border border-border-primary p-6">
        <h3 className="font-semibold text-text-primary mb-3">Seller Information</h3>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium text-text-primary">Store:</span>
            <span className="text-text-secondary ml-2">Premium Electronics</span>
          </p>
          <p className="text-sm">
            <span className="font-medium text-text-primary">Rating:</span>
            <span className="text-text-secondary ml-2">4.8/5 (1,234 reviews)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecifications;
