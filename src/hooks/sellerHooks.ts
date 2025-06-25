import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import {
  SellerNotificationResponse,
  SellerNotification,
} from "@/types/notificationTypes";

export const SELLER_NOTIFICATIONS_QUERY_KEY = ["seller-notifications"];

export const useGetSellerNotifications = (options: { enabled?: boolean }) => {
  return useQuery<SellerNotificationResponse>({
    queryKey: SELLER_NOTIFICATIONS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/api/sellers/get-notifications");
      return res.data;
    },
    enabled: options.enabled,
    staleTime: 0,
  });
};

export const useUpdateLastNotificationSeen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lastSeenNotificationId: string) => {
      const response = await apiClient.patch(
        "/api/sellers/update-notification",
        {
          lastSeenNotificationId,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SELLER_NOTIFICATIONS_QUERY_KEY,
      });
    },
  });
};
