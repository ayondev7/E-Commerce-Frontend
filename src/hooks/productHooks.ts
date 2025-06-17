import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { SimplifiedProduct } from '@/types/productTypes';

export const PRODUCTS_BY_ID_QUERY_KEY = ['productsById'];
export const PRODUCT_QUERY_KEY = ['products'];

export const useProducts = () => {
  return useQuery<{ products: SimplifiedProduct[] }>({
    queryKey: PRODUCT_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get('api/products/get-all');
      return response.data;
    },
    staleTime: 0, 
  });
};


interface SelectedProduct {
  productId: string;
  quantity: number;
}

interface ResponseData {
  products: SimplifiedProduct[];
}

export const useProductsById = (
  selectedProducts: SelectedProduct[] | undefined
) => {
  return useQuery<ResponseData, Error>({
    queryKey: [...PRODUCTS_BY_ID_QUERY_KEY, selectedProducts],
    queryFn: async () => {
      const response = await apiClient.post('/api/products/get-all-by-id', {
        products: selectedProducts?.map(({ productId, quantity }) => ({
          id: productId,
          quantity,
        })),
      });
      return response.data;
    },
    enabled: !!selectedProducts && selectedProducts.length > 0,
    staleTime: 0,
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
    enabled:false,
    staleTime: 0,
  });
};

