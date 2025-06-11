import React from "react";
import { Mail, MapPin } from "lucide-react";

const BuyerInformation = () => {
  return (
    <div className="bg-white p-5 border border-border-primary rounded-sm">
      <div className="text-2xl font-semibold mb-5">Buyer Information</div>

      <div className="space-y-5 text-base">
        <div>
          <div className="text-text-secondary text-xl font-semibold mb-2.5">
            Buyer
          </div>
          <div className="text-text-primary font-semibold">Mike Turner</div>
          <div className="text-text-secondary flex items-center gap-x-1.5">
            <Mail className="w-5 h-5" />
            example@email.com
          </div>
        </div>

        <div>
          <div className="text-text-secondary text-xl font-semibold mb-2.5">
            Shipping Address
          </div>
          <div className="text-text-primary text-base flex items-start gap-x-1.5">
            <MapPin className="w-5 h-5 mt-0.5" />
            <span className="max-w-60">
              62 Elm Tree Ave, Coventry, West Midlands, UK
            </span>
          </div>
        </div>

        <div>
          <div className="text-text-secondary mb-2.5 text-xl font-semibold">
            Payment Method
          </div>
          <div className="text-text-primary text-base font-semibold">
            Credit Card
          </div>
          <div className="text-base text-text-secondary">**** **** **** 4242</div>
          <span className="px-4 py-1 rounded-full text-sm font-medium bg-success-secondary text-success-primary">
            Paid
          </span>
        </div>
      </div>
    </div>
  );
};

export default BuyerInformation;
