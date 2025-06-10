"use client";
import React from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import GeneralInformationForm from "./GeneralInformationForm";
import SpecificationsForm from "./SpecificationsForm";
import PricingInventoryForm from "./PricingInventoryForm";
import AdditionalInformationForm from "./AdditionalInformationForm";
import { Checkbox } from "./ui/checkbox";

const AddProductForm = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <button
          onClick={() => router.push("/products")}
          className="rounded-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-semibold">Add New Product</h1>
      </div>

      <h2 className="text-lg text-text-secondary ml-7 mt-3 mb-6">
        Fill in the details to list your product for sale
      </h2>

      <div className="space-y-8">
        <GeneralInformationForm />
        <SpecificationsForm />
        <PricingInventoryForm />

        <div className="flex items-center bg-white p-6 gap-x-2.5 border border-border-primary rounded-sm">
          <Checkbox
            id="negotiation"
            className="rounded-[3px] border-2 border-text-primary data-[state=checked]:border-blue-500 data-[state=checked]:bg-white data-[state=checked]:text-blue-500 [&_svg]:!w-3 [&_svg]:!h-3 [&_svg]:!stroke-5"
          />
          <label htmlFor="negotiation" className="text-xl">
            Enable Negotiation
          </label>
        </div>

        <div className="space-y-6 bg-background-primary p-6 rounded-sm border border-border-primary">
          <AdditionalInformationForm />
        </div>

        <div className="flex justify-between bg-white border-t border-border-primary p-4">
          <button className="flex items-center gap-x-1.5 px-4 py-2 hover:bg-background-hover rounded-sm text-danger-primary border border-[#f5cdd5] text-base cursor-pointer">
            <Trash2 className="w-5 h-5" />
            <span className="font-medium">Discard</span>
          </button>
          <div className="flex gap-x-1">
            <button className="px-5 py-[10px] bg-button-secondary text-text-primary rounded-sm border border-border-primary mr-2">
              Save Draft
            </button>
            <button className="px-5 py-[10px] bg-button-primary text-white rounded-sm">
              Send for Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
