import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { ADDRESS_ENDPOINTS } from "@/endpoints";

export interface Address {
  _id: string;
  addressLine: string;
  city: string;
  zipCode: string;
  country: string;
  state: string;
  name: string;
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddressPayload {
  addressLine: string;
  city: string;
  zipCode: string;
  name: string;
  country: string;
  state: string;
  isDefault?: boolean;
}

const ADDRESS_QUERY_KEY = ["addresses"];

export const useGetAddresses = () => {
  return useQuery<Address[]>({
    queryKey: ADDRESS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get(ADDRESS_ENDPOINTS.GET_ALL);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddressPayload) => {
      const res = await apiClient.post(ADDRESS_ENDPOINTS.ADD, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      addressId,
      updates,
    }: {
      addressId: string;
      updates: Partial<AddressPayload>;
    }) => {
      const res = await apiClient.patch(`${ADDRESS_ENDPOINTS.UPDATE}/${addressId}`, updates);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressId: string) => {
      const res = await apiClient.delete(`${ADDRESS_ENDPOINTS.DELETE}/${addressId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY });
    },
  });
};

export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressId: string) => {
      const res = await apiClient.patch(`${ADDRESS_ENDPOINTS.SET_DEFAULT}/${addressId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY });
    },
  });
};
