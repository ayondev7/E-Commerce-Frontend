'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore'; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LoginPage = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [userType, setUserType] = useState<'seller' | 'customer'>('seller');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const route = userType === 'seller' ? 'sellers' : 'customers';
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${route}/login`,
        { email, password }
      );

      const { token, accessToken, seller, customer } = res.data;
      const authToken = accessToken || token;
      sessionStorage.setItem('accessToken', authToken);

      const userData = userType === 'seller' ? seller : customer;
      const name =
        userType === 'seller'
          ? userData?.name || 'Seller'
          : `${userData?.firstName || ''} ${userData?.lastName || ''}`.trim();
      const image = userData?.sellerImage || userData?.customerImage || null;

      // ✅ Store user in Zustand
      setUser({
        userType,
        name,
        image,
      });

      router.push(`/${userType}/overview`);
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1">User Type</label>
          <Select value={userType} onValueChange={(value) => setUserType(value as 'seller' | 'customer')}>
            <SelectTrigger className="w-full border p-2 rounded">
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seller">Seller</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
