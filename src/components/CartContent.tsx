import React, { useState } from "react";
import { Store, Minus, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const CartContent = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Wireless Noise-Cancelling Headphones",
      variant: "Black | Premium Edition",
      price: 249.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Wireless Noise-Cancelling Headphones",
      variant: "Black | Premium Edition",
      price: 249.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    },
  ]);

  const updateQuantity = (id, change) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-sm border border-border-primary p-5">
        <div className="flex items-center gap-x-4 mb-5 pb-2.5 border-b border-border-primary">
          <Checkbox className="w-4.5 h-4.5 border-border-secondary border-2 rounded-[3px] shadow-none" />
          <Store className="w-5 h-5 text-text-secondary" />
          <span className="text-text-secondary text-base">
            Tech Gadget Store
          </span>
        </div>

        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <Checkbox className="w-4.5 h-4.5 border-border-secondary border-2 rounded-[3px] shadow-none" />

              <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="w-full flex gap-x-2.5 justify-between items-center">
                  <h3 className="text-xl font-medium text-text-primary">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => removeItem(item.id)}
                    className=" text-button-primary hover:cursor-pointer"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-text-secondary text-base mb-2.5">{item.variant}</p>
                <div className="flex items-start justify-between gap-x-2.5 w-full">
                  <p className="text-xl font-medium text-text-primary">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-x-4">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-text-primary" />
                    </button>
                    <span className="text-base text-text-primary font-medium text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-text-primary" />
                    </button>
                  </div>
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
