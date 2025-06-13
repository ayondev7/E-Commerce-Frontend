import React from 'react'
import CheckoutProcess from './CheckoutProcess'
import ShippingInfoForm from './ShippingInfoForm'

export default function Checkout() {
  return (
    <div className="w-full">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary mb-1">Checkout</h1>
        <p className="text-base text-text-secondary">Please review and complete your purchase</p>
      </div>
     <div className='my-10'>
         <CheckoutProcess />
     </div>
      <ShippingInfoForm />
    </div>
  )
}
