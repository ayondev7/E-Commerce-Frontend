import React from 'react'
import { Check } from 'lucide-react'

export default function CheckoutProcess() {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center">
          <Check size={16} className="text-blue-600" />
        </div>
        <span className="text-blue-600 font-medium">Cart</span>
      </div>
      <div className="h-0.5 w-10 bg-blue-600"></div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center">
          <Check size={16} className="text-blue-600" />
        </div>
        <span className="text-blue-600 font-medium">Checkout</span>
      </div>
      <div className="h-0.5 w-10 bg-gray-400"></div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center">
          <Check size={16} className="text-gray-400" />
        </div>
        <span className="text-gray-500 font-medium">Confirmation</span>
      </div>
    </div>
  )
}
