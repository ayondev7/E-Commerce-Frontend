import { BASE_API_URL } from './base';

export const ORDER_ENDPOINTS = {
  GET_ALL: `${BASE_API_URL}/orders/get-all`,
  GET_PAYMENTS: `${BASE_API_URL}/orders/get-payments`,
  GET_SELLER_ORDERS: `${BASE_API_URL}/orders/get-seller-orders`,
  ADD_ORDER: `${BASE_API_URL}/orders/add-order`,
  GET_ORDER_STATUS_COUNTS: `${BASE_API_URL}/orders/get-order-status-counts`,
} as const;