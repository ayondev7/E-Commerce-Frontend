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
      queryClient.refetchQueries({ queryKey: PRODUCT_QUERY_KEY });
    },
  });
};

export const useSearchProducts = (category?: string, keyword?: string) => {
  return useQuery<{ products: SimplifiedProduct[] }, Error>({
    queryKey: ['searchProducts', category, keyword],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (keyword) params.append('keyword', keyword);

      const response = await apiClient.get(`/api/products/search?${params.toString()}`);
      return response.data;
    },
    enabled: Boolean(category || keyword),
    staleTime: 1000 * 60 * 5,
  });
};

