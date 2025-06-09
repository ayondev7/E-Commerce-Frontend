import React from "react";
import SalesAnalyticsCard from "../SalesAnalyticsCard";
import OrderStatus from "../OrderStatus";
import { AlertCircle } from "lucide-react";
import RevenueChart from "../RevenueChart";

const Overview = () => {
  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, John Doe!</h1>
        <p className="text-lg text-text-primary">
          You've made{" "}
          <span className="text-text-primary font-bold">$2,450</span> today.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-y-4 gap-x-6 my-6">
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

      <div className=" bg-background-primary my-10 p-4 rounded-lg border border-border-primary shadow-sm">
        <h2 className="text-lg font-bold">Order Status</h2>
        <div className="grid grid-cols-4 gap-4 my-3">
          <OrderStatus status="pending" count={10} />
          <OrderStatus status="shipped" count={10} />
          <OrderStatus status="delivered" count={10} />
          <OrderStatus status="cancelled" count={10} />
        </div>
      </div>

      <div className="my-10">
        <RevenueChart />
      </div>

      <div className="bg-warning-secondary border border-[#FCCF9C] rounded-lg px-10 py-6 mb-6 flex items-center gap-3">
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
    </div>
  );
};

export default Overview;
