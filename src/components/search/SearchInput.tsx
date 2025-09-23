"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SEARCH_CATEGORIES } from "@/constants/searchConstants";

interface SearchInputProps {
  category: string | undefined;
  setCategory: (category: string | undefined) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  category,
  setCategory,
  keyword,
  setKeyword,
}) => {
  return (
    <div className="flex-1 relative lg:w-[500px] flex items-center border border-text-secondary rounded-lg">
      <Select onValueChange={setCategory}>
        <SelectTrigger className="w-[145px] hidden md:flex min-h-13 space-x-2.5 [&>svg]:w-6 [&>svg]:h-6 text-text-secondary border-0 rounded-none rounded-l-lg text-base focus:ring-0 focus:ring-offset-0 [&[data-state=open]>svg]:rotate-180">
          <SelectValue
            placeholder="Categories"
            className="text-base text-text-secondary"
          />
        </SelectTrigger>
        <SelectContent className="z-[100] text-base text-text-secondary bg-white border-text-secondary">
          {SEARCH_CATEGORIES.map((category) => (
            <SelectItem
              key={category.value}
              value={category.value}
              className="text-base hover:bg-background-hover hover:text-text-primary cursor-pointer"
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="h-8 w-px bg-border-primary" />

      <div className="flex-1 flex items-center min-h-13">
        <Search className="h-6 w-6 text-text-secondary ml-3 hidden md:block" />
        <Input
          type="text"
          placeholder="Search by product, brand, or keyword"
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none rounded-r-lg text-base"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchInput;