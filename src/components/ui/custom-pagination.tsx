"use client";
import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = totalPages > 1 ? getPageNumbers() : [];

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("flex justify-center items-center space-x-2", className)}
    >
      
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200",
          currentPage === 1
            ? "bg-background-secondary text-text-secondary border-border-primary cursor-not-allowed opacity-50"
            : "bg-background-primary text-text-primary border-border-primary hover:bg-background-hover hover:border-text-quaternary hover:text-text-quaternary"
        )}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:block">Previous</span>
      </button>

      
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="flex items-center justify-center w-9 h-9 text-text-secondary">
                <MoreHorizontal className="w-4 h-4" />
              </span>
            ) : (
              <button
                onClick={() => handlePageClick(page)}
                className={cn(
                  "w-9 h-9 text-sm font-medium rounded-lg border transition-all duration-200",
                  currentPage === page
                    ? "bg-button-primary text-white border-button-primary shadow-md"
                    : "bg-background-primary text-text-primary border-border-primary hover:bg-background-hover hover:border-text-quaternary hover:text-text-quaternary"
                )}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200",
          currentPage === totalPages
            ? "bg-background-secondary text-text-secondary border-border-primary cursor-not-allowed opacity-50"
            : "bg-background-primary text-text-primary border-border-primary hover:bg-background-hover hover:border-text-quaternary hover:text-text-quaternary"
        )}
        aria-label="Go to next page"
      >
        <span className="hidden sm:block">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

export default CustomPagination;