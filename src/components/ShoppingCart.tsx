"use client";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import CartContent from "./CartContent";
import CartOrderSummary from "./CartOrderSummary";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetCart } from "@/hooks/cartHooks";
import { WishlistGroup } from "@/types/wishlistTypes";
import { useCartStore } from "@/store/cartStore";

const ShoppingCart: React.FC = () => {
  const [promoCode, setPromoCode] = useState<string>("");
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const { data, isLoading, isError } = useGetCart();
  const hydrateCart = useCartStore((state) => state.hydrateCart);
  const cartItems = useCartStore((state) => state.getAll());

  useEffect(() => {
    if (data?.lists) {
      const items = data.lists.flatMap((list: WishlistGroup) =>
        list?.products.map((product) => ({
          productId: product._id,
          quantity: product?.quantity ?? 1,
          price: product.price ?? 0,
        }))
      );
      hydrateCart(items);
    }
  }, [data, hydrateCart]);

  const handleApplyPromo = () => {
    console.log("Applying promo code:", promoCode);
  };

  if (isLoading) return <p className="text-text-secondary">Loading cart...</p>;
  if (isError || !data) return <p className="text-red-500">Failed to load shopping cart</p>;

  return (
    <div>
      <div className="mb-10 space-y-1">
        <h1 className="text-3xl font-semibold">Shopping Cart</h1>
        <h3 className="text-text-secondary text-base">
          You have {data?.productsCount || 0} items in your cart.
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-x-10">
        <div className="space-y-5">
          <div className="flex min-h-16 justify-between w-full items-center px-5 bg-white border-1 border-border-primary rounded-lg">
            <div className="flex items-center gap-x-2.5 text-text-secondary text-base">
              <Checkbox
                checked={selectAll}
                onCheckedChange={(checked) => {
                  setSelectAll(!!checked);
                  const allIds = data.lists.flatMap((list: WishlistGroup) =>
                    list.products.map((p) => p._id)
                  );
                  checked
                    ? useCartStore.getState().selectMultiple(allIds)
                    : useCartStore.getState().deselectAll();
                }}
              />
              Select All ({data.productsCount || 0})
            </div>
            <button className="flex items-center gap-x-2.5 text-button-primary text-base">
              <Trash2 className="w-6 h-6" />
              Delete
            </button>
          </div>

          {data.lists.map((list: WishlistGroup) => (
            <CartContent key={list._id} list={list} type="cart" />
          ))}
        </div>

        <div>
          <CartOrderSummary
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            handleApplyPromo={handleApplyPromo}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
