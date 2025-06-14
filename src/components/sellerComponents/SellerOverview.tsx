import React from "react";
import SalesAnalyticsCard from "../SalesAnalyticsCard";
import OrderStatus from "../OrderStatus";
import { AlertCircle } from "lucide-react";
import RevenueChart from "../RevenueChart";
import Link from "next/link";

const SellerOverview = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold mb-2">Welcome back, John Doe!</h1>
        <p className="text-lg text-text-primary">
          You've made{" "}
          <span className="text-text-primary text-lg font-bold">$2,450</span> today.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-x-5 mt-5">
        <SalesAnalyticsCard
          title="Sales Today"
          currentValue={2450}
          previousValue={2000}
          period="today"
        />
        <SalesAnalyticsCard
          title="Sales This Week"
          currentValue={120}
          previousValue={100}
          period="today"
        />
        <SalesAnalyticsCard
          title="Sales This Month"
          currentValue={10}
          previousValue={8}
          period="today"
        />
      </div>

      <div className=" bg-background-primary my-10 px-3 py-5 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold mb-2.5">Order Status</h2>
        <div className="grid grid-cols-4 gap-x-5">
          <OrderStatus status="pending" count={10} />
          <OrderStatus status="shipped" count={10} />
          <OrderStatus status="delivered" count={10} />
          <OrderStatus status="cancelled" count={10} />
        </div>
      </div>

      <div className="my-10">
        <RevenueChart />
      </div>

      <div className="bg-warning-secondary border justify-between border-[#FCCF9C] rounded-lg pl-10.5 pr-4 py-4 mb-6 flex items-center gap-3">
        <div className="flex gap-x-2.5">
          <AlertCircle className="text-[#C77414] w-6 h-6" />
          <div>
            <span className="text-[#C77414]">
              You have 2 products running low.{" "}
            </span>
            <span className="text-[#C77414]">
              Restock now to avoid stockouts.
            </span>
          </div>
        </div>
        <Link href="/products">
          <button className="rounded-lg hover:cursor-pointer border min-w-31 min-h-10 flex justify-center font-medium items-center border-warning-border text-warning-primary px-4 py-2 bg-white">
            View Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SellerOverview;
