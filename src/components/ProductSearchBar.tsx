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

const ProductSearchBar = () => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 relative flex bg-background-primary items-center border border-border-primary rounded-sm">
        <Search className="h-6 w-6 text-text-secondary ml-2" />
        <Input
          type="text"
          placeholder="Search by name or SKU"
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none rounded-r-sm text-base font-normal placeholder:text-text-secondary"
        />
      </div>

      <Select>
        <SelectTrigger className="w-[160px] px-5 text-text-primary focus:ring-0 focus:ring-offset-0 [&>svg]:text-text-primary [&[data-state=open]>svg]:rotate-180 rounded-sm border-border-primary">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent className="[&>div>div>span]:right-auto [&>div>div>span]:left-2">
          <SelectItem value="electronics" className="pl-7">Electronics</SelectItem>
          <SelectItem value="clothing" className="pl-7">Clothing</SelectItem>
          <SelectItem value="books" className="pl-7">Books</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[160px] px-5 text-text-primary focus:ring-0 focus:ring-offset-0 [&>svg]:text-text-primary [&[data-state=open]>svg]:rotate-180 rounded-sm border-border-primary">
          <SelectValue placeholder="Stock Status" />
        </SelectTrigger>
        <SelectContent className="[&>div>div>span]:right-auto [&>div>div>span]:left-2">
          <SelectItem value="active" className="pl-7">Active</SelectItem>
          <SelectItem value="low_stock" className="pl-7">Low Stock</SelectItem>
          <SelectItem value="out_of_stock" className="pl-7">Out of Stock</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductSearchBar; 