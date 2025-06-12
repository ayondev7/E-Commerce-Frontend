import React, { useState } from "react";
import { Store, Minus, Plus, Trash2 } from "lucide-react";

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
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-2 border-gray-300"
          />
          <Store className="w-6 h-6 text-gray-600" />
          <span className="text-gray-600 text-lg font-medium">
            Tech Gadget Store
          </span>
        </div>

        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-2 border-gray-300"
              />

              <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{item.variant}</p>
                <p className="text-xl font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="text-lg font-medium min-w-[2rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartContent;
