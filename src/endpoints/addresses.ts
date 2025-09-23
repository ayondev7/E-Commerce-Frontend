import { BASE_API_URL } from './base';

export const ADDRESS_ENDPOINTS = {
  GET_ALL: `${BASE_API_URL}/addresses/all`,
  ADD: `${BASE_API_URL}/addresses/add`,
  UPDATE: `${BASE_API_URL}/addresses`,
  DELETE: `${BASE_API_URL}/addresses`,
  SET_DEFAULT: `${BASE_API_URL}/addresses/default`,
} as const;