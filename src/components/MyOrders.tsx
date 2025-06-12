import React from "react";
import OrderProductSearchBar from "./OrderProductSearchBar";
import OrdersTable from "./OrdersTable";

const MyOrders = () => {
  const sampleCustomerOrders = [
    {
      id: "ORD-1001",
      date: "2024-07-01",
      status: "delivered",
      amount: 59.99,
      buyer: "Ayon",
    },
    {
      id: "ORD-1002",
      date: "2024-07-03",
      status: "pending",
      amount: 34.5,
      buyer: "Ayon",
    },
    {
      id: "ORD-1003",
      date: "2024-07-07",
      status: "shipped",
      amount: 120.0,
      buyer: "Ayon",
    },
    {
      id: "ORD-1004",
      date: "2024-07-09",
      status: "cancelled",
      amount: 89.25,
      buyer: "Ayon",
    },
    {
      id: "ORD-1005",
      date: "2024-07-12",
      status: "delivered",
      amount: 22.0,
      buyer: "Ayon",
    },
    {
      id: "ORD-1006",
      date: "2024-07-15",
      status: "pending",
      amount: 77.77,
      buyer: "Ayon",
    },
    {
      id: "ORD-1007",
      date: "2024-07-18",
      status: "shipped",
      amount: 45.5,
      buyer: "Ayon",
    },
  ];

  return (
    <div>
      <div className="mb-10 space-y-1">
        <h1 className="text-3xl font-semibold text-text-primary ">My Orders</h1>
        <h3 className="text-base text-text-secondary">
          View and manage your order history.
        </h3>
      </div>

      <div className="mb-10">
        <OrderProductSearchBar type="customer" />
      </div>

      <OrdersTable userType="customer" orders={sampleCustomerOrders} />
    </div>
  );
};

export default MyOrders;
