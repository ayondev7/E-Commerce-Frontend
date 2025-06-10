"use client";
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GeneralInformationForm from './GeneralInformationForm';
import SpecificationsForm from './SpecificationsForm';
import PricingInventoryForm from './PricingInventoryForm';
import AdditionalInformationForm from './AdditionalInformationForm';
import { Checkbox } from './ui/checkbox';

const AddProductForm = () => {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/products')}
          className="p-2 hover:bg-background-hover rounded-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-semibold">Add New Product</h1>
      </div>

      <h2 className="text-lg text-text-secondary">
        Fill in the details to list your product for sale
      </h2>

      <div className="space-y-8">
        <GeneralInformationForm />
        <SpecificationsForm />
        <PricingInventoryForm />
        
        <div className="flex items-center space-x-2">
          <Checkbox id="negotiation"  className="rounded-[3px] border-2 border-text-primary data-[state=checked]:border-blue-500 data-[state=checked]:bg-white data-[state=checked]:text-blue-500"  />
          <label htmlFor="negotiation" className="text-sm font-medium">
            Enable Negotiation
          </label>
        </div>

        <AdditionalInformationForm />
      </div>
    </div>
  );
};

export default AddProductForm;