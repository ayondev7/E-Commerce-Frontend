import React from "react";
import SalesAnalyticsCard from "../SalesAnalyticsCard";
import OrderStatus from "../OrderStatus";
import { AlertCircle, Package, Heart, Truck, Gift } from "lucide-react";
import RevenueChart from "../RevenueChart";
import Link from "next/link";
import CustomerOverviewCard from "../CustomerOverviewCard";

const CustomerOverview = () => {
  const cardData = [
    {
      title: "Total Orders",
      value: "24",
      icon: Package,
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Wishlist Items",
      value: "12",
      icon: Heart,
      iconBgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    {
      title: "Pending Deliveries",
      value: "3",
      icon: Truck,
      iconBgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Active Coupons",
      value: "5",
      icon: Gift,
      iconBgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div>
      <div>
        <h1 className="text-5xl font-semibold mb-5">Hi, Alex</h1>
        <h3 className="text-base text-right text-text-secondary mb-5">
          Last updated: Today, 10:30 AM
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-x-2.5">
        {cardData.map((card, index) => (
          <CustomerOverviewCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            iconBgColor={card.iconBgColor}
            iconColor={card.iconColor}
          />
        ))}
      </div>

      <div className="bg-background-primary my-10 p-4 rounded-lg border border-border-primary shadow-sm">
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
          <button className="rounded-sm hover:cursor-pointer border min-w-31 min-h-10 flex justify-center font-medium items-center border-warning-border text-warning-primary px-4 py-2 bg-white">
            View Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CustomerOverview;
