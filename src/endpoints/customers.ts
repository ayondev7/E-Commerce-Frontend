import { BASE_API_URL } from './base';

export const CUSTOMER_ENDPOINTS = {
  GET_OVERVIEW_STATS: `${BASE_API_URL}/customers/get-overview-stats`,
  REGISTER: `/customers/register`,
  GET_RECENT_ACTIVITY: `${BASE_API_URL}/customers/get-recent-activity`,
  GET_NOTIFICATIONS: `${BASE_API_URL}/customers/get-notifications`,
  GET_ALL_CUSTOMERS: `/customers/get-all-customers`,
  GET_PROFILE: `${BASE_API_URL}/customers/profile`,
  MARK_AS_SEEN: `${BASE_API_URL}/customers/mark-as-seen`,
  UPDATE: `api/customers/update`,
  DELETE: `/customers/delete`,
} as const;