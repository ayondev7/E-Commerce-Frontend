"use client";
import React, { useState } from "react";
import { Store, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SimplifiedProduct } from "@/types/productTypes";

type CartContentProps = {
  type: "cart" | "wishlist";
  products: SimplifiedProduct[];
  seller: string;
};

const CartContent: React.FC<CartContentProps> = ({ type, products,seller }) => {
  const [items, setItems] = useState(
    products.map((product) => ({
      ...product,
      quantity: 1,
    }))
  );

  const updateQuantity = (id: string, change: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg border border-border-primary p-5">
        <div className="flex items-center gap-x-4 mb-5 pb-2.5 border-b border-border-primary">
          <Checkbox className="w-4.5 h-4.5 border-border-secondary border-2 rounded-[3px] shadow-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-white data-[state=checked]:text-blue-500 [&_svg]:!w-3 [&_svg]:!h-3 [&_svg]:!stroke-5 hover:cursor-pointer" />
          <Store className="w-5 h-5 text-text-secondary" />
          <span className="text-text-secondary text-base">
            {seller}
          </span>
        </div>

        <div className="space-y-5">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-4">
              <Checkbox className="w-4.5 h-4.5 border-border-secondary hover:cursor-pointer border-2 rounded-[3px] shadow-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-white data-[state=checked]:text-blue-500 [&_svg]:!w-3 [&_svg]:!h-3 [&_svg]:!stroke-5" />

              <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                <img
                   src={`data:image/jpeg;base64,${item?.image}`}
                  alt={item?.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="w-full flex gap-x-2.5 justify-between items-center">
                  <h3 className="text-xl font-medium text-text-primary">
                    {item.title}
                  </h3>
                  <button
                    onClick={() => removeItem(item._id)}
                    className={`hover:cursor-pointer ${
                      type === "wishlist"
                        ? "text-text-secondary"
                        : "text-button-primary"
                    }`}
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-text-secondary text-base mb-2.5">
                  {item?.model} | {item?.colour}
                </p>
                <div
                  className={`flex justify-between gap-x-2.5 w-full ${
                    type === "wishlist" ? "items-center" : "items-start"
                  }`}
                >
                  <p className="text-xl font-medium text-text-primary">
                    ${item?.price.toFixed(2)}
                  </p>
                  {type === "cart" ? (
                    <div className="flex items-center gap-x-2">
                      <button
                        onClick={() => updateQuantity(item._id, -1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-text-primary" />
                      </button>
                      <span className="text-base min-w-6 text-text-primary font-medium text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-text-primary" />
                      </button>
                    </div>
                  ) : (
                    <button className="flex items-center min-h-12 min-w-39.5 justify-center gap-x-2.5 px-4 py-2 text-white font-medium text-base rounded-sm bg-button-primary hover:cursor-pointer">
                      <ShoppingCart className="w-6 h-6" />
                      <span className="text-sm font-medium">Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartContent;
