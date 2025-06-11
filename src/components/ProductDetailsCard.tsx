import React from "react";

const ProductDetailsCard = () => {
  return (
    <div className="flex gap-x-5 border bg-white border-border-primary rounded-sm p-5 w-max max-w-full">
      <div className="max-w-29.5 max-h-29.5 rounded-sm overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
          alt="Product"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center mb-7 justify-between gap-x-10">
          <h2 className="text-xl font-medium">
            Over The Head Wireless Headphone
          </h2>
          <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-success-secondary text-success-primary">
            Active
          </span>
        </div>
        <div className="flex gap-x-10">
          {[
            { label: "Order ID", value: "12345" },
            { label: "Date", value: "Jun 11, 2025" },
            { label: "Quantity", value: "3" },
            { label: "Condition", value: "New" },
          ].map((item) => (
            <div className="flex flex-col gap-y-1.5" key={item.label}>
              <span className="text-text-secondary text-base">{item.label}</span>
              <span className="text-text-primary text-xl">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
