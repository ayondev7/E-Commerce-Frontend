import React from "react";
import { Tag, X } from "lucide-react";

interface OrderSummaryProps {
  promoCode: string;
  setPromoCode: (value: string) => void;
}

export default function OrderSummary({
  promoCode,
  setPromoCode,
}: OrderSummaryProps) {
  return (
    <div>
      <div className="bg-white mb-10 border border-border-primary rounded-sm p-6.5">
        <h3 className="text-xl font-medium text-text-primary mb-2.5">
          Promo Code
        </h3>
        <div className="flex gap-x-2.5">
          <div className="flex-1 relative min-h-13 items-center">
            <Tag className="absolute w-6 h-6 left-3 top-1/2 transform -translate-y-1/2 text-text-primary" />
            <input
              type="text"
              placeholder="Enter a promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full h-full pl-11.5 text-base text-text-primary placeholder:text-text-secondary pr-2.5 border border-border-primary rounded-sm outline-none"
            />
          </div>
          <button className="bg-button-primary text-white font-medium rounded-sm px-5 py-2.5 min-h-13 text-base flex justify-between items-center">
            Apply
          </button>
        </div>
      </div>

      <div className="bg-white rounded-sm border border-border-primary p-5">
        <h3 className="text-2xl font-semibold text-text-primary">
          Order Summary
        </h3>
        <div>
          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className="flex items-center border-b border-border-primary pb-5 mt-5 gap-x-2.5"
            >
              <div className="w-24 h-24 bg-gray-300 rounded-sm"></div>
              <div className="flex-1">
                <h4 className="font-medium text-xl text-text-primary mb-1">
                  Wireless Noise-Cancelling Headphones
                </h4>
                <p className="text-base text-text-secondary mb-1.5">
                  Black | Premium Edition
                </p>
                <div className="flex justify-between items-end">
                  <p className="font-medium text-xl text-text-primary">
                    $249.99
                  </p>
                  <p className="text-base font-medium text-text-secondary">
                    Quantity: 1
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pb-5 border-b border-border-primary space-y-2.5">
          <div className="flex justify-between">
            <span className="text-text-primary font-normal text-base">
              Subtotal
            </span>
            <span className="text-text-primary font-normal text-base">
              $809.96
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-primary font-normal text-base">
              Shipping
            </span>
            <span className="text-text-primary font-normal text-base">
              $64.80
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-primary font-normal text-base">Tax</span>
            <span className="text-text-primary font-normal text-base">
              $12.99
            </span>
          </div>
        </div>

        <div className="flex justify-between mt-5 mb-10 text-xl font-medium text-text-primary">
          <span>Total</span>
          <span>$887.75</span>
        </div>

        <div className="flex justify-between text-base font-medium">
          <button
            className="flex items-center min-w-42 min-h-13 justify-center rounded-sm border font-medium border-danger-border text-button-primary gap-x-1.5 px-5 py-2.5 cursor-pointer"
          >
            <X className="w-6 h-6" />
            Cancel Order
          </button>

          <button className="flex items-center min-w-42 min-h-13 justify-center rounded-sm border font-medium text-white bg-button-primary gap-x-1.5 px-5 py-2.5 cursor-pointer">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
