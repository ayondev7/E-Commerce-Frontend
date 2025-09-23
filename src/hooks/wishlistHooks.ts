import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { WishlistDocument, WishlistGroup } from "@/types/wishlistTypes";
import { WISHLIST_ENDPOINTS } from "@/endpoints";
import {
  CUSTOMER_ACTIVITIES_QUERY_KEY,
  CUSTOMER_STATS_QUERY_KEY,
  CUSTOMER_NOTIFICATIONS_QUERY_KEY,
} from "./customerHooks";

export const WISHLIST_QUERY_KEY = ["wishlist"];
export const GET_ALL_LISTS_QUERY_KEY = ["list"];

export const useGetWishlist = () => {
  return useQuery<{ lists: WishlistGroup[] }>({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get(WISHLIST_ENDPOINTS.GET_ALL);
      return res.data;
    },
    staleTime: 0,
  });
};

export const useCreateWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string) => {
      const res = await apiClient.post(WISHLIST_ENDPOINTS.CREATE_LIST, { title });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_ALL_LISTS_QUERY_KEY });
      queryClient.refetchQueries({
        queryKey: GET_ALL_LISTS_QUERY_KEY,
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      wishlistId,
      productId,
    }: {
      wishlistId: string;
      productId: string;
    }) => {
      const res = await apiClient.post(WISHLIST_ENDPOINTS.ADD_TO_LIST, {
        wishlistId,
        productId,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_ALL_LISTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CUSTOMER_STATS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CUSTOMER_NOTIFICATIONS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: CUSTOMER_ACTIVITIES_QUERY_KEY,
      });
    },
  });
};

export const useGetAllLists = () => {
  return useQuery<{ wishlists: WishlistDocument[] }>({
    queryKey: GET_ALL_LISTS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get(WISHLIST_ENDPOINTS.GET_ALL_LISTS);
      return res.data;
    },
    staleTime: 0,
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      wishlistId,
      productId,
    }: {
      wishlistId: string;
      productId: string | string[];
    }) => {
      const res = await apiClient.request({
        url: `${WISHLIST_ENDPOINTS.DELETE_ITEM}/${wishlistId}`,
        method: "DELETE",
        data: { productId },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_ALL_LISTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CUSTOMER_STATS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: CUSTOMER_ACTIVITIES_QUERY_KEY,
      });
    },
  });
};
