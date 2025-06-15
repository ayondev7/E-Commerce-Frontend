import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { SimplifiedProduct } from '@/types/productTypes';

export const WISHLIST_QUERY_KEY = ['wishlist'];

export interface WishlistGroup {
  sellerId: string;
  sellerName: string;
  products: SimplifiedProduct[];
}

export const useGetWishlist = () => {
  return useQuery<{ sellers: WishlistGroup[] }>({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get('/api/wishlists/get-all');
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const res = await apiClient.post('/api/wishlists/add', { productId });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.delete(`/api/wishlists/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
  });
};

