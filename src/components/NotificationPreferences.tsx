import React, { useState } from 'react';

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? 'bg-button-primary' : 'bg-border-primary'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    wishlistUpdates: true
  });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-sm border border-border-primary p-6 w-full">
      <h2 className="text-xl font-semibold text-text-primary mb-1">Notification Preferences</h2>
      <p className="text-text-secondary text-sm mb-6">Manage how you receive notifications.</p>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between py-3 border-b border-border-primary">
          <span className="text-text-primary font-medium text-xl">Order Updates</span>
          <Toggle enabled={preferences.orderUpdates} onChange={() => togglePreference('orderUpdates')} />
        </div>

        <div className="flex items-center justify-between py-3 border-b border-border-primary">
          <span className="text-text-primary font-medium text-xl">Promotions and deals</span>
          <Toggle enabled={preferences.promotions} onChange={() => togglePreference('promotions')} />
        </div>

        <div className="flex items-center justify-between py-3 border-b border-border-primary">
          <span className="text-text-primary font-medium text-xl">Newsletter</span>
          <Toggle enabled={preferences.newsletter} onChange={() => togglePreference('newsletter')} />
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-text-primary font-medium text-xl">Wishlist updates</span>
          <Toggle enabled={preferences.wishlistUpdates} onChange={() => togglePreference('wishlistUpdates')} />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-button-primary text-white font-medium rounded-sm hover:bg-button-primary/90 transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
