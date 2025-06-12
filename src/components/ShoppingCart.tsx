"use client";
import React, { useState } from "react";
import { Tag, Trash2 } from "lucide-react";
import CartContent from "./CartContent";
import CartOrderSummary from "./CartOrderSummary";
import { Checkbox } from "@/components/ui/checkbox";

const ShoppingCart: React.FC = () => {
  const [promoCode, setPromoCode] = useState<string>("");
  const [subtotal] = useState<number>(0.0);
  const [shipping] = useState<number>(0.0);
  const [tax] = useState<number>(0.0);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const total = subtotal + shipping + tax;

  const handleApplyPromo = () => {
    console.log("Applying promo code:", promoCode);
  };

  return (
    <div>
      <div className="mb-10 space-y-1">
        <h1 className="text-3xl font-semibold">Shopping Cart</h1>
        <h3 className="text-text-secondary text-base">
          You have 4 items in your cart.
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-x-10">
        <div className="space-y-5">
          <div className="flex min-h-16 justify-between w-full items-center px-5 bg-white border-1 border-border-primary rounded-sm">
            <div className="flex items-center gap-x-2.5 text-text-secondary text-base">
              <Checkbox
                checked={selectAll}
                onCheckedChange={(checked) => setSelectAll(!!checked)}
                className="w-4.5 h-4.5 border-border-secondary border-2 rounded-[3px] shadow-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-white data-[state=checked]:text-blue-500 [&_svg]:!w-3 [&_svg]:!h-3 [&_svg]:!stroke-5 hover:cursor-pointer"
              />
              Select All (4 Items)
            </div>
            <button className="flex items-center gap-x-2.5 text-button-primary text-base">
              <Trash2 className="w-6 h-6" />
              Delete
            </button>
          </div>
          <CartContent type="cart" />
          <CartContent type="cart" />
        </div>

        <div>
          <CartOrderSummary
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            handleApplyPromo={handleApplyPromo}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
