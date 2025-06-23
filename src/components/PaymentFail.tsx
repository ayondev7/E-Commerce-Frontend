"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";

export default function PaymentFail() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tran_id = searchParams.get('tran_id');
    
    if (tran_id) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/fail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tran_id }),
      }).catch(console.error);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed. Please try again.
        </p>
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-sm text-red-800">
            Your order has been cancelled and no charges were made.
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => router.push('/checkout')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/shopping-cart')}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
}