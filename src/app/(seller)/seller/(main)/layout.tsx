import React from "react";
import Navbar from "@/components/navigation/Navbar";
import SearchBar from "@/components/navigation/SearchBar";
import Sidebar from "@/components/navigation/Sidebar";

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background-primary flex flex-col overflow-hidden">
      <div>
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 bg-background-secondary pr-4 pl-4 md:pl-5 py-6 md:pr-8 lg:pr-14 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
