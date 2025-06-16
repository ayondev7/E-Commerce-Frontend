"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import CheckoutProcess from "./CheckoutProcess";
import ShippingInfoForm from "./ShippingInfoForm";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";
import { CheckoutPayload } from "@/types/checkoutTypes";

interface CheckoutFormData {
  // Address selection
  addressId?: string;
  
  // Personal info (always required)
  fullName: string;
  phoneNumber: string;
  email: string;
  
  // Address fields (required only if no address selected)
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  state?: string;
  
  // Other fields
  billingAddressSame: boolean;
  cashOnDelivery: boolean;
  acceptTerms: boolean;
  promoCode?: string;

  checkoutPayload?: CheckoutPayload;
}

export default function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState<"gateway" | "cod">("gateway");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [promoCode, setPromoCode] = useState("");
   const checkoutPayload = useCartStore((state) => state.checkoutPayload);

  const methods = useForm<CheckoutFormData>({
    defaultValues: {
      billingAddressSame: true,
      cashOnDelivery: false,
      acceptTerms: false,
    }
  });

  const onSubmit = (data: CheckoutFormData) => {
    if (!data.acceptTerms) {
      toast.error("You must accept the terms and conditions to proceed");
      return;
    }

    const payloadToSubmit = {
      ...data,
      checkoutPayload, 
      promoCode,
      paymentMethod: selectedPayment,
    };

    console.log("Full Submission Payload:", payloadToSubmit);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="pb-6 space-y-10">
          <div>
            <h1 className="text-3xl font-semibold text-text-primary mb-1">Checkout</h1>
            <p className="text-base text-text-secondary">Please review and complete your purchase</p>
          </div>

          <div>
            <CheckoutProcess />
          </div>

          <ShippingInfoForm />

         <div className="my-10">
            <PaymentMethod
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            acceptTerms={acceptTerms}
            setAcceptTerms={setAcceptTerms}
          />
         </div>

          <OrderSummary
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            onPlaceOrder={methods.handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </FormProvider>
  );
}