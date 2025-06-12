"use client";
import React, { useState } from "react";
import OrdersTable from "../OrdersTable";
import OrderProductSearchBar from "../OrderProductSearchBar";
import Tab from "../Tab";

const Orders = () => {
  const [tabValue, setTabValue] = useState<string>("all");

  const sampleOrders = [
    {
      id: "ORD-1001",
      date: "2025-05-15",
      buyer: "Alice Johnson",
      amount: 249.99,
      status: "pending" as const,
    },
    {
      id: "ORD-1002",
      date: "2025-05-14",
      buyer: "Michael Smith",
      amount: 129.50,
      status: "shipped" as const,
    },
    {
      id: "ORD-1003",
      date: "2025-05-13",
      buyer: "Samantha Lee",
      amount: 89.00,
      status: "cancelled" as const,
    },
    {
      id: "ORD-1004",
      date: "2025-05-10",
      buyer: "Daniel Kim",
      amount: 340.75,
      status: "delivered" as const,
    },
    {
      id: "ORD-1005",
      date: "2025-05-09",
      buyer: "Emily Davis",
      amount: 559.20,
      status: "shipped" as const,
    },
    {
      id: "ORD-1006",
      date: "2025-05-08",
      buyer: "Chris Brown",
      amount: 219.99,
      status: "delivered" as const,
    },
  ];

  const tabOptions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "shipped", label: "Shipped" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const filteredOrders =
    tabValue === "all"
      ? sampleOrders
      : sampleOrders.filter((order) => order.status === tabValue);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Orders</h1>
      </div>

      <div>
        <OrderProductSearchBar type="order" />
      </div>

      <div>
        <Tab
          options={tabOptions}
          value={tabValue}
          onValueChange={setTabValue}
        />
      </div>

      <OrdersTable userType="seller" orders={filteredOrders} />
    </div>
  );
};

export default Orders;
