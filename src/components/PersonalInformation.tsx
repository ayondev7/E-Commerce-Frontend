import React, { useState } from 'react';
import { X } from 'lucide-react';

const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    bio: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Personal Information</h2>
      <p className="text-gray-500 text-sm mb-6">Update your personal details.</p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">First name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Last name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          placeholder="Tell us about yourself"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
        />
      </div>
      
      <div className="flex justify-between">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button className="px-6 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    wishlistUpdates: true
  });

  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const Toggle = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-red-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Notification Preferences</h2>
      <p className="text-gray-500 text-sm mb-6">Manage how you receive notifications.</p>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-gray-900 font-medium">Order Updates</span>
          <Toggle 
            enabled={preferences.orderUpdates}
            onChange={() => togglePreference('orderUpdates')}
          />
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-gray-900 font-medium">Promotions and deals</span>
          <Toggle 
            enabled={preferences.promotions}
            onChange={() => togglePreference('promotions')}
          />
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-gray-900 font-medium">Newsletter</span>
          <Toggle 
            enabled={preferences.newsletter}
            onChange={() => togglePreference('newsletter')}
          />
        </div>
        
        <div className="flex items-center justify-between py-3">
          <span className="text-gray-900 font-medium">Wishlist updates</span>
          <Toggle 
            enabled={preferences.wishlistUpdates}
            onChange={() => togglePreference('wishlistUpdates')}
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'personal' 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'notifications' 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Notifications
          </button>
        </div>
        
        {activeTab === 'personal' && <PersonalInformation />}
        {activeTab === 'notifications' && <NotificationPreferences />}
      </div>
    </div>
  );
};

export default PersonalInformation;