"use client";
import { ArrowLeft, Printer, Phone, MapPin, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Timeline from "../Timeline";

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
      <div className="bg-white mt-10 p-5">
        <div className="flex gap-x-5 border border-border-primary rounded-sm p-5 w-max max-w-full">
          <div className="max-w-29.5 max-h-29.5 rounded-sm overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
              alt="Product"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center mb-7 justify-between gap-x-10">
              <h2 className="text-xl font-medium">
                Over The Head Wireless Headphone
              </h2>
              <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700">
                Active
              </span>
            </div>
            <div className="flex gap-x-10">
              <div className="flex flex-col gap-y-1.5">
                <span className="text-text-secondary text-base">Order ID</span>
                <span className="text-text-primary text-xl">12345</span>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <span className="text-text-secondary text-base">Date</span>
                <span className="text-text-primary text-xl">Jun 11, 2025</span>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <span className="text-text-secondary text-base">Quantity</span>
                <span className="text-text-primary text-xl">3</span>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <span className="text-text-secondary text-base">Condition</span>
                <span className="text-text-primary text-xl">New</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-x-5 mt-5">
          <div><Timeline /></div>

          <div className="bg-white p-5 border border-border-primary rounded-sm">
            <div className="text-2xl font-semibold mb-5">Buyer Information</div>

            <div className="space-y-5 text-base">
              <div>
                <div className="text-text-secondary text-xl font-semibold mb-2.5">
                  Buyer
                </div>
                <div className="text-text-primary font-semibold">
                  Mike Turner
                </div>
                <div className="text-text-secondary flex items-center gap-x-1.5">
                  <Mail className="w-5 h-5" />
                  example@email.com
                </div>
              </div>

              <div>
                <div className="text-text-secondary text-xl font-semibold mb-2.5">
                  Shipping Address
                </div>
                <div className="text-text-primary text-base flex items-start gap-x-1.5">
                  <MapPin className="w-5 h-5 mt-0.5" />
                  62 Elm Tree Ave, Coventry, West Midlands, UK
                </div>
              </div>

              <div>
                <div className="text-text-secondary mb-2.5 text-xl font-semibold">
                  Payment Method
                </div>
                <div className="text-text-primary text-base font-semibold">
                  Credit Card
                </div>
                <div className="text-base text-text-secondary">
                  **** **** **** 4242
                </div>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="border border-border-primary rounded-sm p-5">
            <div className="text-2xl font-semibold mb-5">Payment Info</div>

            <div className="grid grid-cols-2 gap-x-20">
              <div className="space-y-2.5 text-text-secondary text-base font-normal">
                <div>Subtotal</div>
                <div>Shipping</div>
                <div>Tax</div>
                <div>Discount</div>
              </div>
              <div className="space-y-2.5 text-text-primary text-base font-normal text-right">
                <div>$0.00</div>
                <div>$0.00</div>
                <div>$0.00</div>
                <div>$0.00</div>
              </div>
            </div>

            <div className="my-2.5 border-t border-border-primary" />

            <div className="grid grid-cols-2 gap-x-20">
              <div className="text-text-secondary text-base font-medium">
                Total
              </div>
              <div className="text-text-primary text-base font-medium text-right">
                $0.00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
