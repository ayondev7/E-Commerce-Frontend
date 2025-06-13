"use client";
import React, { useState } from "react";
import { MapPin, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function ShippingInfoForm() {
  const [selectedAddress, setSelectedAddress] = useState<"Home" | "Work">(
    "Home"
  );
  const [billingAddressSame, setBillingAddressSame] = useState(true);

  return (
    <div className="bg-white border border-border-primary rounded-sm p-6.5">
      <h2 className="text-2xl font-medium text-text-primary mb-6.5">
        Shipping Information
      </h2>

      <div className="mb-5">
        <h3 className="text-xl font-medium text-text-primary mb-2.5">
          Saved Addresses
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2.5">
          {["Home", "Work"].map((type) => (
            <div
              key={type}
              className={`border rounded-sm p-5 cursor-pointer ${
                selectedAddress === type
                  ? "border-button-primary bg-[#FCE9EC]"
                  : "border-border-primary"
              }`}
              onClick={() => setSelectedAddress(type as "Home" | "Work")}
            >
              <div className="flex items-center gap-x-2.5 mb-2.5 relative">
                <MapPin className="w-6 h-6 text-text-primary" />
                <span className="text-text-primary font-medium text-xl">
                  {type}
                </span>
                {type === "Home" && (
                  <span className="flex items-center gap-x-1 text-base font-medium text-text-secondary">
                    <Check className="w-6 h-6" />
                    Default
                  </span>
                )}
                {selectedAddress === type && (
                  <div className="w-5 h-5 border-2 border-button-primary rounded-full flex items-center justify-center absolute right-0">
                    <Check strokeWidth={4} className="text-button-primary w-2.5 h-2.5" />
                  </div>
                )}
              </div>
              <p className="text-base text-text-secondary font-normal">
                {type === "Home"
                  ? "12 Rosewood Lane, Flat 3A, Manchester, M14 5TP, United Kingdom"
                  : "Unit 7, Orion Business Park, Buckingham, Avenue, Slough, SL1 4QT, United Kingdom"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
        <div>
          <label className="block text-xl font-medium text-text-primary mb-2.5">
            <span className="flex gap-x-1.5 items-center">
              Full Name <span className="text-button-primary">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter Full Name"
            className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
          />
        </div>
        <div>
          <label className="block text-xl font-medium text-text-primary mb-2.5">
            <span className="flex gap-x-1.5 items-center">
              Phone Number <span className="text-button-primary">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter Phone Number"
            className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-xl font-medium text-text-primary mb-2.5">
          <span className="flex gap-x-1.5 items-center">
            Email <span className="text-button-primary">*</span>
          </span>
        </label>
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
        />
      </div>

      <div className="mb-5">
        <label className="block text-xl font-medium text-text-primary mb-2.5">
          <span className="flex gap-x-1.5 items-center">
            Address Line 1 <span className="text-button-primary">*</span>
          </span>
        </label>
        <input
          type="text"
          placeholder="Enter Address Line 1"
          className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
        />
      </div>

      <div className="mb-5">
        <label className="block text-xl font-medium text-text-primary mb-2.5">
          Address Line 2 (Optional)
        </label>
        <input
          type="text"
          placeholder="Enter Address Line 2"
          className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
        <div>
          <label className="block text-xl font-medium text-text-primary mb-2.5">
            <span className="flex gap-x-1.5 items-center">
              City <span className="text-button-primary">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter City"
            className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
          />
        </div>
        <div>
          <label className="block text-xl font-medium text-text-primary mb-2.5">
            <span className="flex gap-x-1.5 items-center">
              Zip/Postal Code <span className="text-button-primary">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter Zip/Postal Code"
            className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
        <div>
          <label className="block text-xl font-medium text-text-primary mb-2.5">
            <span className="flex gap-x-1.5 items-center">
              Country <span className="text-button-primary">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter Country"
            className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
          />
        </div>
        <div>
          <label className="block text-xl font-medium text-text-primary mb-2.5">
            <span className="flex gap-x-1.5 items-center">
              State/Province <span className="text-button-primary">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter State/Province"
            className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
          />
        </div>
      </div>

      <div className="flex items-center gap-x-2.5">
        <Checkbox
          id="billing-same"
          checked={billingAddressSame}
          onCheckedChange={(checked) => setBillingAddressSame(!!checked)}
          className="w-5 h-5 border-text-primary hover:cursor-pointer border-3 rounded-[3px] shadow-none data-[state=checked]:border-custom-blue data-[state=checked]:bg-white data-[state=checked]:text-custom-blue [&_svg]:!w-2.5 [&_svg]:!h-2.5 [&_svg]:!stroke-5"
        />
        <label htmlFor="billing-same" className="text-base text-text-primary">
          Billing address is the same as shipping
        </label>
      </div>
    </div>
  );
}
