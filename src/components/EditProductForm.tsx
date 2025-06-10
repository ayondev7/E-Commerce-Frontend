"use client";
import React from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import GeneralInformationForm from "./GeneralInformationForm";
import SpecificationsForm from "./SpecificationsForm";
import PricingInventoryForm from "./PricingInventoryForm";
import AdditionalInformationForm from "./AdditionalInformationForm";
import { Checkbox } from "./ui/checkbox";

const EditProductForm = () => {
  const router = useRouter();

  const existingSpecs = {
    brand: "apple",
    model: "iphone14",
    storage: "256",
    ram: "6",
    color: "black",
    conditions: ["Good", "Fair"],
    features: ["Bluetooth", "Touch Screen"],
  };

  const existingPricing = {
    price: 499.99,
    salePrice: 449.99,
    quantity: 20,
    sku: "SKU123456",
  };

  const existingAdditionalInformation = {
    tags: "smartphone, android, 5G",
    seoTitle: "Best Android Smartphones 2025",
    seoDescription:
      "Discover the top Android smartphones of 2025 with cutting-edge 5G technology.",
  };

  const existingGeneralInformation = {
  title: "Awesome Phone",
  description: "This phone is great for everything.",
  category: "electronics",
};

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <button
          onClick={() => router.push("/products")}
          className="rounded-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-semibold">Edit Product Details</h1>
      </div>

      <h2 className="text-lg text-text-secondary ml-7 mt-3 mb-6">
        Edit the details of your product
      </h2>

      <div className="space-y-8">
        <GeneralInformationForm initialData={existingGeneralInformation} />
        <SpecificationsForm initialData={existingSpecs} />
        <PricingInventoryForm initialData={existingPricing} />

        <div className="space-y-6 bg-background-primary p-6 rounded-sm border border-border-primary">
          <AdditionalInformationForm initialData={existingAdditionalInformation} />
        </div>

        <div className="flex justify-between bg-white border-t border-border-primary p-4">
          <button className="flex items-center gap-x-1.5 px-4 py-2 hover:bg-background-hover rounded-sm text-danger-primary border border-[#f5cdd5] text-base cursor-pointer">
            <Trash2 className="w-5 h-5" />
            <span className="font-medium">Discard</span>
          </button>
          <div>
            <button className="px-5 py-[10px] bg-button-primary text-white rounded-sm">
              Send for Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
