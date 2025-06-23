export interface Notification {
  _id: string;
  customerId: string;
  wishlistId?: string;
  orderId?: string;
  activityStatus: string;
  activityType: string;
  createdAt: string;
  updatedAt: string;
  isNew: boolean;
}

export interface NotificationsResponse {
  success: boolean;
  notifications: Notification[];
}