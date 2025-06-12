"use client";
import React, { useState } from "react";
import { Tag } from "lucide-react";

const CartOrderSummary: React.FC = () => {
  const [promoCode, setPromoCode] = useState<string>("");
  const [subtotal] = useState<number>(0.0);
  const [shipping] = useState<number>(0.0);
  const [tax] = useState<number>(0.0);
  const total = subtotal + shipping + tax;

  const handleApplyPromo = () => {
    console.log("Applying promo code:", promoCode);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-lg">Subtotal</span>
          <span className="text-gray-900 text-lg font-medium">
            ${subtotal.toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-lg">Shipping</span>
          <span className="text-gray-900 text-lg font-medium">
            ${shipping.toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-lg">Tax</span>
          <span className="text-gray-900 text-lg font-medium">
            ${tax.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter a promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleApplyPromo}
            className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      <div className="flex justify-between items-center mb-8">
        <span className="text-xl font-bold text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">
          ${total.toFixed(1)}
        </span>
      </div>

      <button className="w-full py-4 bg-red-500 text-white font-semibold text-lg rounded-lg hover:bg-red-600 transition-colors">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartOrderSummary;
