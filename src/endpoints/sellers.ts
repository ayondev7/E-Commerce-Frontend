import { BASE_API_URL } from './base';

export const SELLER_ENDPOINTS = {
  GET_NOTIFICATIONS: `${BASE_API_URL}/sellers/get-notifications`,
  GET_PAYMENTS: `${BASE_API_URL}/sellers/get-payments`,
} as const;