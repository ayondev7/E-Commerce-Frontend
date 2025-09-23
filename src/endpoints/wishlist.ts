import { BASE_API_URL } from './base';

export const WISHLIST_ENDPOINTS = {
  GET_ALL: `${BASE_API_URL}/wishlists/get-all`,
  GET_ALL_LISTS: `${BASE_API_URL}/wishlists/get-all-lists`,
  CREATE_LIST: `${BASE_API_URL}/wishlists/create-list`,
  ADD_TO_LIST: `${BASE_API_URL}/wishlists/add-to-list`,
  DELETE_ITEM: `${BASE_API_URL}/wishlists/delete-wishlist-item`,
} as const;