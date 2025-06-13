import React from 'react';
import { Tag, X } from 'lucide-react';

interface OrderSummaryProps {
  promoCode: string;
  setPromoCode: (value: string) => void;
}

export default function OrderSummary({ promoCode, setPromoCode }: OrderSummaryProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-text-primary">Promo Code</h3>
      <div className="flex">
        <div className="flex-1 relative">
          <Tag size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Enter a promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full pl-10 pr-3 border border-border-primary rounded-sm outline-none"
          />
        </div>
        <button className="bg-button-primary text-white font-medium rounded-sm">
          Apply
        </button>
      </div>

      <h3 className="text-lg font-semibold text-text-primary">Order Summary</h3>
      <div>
        {[1, 2, 3, 4].map((item, index) => (
          <div key={index} className="flex items-center bg-gray-100 rounded-sm">
            <div className="w-16 h-16 bg-gray-300 rounded-sm"></div>
            <div className="flex-1">
              <h4 className="font-medium text-text-primary">Wireless Noise-Cancelling Headphones</h4>
              <p className="text-sm text-text-secondary">Black | Premium Edition</p>
              <p className="font-semibold text-text-primary">$249.99</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary">Quantity: 1</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">Subtotal</span>
          <span className="text-text-primary">$809.96</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Shipping</span>
          <span className="text-text-primary">$64.80</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Tax</span>
          <span className="text-text-primary">$12.99</span>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span className="text-text-primary">Total</span>
          <span className="text-text-primary">$887.75</span>
        </div>
      </div>

      <div className="flex">
        <button className="flex items-center border border-border-primary text-text-secondary rounded-sm">
          <X size={16} />
          Cancel
        </button>
        <button className="flex-1 bg-button-primary text-white font-medium rounded-sm">
          Place Order
        </button>
      </div>
    </div>
  );
}
