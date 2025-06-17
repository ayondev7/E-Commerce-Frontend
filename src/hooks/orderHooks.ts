import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { Order, OrderResponse, CreateOrderRequest, OrderDetailsResponse } from "@/types/ordertypes";

export const ORDERS_QUERY_KEY = ['orders'];
export const SELLER_ORDERS_QUERY_KEY = ['seller-orders'];
export const ORDER_DETAILS_QUERY_KEY = (orderId: string) => ['order-details', orderId];

export const useGetAllOrders = () => {
  return useQuery<{ orders: Order[] }>({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/api/orders/get-all");
      return res.data;
    },
    staleTime: 0,
  });
};

export const useGetOrderDetails = (orderId: string) => {
  return useQuery<OrderDetailsResponse>({
    queryKey: ORDER_DETAILS_QUERY_KEY(orderId),
    queryFn: async () => {
      const res = await apiClient.get(`/api/orders/get-seller-order/${orderId}`);
      return res.data;
    },
    enabled: !!orderId,
    staleTime: 0,
  });
};

export const useGetAllSellerOrders = () => {
  return useQuery<{ orders: Order[] }>({
    queryKey: SELLER_ORDERS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/api/orders/get-seller-orders");
      return res.data;
    },
    staleTime: 0,
  });
};

export const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: CreateOrderRequest) => {
      const res = await apiClient.post("/api/orders/add-order", orderData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
      queryClient.refetchQueries({
        queryKey: ORDERS_QUERY_KEY,
        exact: true,
      });
    },
  });
};