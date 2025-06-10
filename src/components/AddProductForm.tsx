"use client";
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GeneralInformationForm from './GeneralInformationForm';
import SpecificationsForm from './SpecificationsForm';

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
      </div>
    </div>
  );
};

export default AddProductForm;