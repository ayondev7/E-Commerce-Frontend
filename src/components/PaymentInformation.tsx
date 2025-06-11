import React from "react";

const PaymentInformation = () => {
  return (
    <div className="border bg-white border-border-primary rounded-sm p-5">
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
        <div className="text-text-secondary text-base font-medium">Total</div>
        <div className="text-text-primary text-base font-medium text-right">
          $0.00
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;
