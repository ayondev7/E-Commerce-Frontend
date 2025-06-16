import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userType: 'customer' | 'seller' | null;
  name: string;
  image: string | null;
  setUser: (data: { userType: 'customer' | 'seller'; name: string; image: string | null }) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userType: null,
      name: '',
      image: null,
      setUser: ({ userType, name, image }) => set({ userType, name, image }),
      resetUser: () => set({ userType: null, name: '', image: null }),
    }),
    {
      name: 'user-store', 
    }
  )
);
