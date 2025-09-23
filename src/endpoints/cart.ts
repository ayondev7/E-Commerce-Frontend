import { BASE_API_URL } from './base';

export const CART_ENDPOINTS = {
  GET_ALL: `${BASE_API_URL}/carts/get-all`,
  ADD_TO_CART: `${BASE_API_URL}/carts/add-to-cart`,
  ADD_PRODUCT_DIRECT: `${BASE_API_URL}/carts/add-product`,
  DELETE_ITEM: `${BASE_API_URL}/carts/delete-cart-item`,
  UPDATE_QUANTITY: `${BASE_API_URL}/carts/update-quantity`,
} as const;