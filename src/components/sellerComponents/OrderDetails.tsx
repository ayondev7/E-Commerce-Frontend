"use client";
import { ArrowLeft, Printer, Phone, MapPin, Mail, X, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Timeline from "../Timeline";
import BuyerInformation from "../BuyerInformation";
import PaymentInformation from "../PaymentInformation";
import ProductDetailsCard from "../ProductDetailsCard";

const OrderDetails = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-between mr-5">
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => router.push("/orders")}
            className="rounded-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-semibold">Order Details</h1>
        </div>
        <div className="flex gap-x-5">
          <button className="flex items-center hover:cursor-pointer rounded-sm gap-x-2.5 min-w-[190px] min-h-[52px] px-5 py-2.5 border text-text-primary border-border-primary font-medium">
            <Printer className="w-5 h-5" />
            Print Invoice
          </button>
          <button className="flex items-center hover:cursor-pointer rounded-sm gap-x-2.5 min-w-[190px] min-h-[52px] px-5 py-2.5 bg-button-primary text-white font-medium">
            <Phone className="w-5 h-5" />
            Contact Buyer
          </button>
        </div>
      </div>
      <div className="mt-10 rounded-sm border border-border-primary bg-white p-5">
        <ProductDetailsCard />
        <div className="flex gap-x-5 mt-5 items-start">
          <Timeline />
          <BuyerInformation />
          <PaymentInformation />
        </div>
        <div className="flex gap-x-5 mt-10">
          <button className="flex items-center rounded-sm border font-medium border-red-200 text-button-primary gap-x-1.5 px-4 py-2 cursor-pointer">
            <X className="w-5 h-5" />
            Cancel Order
          </button>

          <button className="flex items-center rounded-sm border font-medium text-white bg-button-primary gap-x-1.5 px-4 py-2 cursor-pointer">
            <Truck className="w-5 h-5" />
            Ship Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
