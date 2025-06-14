import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
export const PRODUCT_QUERY_KEY = ['products'];
import { SimplifiedProduct } from '@/types/productTypes';

export const useProducts = () => {
  return useQuery<{ products: SimplifiedProduct[] }>({
    queryKey: PRODUCT_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get('api/products/get-all');
      return response.data;
    },
    staleTime: 1000 * 60 * 5, 
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEY });
    },
  });
};
