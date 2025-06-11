import React from "react";
import { X, AlertTriangle, Truck } from "lucide-react";

interface Order {
  id: string;
  date: string;
  status: string;
  product: string;
  amount: string;
  customer: string;
}

interface ViewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  onShip: () => void;
  order: Order;
}

export const ViewOrderModal = ({
  isOpen,
  onClose,
  onCancel,
  onShip,
  order,
}: ViewOrderModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-[#7D8184] opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-background-primary rounded-sm p-5 border border-border-primary">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary">
            Order #{order.id}
          </h2>
          <p className="text-text-secondary text-base mb-6.5">
            Placed on {order.date}
          </p>
          <div className="text-text-secondary text-base mb-4 flex justify-between">
            <span> Status:</span>
            <span className="text-warning-primary">{order.status}</span>
          </div>

          <div className="border-t border-border-primary pt-4 mb-6 text-base">
            <div className="flex justify-between mb-5">
              <span className="text-text-secondary">Product:</span>
              <span className="text-text-primary">{order.product}</span>
            </div>
            <div className="flex justify-between mb-5">
              <span className="text-text-secondary">Amount:</span>
              <span className="text-text-primary">{order.amount}</span>
            </div>
            <div className="flex justify-between mb-5">
              <span className="text-text-secondary">Customer:</span>
              <span className="text-text-primary">{order.customer}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-x-5">
          <button className="flex min-w-47.5 min-h-13 justify-center items-center rounded-sm border font-medium border-red-200 text-button-primary gap-x-1.5 px-4 py-2 cursor-pointer">
            <X className="w-5 h-5" />
            Cancel Order
          </button>

          <button className="flex items-center min-h-13 min-w-47.5 justify-center rounded-sm border font-medium text-white bg-button-primary gap-x-1.5 px-4 py-2 cursor-pointer">
            <Truck className="w-5 h-5" />
            Ship Order
          </button>
        </div>
      </div>
    </div>
  );
};
