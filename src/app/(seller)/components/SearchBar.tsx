import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SearchBar = () => {
  return (
    <div className="w-full h-14  border-t border-b border-border-primary px-18 py-10">
      <div className="container h-full flex items-center">
        <div className="w-full relative flex items-center gap-x-6">
          <div className="flex-1 relative flex items-center border border-text-secondary rounded-md ">
            <Select>
              <SelectTrigger className="h-10 w-[125px] border-0 focus:ring-0 focus:ring-offset-0 px-4 text-text-secondary">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent className="z-[20] relative bg-white border-text-secondary ">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="h-7 w-px bg-border-primary" />
            
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products, orders, customers..."
                className="w-full h-10 px-4 pl-10 border-0 focus:outline-none focus:ring-0"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          
          <button className="h-10 px-6 bg-button-primary text-white rounded-md hover:bg-opacity-90 transition-colors">
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar 