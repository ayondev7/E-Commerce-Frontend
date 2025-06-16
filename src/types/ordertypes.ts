// Base Order interface matching your MongoDB Order schema
export interface Order {
  _id: string;
  customerId: string;
  productId: string;
  quantity: number;
  price: number;
  shippingInfoId: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
}

// Address interface matching your MongoDB Address schema
export interface Address {
  _id: string;
  customerId: string;
  name: string;
  addressLine: string;
  city: string;
  zipCode: string;
  country: string;
  state: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// ShippingInfo interface matching your MongoDB ShippingInfo schema
export interface ShippingInfo {
  _id: string;
  customerId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  addressId: string;
  optionalAddressId?: string | null;
  cashOnDelivery: boolean;
  createdAt: string;
  updatedAt: string;
}

// Product interface for checkout
export interface CheckoutProduct {
  productId: string;
  quantity: number;
  price: number;
}

// Checkout payload interface
export interface CheckoutPayload {
  products: CheckoutProduct[];
  shipping: number;
  subtotal: number;
  tax: number;
  total: number;
}

// Request interface for creating an order (matches your controller expectations)
export interface CreateOrderRequest {
  acceptTerms: boolean;
  billingAddressSame: boolean;
  paymentMethod: "cod" | "gateway";
  promoCode?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  addressId?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  name?: string;
  checkoutPayload: CheckoutPayload;
}

// Response interface for successful order creation
export interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    orders: Order[];
    shippingInfo: ShippingInfo;
    addresses: {
      primary: string;
      optional: string | null;
    };
    orderSummary: {
      totalOrders: number;
      subtotal: number;
      shipping: number;
      tax: number;
      total: number;
    };
  };
}

// Error response interface
export interface OrderErrorResponse {
  success: false;
  message: string;
  error?: string;
}

// Extended Order interface with populated fields (for detailed views)
export interface PopulatedOrder extends Order {
  shippingInfo?: ShippingInfo;
  product?: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
}

// Order status update interfaces
export interface UpdateOrderStatusRequest {
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}

export interface UpdatePaymentStatusRequest {
  paymentStatus: 'pending' | 'paid' | 'failed';
}

export interface CheckoutFormData {
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

  // Payment selection
  paymentMethod: string;

  checkoutPayload?: CheckoutPayload;
}