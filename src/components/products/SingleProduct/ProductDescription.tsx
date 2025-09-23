"use client";
import React from "react";
import { Check } from "lucide-react";

type Props = {
  product: any;
};

const ProductDescription: React.FC<Props> = ({ product }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-4">Description</h2>
      <div className="prose prose-gray max-w-none">
        <p className="text-text-secondary leading-relaxed">{product.description}</p>
      </div>

      {product.features && product.features.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-text-primary mb-4">Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature: any, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success-primary mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
