import React from "react";
import { X, Truck } from "lucide-react";
import { useGetOrderDetails } from "@/hooks/orderHooks";

interface ViewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  onShip: () => void;
  orderId: string;
  _id: string;
}

export const ViewOrderModal = ({
  isOpen,
  onClose,
  onCancel,
  onShip,
  orderId,
  _id,
}: ViewOrderModalProps) => {
  const { data, isLoading, error } = useGetOrderDetails(_id);

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-[#7D8184] opacity-50" />
        <div className="relative bg-background-primary rounded-lg p-5 border border-border-primary">
          <p className="text-text-primary">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-[#7D8184] opacity-50" />
        <div className="relative bg-background-primary rounded-lg p-5 border border-border-primary">
          <p className="text-text-primary">Failed to load order details.</p>
        </div>
      </div>
    );
  }

  const order = data;

  console.log("order:", order);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-[#7D8184] opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-background-primary rounded-lg p-5 border border-border-primary">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary">
            Order #{orderId}
          </h2>
          <p className="text-text-secondary text-base mb-6.5">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="text-text-secondary text-base flex justify-between">
            <span>Status:</span>
            <span
              className={
                order.orderStatus === "pending"
                  ? "text-warning-primary"
                  : order.orderStatus === "shipped"
                  ? "text-info-primary"
                  : order.orderStatus === "cancelled"
                  ? "text-danger-primary"
                  : order.orderStatus === "delivered"
                  ? "text-success-primary"
                  : ""
              }
            >
              {order.orderStatus}
            </span>
          </div>
          <div className="border-t border-border-primary pt-4 mt-4 text-base">
            <div className="flex justify-between mb-5">
              <span className="text-text-secondary">Product:</span>
              <span className="text-text-primary">{order.product?.title}</span>
            </div>
            <div className="flex justify-between mb-5">
              <span className="text-text-secondary">Amount:</span>
              <span className="text-text-primary">${order.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Customer:</span>
              <span className="text-text-primary">
                {order.shippingInfo?.fullName}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-x-5 mt-10">
          <button
            onClick={onCancel}
            className="flex min-w-47.5 min-h-13 justify-center items-center rounded-sm border font-medium border-red-200 text-button-primary gap-x-1.5 px-4 py-2 cursor-pointer"
          >
            <X className="w-5 h-5" />
            Cancel Order
          </button>

          <button
            onClick={onShip}
            className="flex items-center min-h-13 min-w-47.5 justify-center rounded-sm border font-medium text-white bg-button-primary gap-x-1.5 px-4 py-2 cursor-pointer"
          >
            <Truck className="w-5 h-5" />
            Ship Order
          </button>
        </div>
      </div>
    </div>
  );
};
