import React from 'react'
import CheckoutProcess from './CheckoutProcess'
import ShippingInfoForm from './ShippingInfoForm'

export default function Checkout() {
  return (
    <div className="w-full p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Checkout</h1>
        <p className="text-sm text-gray-600">Please review and complete your purchase</p>
      </div>
      <CheckoutProcess />
      <ShippingInfoForm />
    </div>
  )
}
