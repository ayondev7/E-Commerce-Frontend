"use client";
import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SearchBar = () => {
  return (
    <div className="w-full h-14 border-t border-b border-border-primary px-18 py-10">
      <div className="container h-full flex items-center">
        <div className="w-full relative flex items-center gap-x-6">
          <div className="flex-1 relative flex items-center border border-text-secondary rounded-md">
            <Select>
              <SelectTrigger className="w-[130px] text-text-secondary border-0 rounded-none rounded-l-md text-base focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Categories" className="text-base text-text-secondary" />
              </SelectTrigger>
              <SelectContent className="z-[100] text-base text-text-secondary bg-white">
                <SelectItem value="electronics" className="text-base hover:bg-background-hover hover:text-text-primary cursor-pointer">Electronics</SelectItem>
                <SelectItem value="clothing" className="text-base hover:bg-background-hover hover:text-text-primary cursor-pointer">Clothing</SelectItem>
                <SelectItem value="books" className="text-base hover:bg-background-hover hover:text-text-primary cursor-pointer">Books</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="h-6 w-px bg-border-primary" />
            
            <div className="flex-1 flex items-center">
              <Search className="h-4 w-4 text-text-secondary ml-3" />
              <Input
                type="text"
                placeholder="Search by product, brand, or keyword"
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none rounded-r-md text-base"
              />
            </div>
          </div>
          
          <button className="h-10 px-6 bg-button-primary text-white rounded-md hover:bg-opacity-90 transition-colors text-base">
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar 