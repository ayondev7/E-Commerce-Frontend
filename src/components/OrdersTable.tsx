"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Truck,
  Repeat,
  Ban,
  MoreHorizontal,
  ShoppingBag,
  LocateIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ViewOrderModal } from "./ViewOrderModal";
import { Order } from "@/types/ordertypes";
import { useUpdateOrderStatus } from "@/hooks/orderHooks";
import toast from "react-hot-toast";

interface OrdersTableProps {
  orders: Order[];
  userType: "seller" | "customer";
}

const OrdersTable = ({ orders, userType }: OrdersTableProps) => {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const { mutate: updateOrderStatus, isPending: isCancelLoading } =
    useUpdateOrderStatus();

  const handleCancelOrder = (orderId: string) => {
    updateOrderStatus(
      { orderId: orderId, orderStatus: "cancelled" },
      {
        onSuccess: () => {
          toast.success("Order has been cancelled!");
        },
        onError: () => {
          toast.error("Failed to update order status");
        },
      }
    );
  };

  const handleReorder = (orderId: string) => {
    updateOrderStatus(
      { orderId: orderId, orderStatus: "pending" },
      {
        onSuccess: () => {
          toast.success("Your order has been reordered!");
        },
        onError: () => {
          toast.error("Failed to reorder your order");
        },
      }
    );
  };

    const handleBuyAgain = (orderId: string) => {
    updateOrderStatus(
      { orderId: orderId, orderStatus: "buy again" },
      {
        onSuccess: () => {
          toast.success("Your have placed a new order!");
        },
        onError: () => {
          toast.error("Failed to buy again.");
        },
      }
    );
  };

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

  const handleShipClick = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleShipOrder = () => {
    setIsViewModalOpen(false);
  };

  const handleViewClick = (_id: string, orderId: string) => {
    router.push(`/seller/view-order/${orderId}/${_id}`);
  };

  return (
    <div className="border border-border-primary rounded-lg bg-background-primary">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border-primary">
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
              Order ID
            </TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
              Date
            </TableHead>
            {userType === "seller" && (
              <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
                Buyer
              </TableHead>
            )}
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
              {userType === "seller" ? "Amount" : "Total"}
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
            <TableRow
              key={order._id}
              className="border-b last:border-b-0 border-border-primary"
            >
              <TableCell className="text-text-primary px-4 py-4 text-base">
                {order?.orderId}
              </TableCell>
              <TableCell className="text-text-primary px-4 py-4 text-base">
                {formatDate(order?.createdAt)}
              </TableCell>
              {userType === "seller" && (
                <TableCell className="text-text-primary px-4 py-4 text-base">
                  {order?.customerName}
                </TableCell>
              )}
              <TableCell className="text-text-primary px-4 py-4 text-base">
                ${order?.price.toFixed(2)}
              </TableCell>
              <TableCell className="px-4 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                    order?.status
                  )}`}
                >
                  {order?.status.charAt(0).toUpperCase() +
                    order?.status.slice(1)}
                </span>
              </TableCell>
              <TableCell className="px-4 py-4 relative">
                {userType === "seller" ? (
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => handleViewClick(order._id, order.orderId)}
                      className="flex items-center justify-center min-h-10 min-w-25 gap-x-1.5 px-4 py-2 hover:cursor-pointer rounded-sm text-text-primary border border-border-primary text-base cursor-pointer"
                    >
                      <Eye className="w-6 h-6" />
                      <span className="font-medium">View</span>
                    </button>
                    {order.status === "pending" && (
                      <button
                        onClick={() => handleShipClick(order)}
                        className="flex justify-center items-center min-h-10 min-w-25 gap-x-1.5 px-4 py-2 hover:cursor-pointer rounded-sm text-white border bg-button-primary text-base cursor-pointer"
                      >
                        <Truck className="w-6 h-6" />
                        <span className="font-medium">Ship</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-between items-center gap-x-2">
                    <div className="flex justify-between items-center gap-x-2">
                      <div className="flex gap-2.5">
                        {order.status === "delivered" && (
                          <button
                            disabled={isCancelLoading}
                            onClick={() => handleBuyAgain(order._id)}
                            className="flex items-center justify-center min-h-10 min-w-25 gap-x-1.5 px-4 py-2 rounded-sm text-text-primary border border-border-primary text-base cursor-pointer"
                          >
                            <ShoppingBag className="w-6 h-6" />
                            <span className="font-medium">Buy Again</span>
                          </button>
                        )}

                        {order.status === "shipped" && (
                          <button className="flex items-center justify-center min-h-10 min-w-25 gap-x-1.5 px-4 py-2 rounded-sm text-text-primary border border-border-primary text-base cursor-pointer">
                            <LocateIcon className="w-6 h-6" />
                            <span className="font-medium">Track</span>
                          </button>
                        )}

                        {order.status === "pending" && (
                          <button
                            disabled={isCancelLoading}
                            onClick={() => handleCancelOrder(order._id)}
                            className="flex items-center justify-center min-h-10 min-w-25 gap-x-1.5 px-4 py-2 rounded-sm text-text-primary border border-border-primary text-base cursor-pointer"
                          >
                            <Ban className="w-6 h-6" />
                            <span className="font-medium">Cancel</span>
                          </button>
                        )}

                        {order.status === "cancelled" && (
                          <button
                            disabled={isCancelLoading}
                            onClick={() => handleReorder(order._id)}
                            className="flex items-center justify-center min-h-10 min-w-25 gap-x-1.5 px-4 py-2 rounded-sm text-text-primary border border-border-primary text-base cursor-pointer"
                          >
                            <Repeat className="w-6 h-6" />
                            <span className="font-medium">Reorder</span>
                          </button>
                        )}
                      </div>

                      <button className="flex items-center justify-center absolute left-43">
                        <MoreHorizontal className="w-6 h-6 text-text-primary" />
                      </button>
                    </div>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {userType === "seller" && selectedOrder && (
        <ViewOrderModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          onCancel={() => setIsViewModalOpen(false)}
          onShip={handleShipOrder}
          _id={selectedOrder._id}
          orderId={selectedOrder.orderId}
        />
      )}
    </div>
  );
};

export default OrdersTable;
