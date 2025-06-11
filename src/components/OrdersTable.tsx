import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Truck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Order {
  id: string;
  date: string;
  buyer: string;
  amount: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
}

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const router = useRouter();

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning-secondary text-warning-primary";
      case "shipped":
        return "bg-info-secondary text-info-primary";
      case "delivered":
        return "bg-success-secondary text-success-primary";
      case "cancelled":
        return "bg-danger-secondary text-danger-primary";
      default:
        return "";
    }
  };

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  return (
    <div className="border rounded-sm bg-background-primary">
      <Table>
        <TableHeader>
          <TableRow className="border-b">
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
              Order ID
            </TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
              Date
            </TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
              Buyer
            </TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
              Amount
            </TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
              Status
            </TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="border-b last:border-b-0">
              <TableCell className="text-text-primary px-4 py-4 text-base">
                {order.id}
              </TableCell>
              <TableCell className="text-text-primary px-4 py-4 text-base">
                {formatDate(order.date)}
              </TableCell>
              <TableCell className="text-text-primary px-4 py-4 text-base">
                {order.buyer}
              </TableCell>
              <TableCell className="text-text-primary px-4 py-4 text-base">
                ${order.amount.toFixed(2)}
              </TableCell>
              <TableCell className="px-4 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </TableCell>
              <TableCell className="px-4 py-4">
                <div className="flex gap-2.5">
                  <button
                    onClick={() => router.push(`/view-order/${order.id}`)}
                    className="flex items-center min-h-10 min-w-25 gap-x-1.5 px-4 py-2 hover:cursor-pointer rounded-sm text-text-primary border border-border-primary text-base cursor-pointer"
                  >
                    <Eye className="w-5 h-5" />
                    <span className="font-medium">View</span>
                  </button>
                  {order.status === "pending" && (
                    <button className="flex items-center min-h-10 min-w-25 gap-x-1.5 px-4 py-2 hover:cursor-pointer rounded-sm text-white border bg-button-primary text-base cursor-pointer">
                      <Truck className="w-5 h-5" />
                      <span className="font-medium">Ship</span>
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
