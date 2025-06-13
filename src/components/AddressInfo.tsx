import React from "react";
import { MapPin, Edit, Trash2, Plus, Check } from "lucide-react";

export default function AddressInfo() {
  return (
    <div className="w-full p-6.5 bg-white border border-border-primary rounded-sm">
      <div className="flex justify-between items-center mb-6.5">
        <div>
          <h1 className="text-2xl font-medium text-text-primary mb-1">
            Addresses
          </h1>
          <h3 className="text-base text-text-secondary">
            Manage your shipping and billing addresses.
          </h3>
        </div>
        <button className="flex items-center justify-center min-w-43.5 h-13 gap-2.5 px-5 py-2.5 font-medium bg-button-primary text-white rounded-sm hover:bg-opacity-90 transition-colors cursor-pointer">
          <Plus className="w-6 h-6" />
          Add Address
        </button>
      </div>

      <div className="space-y-5">
        <div className="border border-border-primary rounded-lg p-5 space-y-5">
          <div className="flex items-center gap-x-2.5">
            <MapPin className="text-text-secondary w-6 h-6" />
            <h3 className="text-xl font-medium text-text-primary">Home</h3>
          </div>

          <p className="text-base text-text-secondary max-w-[350px]">
            12 Rosewood Lane, Flat 3A Manchester, M14 5TP, United Kingdom
          </p>

          <div className="flex gap-x-2.5 items-center">
            <button className="flex justify-center items-center gap-x-[0.4rem] px-4 py-2 text-base font-medium text-text-primary hover:cursor-pointer rounded-sm border border-border-primary">
              <Edit className="w-6 h-6" />
              Edit
            </button>

            <button className="flex justify-center items-center gap-x-[0.4rem] px-4 py-2 text-base font-medium text-button-primary hover:cursor-pointer rounded-sm border border-danger-border">
              <Trash2 className="w-6 h-6" />
              Delete
            </button>

            <div className="flex justify-center items-center gap-x-[0.4rem] px-4 py-2 text-base font-medium text-text-secondary hover:cursor-pointer rounded-sm">
              <Check className="w-6 h-6" />
              Default
            </div>
          </div>
        </div>

        <div className="border border-border-primary rounded-lg p-5 space-y-5">
          <div className="flex items-center gap-x-2.5">
            <MapPin className="text-text-secondary w-6 h-6" />
            <h3 className="text-xl font-medium text-text-primary">Work</h3>
          </div>

          <p className="text-base text-text-secondary max-w-[350px]">
            Unit 7, Orion Business Park, Buckingham Avenue, Slough, SL1 4QT, United Kingdom
          </p>

          <div className="flex gap-x-2.5 items-center">
            <button className="flex justify-center items-center gap-x-[0.4rem] px-4 py-2 text-base font-medium text-text-primary hover:cursor-pointer rounded-sm border border-border-primary">
              <Edit className="w-6 h-6" />
              Edit
            </button>

            <button className="flex justify-center items-center gap-x-[0.4rem] px-4 py-2 text-base font-medium text-button-primary hover:cursor-pointer rounded-sm border border-danger-border">
              <Trash2 className="w-6 h-6" />
              Delete
            </button>

            <div className="flex justify-center items-center gap-x-[0.4rem] px-4 py-2 text-base font-medium text-text-primary hover:cursor-pointer rounded-sm border border-border-primary">
              Set as Default
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
