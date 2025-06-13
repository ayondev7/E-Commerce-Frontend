import React from 'react';
import { Download } from 'lucide-react';

export default function PaymentTransactions() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-sm border border-border-primary">
      <div className="mb-6">
        <h2 className="text-2xl font-medium text-text-primary mb-2">Payment Transactions</h2>
        <p className="text-base text-text-secondary">
          Track your payments and download receipts. All transactions are securely processed via XYZ gateway.
        </p>
      </div>

      <div className="space-y-5">
        <div className="border border-border-primary rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-medium text-text-primary mb-1">
                Wireless Noise-Cancelling Headphones
              </h3>
              <p className="text-base text-text-secondary mb-2">Transaction ID: TXN-4532219</p>
              <div className="text-base text-text-secondary">
                <div className="font-semibold text-text-primary">$249.99</div>
                <div>May 26, 2025</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Paid
              </span>
              <button className="flex items-center gap-2 text-base font-medium text-text-primary border border-border-primary px-3 py-1.5 rounded-sm hover:text-text-primary hover:border-border-primary cursor-pointer transition-colors">
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
            </div>
          </div>
        </div>

        <div className="border border-border-primary rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-medium text-text-primary mb-1">
                Wireless Noise-Cancelling Headphones
              </h3>
              <p className="text-base text-text-secondary mb-2">Transaction ID: TXN-4532219</p>
              <div className="text-base text-text-secondary">
                <div className="font-semibold text-text-primary">$249.99</div>
                <div>May 26, 2025</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                Pending
              </span>
              <button className="flex items-center gap-2 text-base font-medium text-text-secondary border border-border-primary px-3 py-1.5 rounded-sm cursor-not-allowed opacity-50">
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
            </div>
          </div>
        </div>

        <div className="border border-border-primary rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-medium text-text-primary mb-1">
                Wireless Noise-Cancelling Headphones
              </h3>
              <p className="text-base text-text-secondary mb-2">Transaction ID: TXN-4532219</p>
              <div className="text-base text-text-secondary">
                <div className="font-semibold text-text-primary">$249.99</div>
                <div>May 26, 2025</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                Failed
              </span>
              <button className="flex items-center gap-2 text-base font-medium text-text-secondary border border-border-primary px-3 py-1.5 rounded-sm cursor-not-allowed opacity-50">
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
