import { BASE_API_URL } from './base';

export const PRODUCT_ENDPOINTS = {
  GET_ALL: `${BASE_API_URL}/products/shop/get-all`,
  GET_BY_ID: `${BASE_API_URL}/products/shop/get-product`,
  GET_ALL_BY_ID: `${BASE_API_URL}/products/get-all-by-id`,
  CREATE: `/products`,
  SEARCH: `${BASE_API_URL}/products/search`,
  DELETE: `${BASE_API_URL}/products/delete`,
} as const;