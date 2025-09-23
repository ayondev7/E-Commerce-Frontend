import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { ProductFormData, SimplifiedProduct } from '@/types/productTypes';
import { PRODUCT_ENDPOINTS } from '@/endpoints';

interface SelectedProduct {
  productId: string;
  quantity: number;
}

interface ResponseData {
  products: SimplifiedProduct[];
}

export const PRODUCTS_BY_ID_QUERY_KEY = ['productsById'];
export const PRODUCT_QUERY_KEY = ['products'];
export const SINGLE_PRODUCT_QUERY_KEY = ['singleProduct'];


export const useSingleProduct = (productId?: string) => {
  return useQuery<ProductFormData, Error>({
    queryKey: [...SINGLE_PRODUCT_QUERY_KEY, productId],
    queryFn: async () => {
      if (!productId) throw new Error('Product ID is required');
      const response = await apiClient.get(`${PRODUCT_ENDPOINTS.GET_BY_ID}/${productId}`);
      return response.data;
    },
    enabled: !!productId,
    staleTime: 0,
  });
};

export const useProducts = () => {
  return useQuery<{ products: SimplifiedProduct[] }>({
    queryKey: PRODUCT_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get(PRODUCT_ENDPOINTS.GET_ALL);
      return response.data;
    },
    staleTime: 0, 
  });
};

export const useProductsById = (
  selectedProducts: SelectedProduct[] | undefined
) => {
  return useQuery<ResponseData, Error>({
    queryKey: [...PRODUCTS_BY_ID_QUERY_KEY, selectedProducts],
    queryFn: async () => {
      const response = await apiClient.post(PRODUCT_ENDPOINTS.GET_ALL_BY_ID, {
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
      const response = await apiClient.post(PRODUCT_ENDPOINTS.CREATE, formData, {
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

      const response = await apiClient.get(`${PRODUCT_ENDPOINTS.SEARCH}?${params.toString()}`);
      return response.data;
    },
    enabled:false,
    staleTime: 0,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await apiClient.delete(`${PRODUCT_ENDPOINTS.DELETE}/${productId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEY });
      queryClient.refetchQueries({ queryKey: PRODUCT_QUERY_KEY });
    },
  });
};

