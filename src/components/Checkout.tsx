"use client";
import React, { useState } from "react";
import CheckoutProcess from "./CheckoutProcess";
import ShippingInfoForm from "./ShippingInfoForm";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";

export default function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState<"gateway" | "cod">("gateway");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  return (
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
      />
    </div>
  );
}
