import React from "react";
import Navbar from "@/components/navigation/Navbar";
import SearchBar from "@/components/navigation/SearchBar";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background-primary flex flex-col overflow-hidden">
      <div>
        <Navbar />
      </div>
      <main className="bg-background-secondary px-4 md:px-8 lg:px-18 py-6">
        {children}
      </main>
    </div>
  );
};

export default CartLayout;
