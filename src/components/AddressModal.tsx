"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAddAddress, useUpdateAddress } from "@/hooks/addressHooks";
import toast from "react-hot-toast";

export default function AddressModal({
  onClose,
  initialData,
}: {
  onClose: () => void;
  initialData?: any;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [addressLine, setAddressLine] = useState(
    initialData?.addressLine || ""
  );
  const [city, setCity] = useState(initialData?.city || "");
  const [country, setCountry] = useState(initialData?.country || "");
  const [zipCode, setZipCode] = useState(initialData?.zipCode || "");
  const [state, setState] = useState(initialData?.state || "");

  const { mutate: createAddress, isPending: isCreating } = useAddAddress();
  const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

 const handleSubmit = () => {
  if (!name || !addressLine || !city || !country || !zipCode || !state) {
    toast.error("Please fill in all fields");
    return;
  }

  const updates = {
    name,
    addressLine,
    city,
    country,
    zipCode,
    state,
  };

  if (initialData) {
    updateAddress(
      { addressId: initialData._id, updates },
      {
        onSuccess: () => {
          toast.success("Address updated successfully");
          onClose();
        },
        onError: () => toast.error("Failed to update address"),
      }
    );
  } else {
    createAddress(
      updates,
      {
        onSuccess: () => {
          toast.success("Address saved successfully");
          onClose();
        },
        onError: () => toast.error("Failed to save address"),
      }
    );
  }
};


  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white p-6.5 rounded-sm border border-border-primary w-full max-w-2xl"
      >
        <h2 className="text-2xl font-medium text-text-primary mb-6.5">
          {initialData ? "Edit Address" : "Add New Address"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              Address Name
            </label>
            <input
              type="text"
              placeholder="e.g. Home, Work"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base placeholder-text-secondary"
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              Address Line
            </label>
            <input
              type="text"
              placeholder="Enter Address Line"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base placeholder-text-secondary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              City
            </label>
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base placeholder-text-secondary"
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              Zip/Postal Code
            </label>
            <input
              type="text"
              placeholder="Enter Zip/Postal Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base placeholder-text-secondary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              Country
            </label>
            <input
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base placeholder-text-secondary"
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              State/Province
            </label>
            <input
              type="text"
              placeholder="Enter State/Province"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base placeholder-text-secondary"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isCreating || isUpdating}
          className="mt-2 w-full md:w-auto px-6 py-3 bg-button-primary text-white rounded-sm hover:bg-opacity-90"
        >
          {isCreating || isUpdating
            ? initialData
              ? "Updating..."
              : "Saving..."
            : initialData
            ? "Update Address"
            : "Save Address"}
        </button>
      </div>
    </div>,
    document.body
  );
}
