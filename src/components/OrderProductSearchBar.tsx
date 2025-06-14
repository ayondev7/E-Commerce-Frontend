import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OrderProductSearchBarProps = {
  type: "product" | "order" | "customer";
};

const OrderProductSearchBar = ({ type }: OrderProductSearchBarProps) => {
  return (
    <div className={`flex ${type === "customer" ? "gap-x-5" : "gap-x-4"}`}>
      <div className="flex-1 relative min-h-13 flex bg-background-primary items-center border border-border-primary rounded-md">
        <Search className="h-6 w-6 text-text-secondary ml-2.5" />
        <Input
          type="text"
          placeholder={
            type === "product"
              ? "Search by name or SKU"
              : type === "order"
              ? "Search by order ID or customer name"
              : "Search by order id"
          }
          className="border-0 pl-2.5 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none rounded-r-md text-base font-normal placeholder:text-text-secondary"
        />
      </div>

      {type === "product" && (
        <>
          <Select>
            <SelectTrigger className="w-51 bg-white min-h-13 py-2.5 px-5 [&>svg]:w-6 [&>svg]:h-6 text-base text-text-primary focus:ring-0 focus:ring-offset-0 [&>svg]:text-text-primary [&[data-state=open]>svg]:rotate-180 rounded-md border-border-primary">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent className="[&>div>div>span]:right-auto [&>div>div>span]:left-2">
              <SelectItem value="electronics" className="pl-7 text-base">
                Electronics
              </SelectItem>
              <SelectItem value="clothing" className="pl-7 text-base">
                Clothing
              </SelectItem>
              <SelectItem value="books" className="pl-7 text-base">
                Books
              </SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-51 bg-white py-2.5 min-h-13 px-5 [&>svg]:w-6 [&>svg]:h-6 text-base text-text-primary focus:ring-0 focus:ring-offset-0 [&>svg]:text-text-primary [&[data-state=open]>svg]:rotate-180 rounded-md border-border-primary">
              <SelectValue placeholder="Stock Status" />
            </SelectTrigger>
            <SelectContent className="[&>div>div>span]:right-auto [&>div>div>span]:left-2">
              <SelectItem value="active" className="pl-7 text-base">
                Active
              </SelectItem>
              <SelectItem value="low_stock" className="pl-7 text-base">
                Low Stock
              </SelectItem>
              <SelectItem value="out_of_stock" className="pl-7 text-base">
                Out of Stock
              </SelectItem>
            </SelectContent>
          </Select>
        </>
      )}

      {type === "customer" && (
        <Select>
          <SelectTrigger className="w-51 text-base bg-white px-5 py-2.5 min-h-13 [&>svg]:w-6 [&>svg]:h-6 text-text-primary focus:ring-0 focus:ring-offset-0 [&>svg]:text-text-primary [&[data-state=open]>svg]:rotate-180 rounded-md border-border-primary">
            <SelectValue placeholder="Order Status" />
          </SelectTrigger>
          <SelectContent className="[&>div>div>span]:right-auto [&>div>div>span]:left-2">
            <SelectItem value="delivered" className="pl-8 text-base">
              Delivered
            </SelectItem>
            <SelectItem value="shipped" className="pl-8 text-base">
              Shipped
            </SelectItem>
            <SelectItem value="processing" className="pl-8 text-base">
              Processing
            </SelectItem>
            <SelectItem value="cancelled" className="pl-8 text-base">
              Cancelled
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default OrderProductSearchBar;
