import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { BASE_API_URL } from "@/endpoints";
import { useUserStore } from '@/store/userStore';

export const USER_PROFILE_QUERY_KEY = ['user-profile'];

interface BaseUser {
  _id: string;
  email: string;
  phone?: string;
  name: string;
  image?: string;
}

interface ResponseUser {
  succcess: boolean;
  data: BaseUser;
}

export const useUserProfile = () => {
  const { userType } = useUserStore();

  return useQuery<ResponseUser>({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: async () => {
      if (!userType) throw new Error('User type not set');

      const response = await apiClient.get(`${BASE_API_URL}/${userType}s/get-profile`);
      return response.data;
    },
    enabled: !!userType, 
    staleTime: 0,
  });
};
