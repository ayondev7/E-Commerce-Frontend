import { BASE_API_URL } from './base';

export const USER_ENDPOINTS = {
  GET_PROFILE: `${BASE_API_URL}`, // Dynamic: /${userType}s/get-profile
} as const;