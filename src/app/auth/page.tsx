"use client";
import LoginForm from '@/components/auth/LoginForm';
import SellerRegistrationForm from '@/components/auth/SellerRegistrationForm';
import CustomerRegistrationForm from '@/components/auth/CustomerRegistrationForm';
import React, { useState } from 'react';

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'seller' | 'customer'>('login');

  return (
    <div>
      {activeForm === 'login' && <LoginForm onRegisterClick={setActiveForm} />}
      {activeForm === 'seller' && <SellerRegistrationForm onBack={() => setActiveForm('login')} />}
      {activeForm === 'customer' && <CustomerRegistrationForm onBack={() => setActiveForm('login')} />}
    </div>
  );
}

export default AuthPage;