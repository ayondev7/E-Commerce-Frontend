"use client";
import React from "react";
import Image from "next/image";

type Props = {
  product: any;
  selectedImageIndex: number;
  setSelectedImageIndex: (i: number) => void;
  getImageSrc: (i: number) => string;
  getStockStatus: () => string;
  getStockStatusColor: () => string;
};

const ProductGallery: React.FC<Props> = ({
  product,
  selectedImageIndex,
  setSelectedImageIndex,
  getImageSrc,
  getStockStatus,
  getStockStatusColor,
}) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square relative bg-background-secondary rounded-lg overflow-hidden">
        <Image
          src={getImageSrc(selectedImageIndex)}
          alt={product.title}
          fill
          className="object-cover"
        />

        <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full ${
          parseInt(product.quantity) === 0
            ? "bg-danger-secondary text-danger-primary border border-danger-border"
            : parseInt(product.quantity) <= 10
            ? "bg-warning-secondary text-warning-primary border border-warning-border"
            : "bg-success-secondary text-success-primary"
        }`}>
          {getStockStatus()}
        </div>
      </div>

      {(product.productImageStrings?.length || product.productImages?.length || 0) > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {(product.productImageStrings || product.productImages || []).map((image: any, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`aspect-square relative bg-background-secondary rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImageIndex === index
                  ? "border-text-quaternary"
                  : "border-border-primary hover:border-text-secondary"
              }`}
            >
              <Image
                src={getImageSrc(index)}
                alt={`${product.title} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
