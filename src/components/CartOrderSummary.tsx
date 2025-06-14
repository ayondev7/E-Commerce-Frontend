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
    <div className="bg-white rounded-lg border border-border-primary p-5">
      <h2 className="text-2xl font-semibold text-text-primary mb-5">
        Order Summary
      </h2>

      <div className="space-y-2.5 mb-2.5">
        <div className="flex justify-between items-center text-text-primary text-base">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(1)}</span>
        </div>
        <div className="flex justify-between items-center text-text-primary text-base">
          <span>Shipping</span>
          <span>${shipping.toFixed(1)}</span>
        </div>
        <div className="flex justify-between items-center text-text-primary text-base">
          <span>Tax</span>
          <span>${tax.toFixed(1)}</span>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex gap-x-2.5">
          <div className="flex-1 relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-text-primary" />
            <input
              type="text"
              placeholder="Enter a promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full min-h-13 pl-11 pr-4 border border-border-primary rounded-md text-text-primary placeholder-text-secondary focus:outline-none"
            />
          </div>
          <button
            onClick={handleApplyPromo}
            className="px-5 py-2.5 rounded-sm text-white text-base font-medium bg-button-primary hover:cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>

      <hr className="bg-border-primary my-5" />

      <div className="flex justify-between items-center mb-5">
        <span className="text-base font-medium text-text-primary">Total</span>
        <span className="text-base font-medium text-text-primary">
          ${total.toFixed(1)}
        </span>
      </div>

      <div className="w-full flex justify-end">
        <button className="px-5 py-2.5 rounded-sm text-white text-base font-medium bg-button-primary hover:cursor-pointer">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartOrderSummary;
