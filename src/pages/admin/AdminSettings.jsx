import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export const AdminSettings = ({ onShowToast }) => {
  const [shopName, setShopName] = useState('Saigon Rice Headquarters');
  const [shippingFee, setShippingFee] = useState('30000');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('500000');
  const [emailNotification, setEmailNotification] = useState(true);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (onShowToast) onShowToast('Admin settings saved successfully!', 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Title */}
        <div className="text-left space-y-1">
          <h2 className="text-2xl font-bold font-serif text-secondary-dark m-0">System & Console Settings</h2>
          <p className="text-xs text-secondary/60 m-0">Configure store metadata parameters, shipping rules, and email alert switches.</p>
        </div>

        {/* Configurations Form */}
        <div className="bg-white rounded-3xl p-8 border border-secondary/10 shadow-sm max-w-2xl text-left space-y-6">
          <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0 border-b border-soft-gray pb-3">E-Commerce Configuration Sheet</h3>
          
          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs font-semibold text-secondary-dark">
            <div className="space-y-1">
              <label className="block">Shop Registry Name</label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block">Flat Shipping Fee (VND)</label>
                <input
                  type="number"
                  value={shippingFee}
                  onChange={(e) => setShippingFee(e.target.value)}
                  className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block">Free Shipping Threshold (VND)</label>
                <input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(e.target.value)}
                  className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 outline-none"
                />
              </div>
            </div>

            {/* Notification switches */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-secondary-dark block">System Notifications</label>
              <label className="flex items-center gap-2 text-xs font-semibold text-secondary-dark cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotification}
                  onChange={() => setEmailNotification(!emailNotification)}
                  className="accent-primary w-4 h-4 rounded"
                />
                <span>Email me whenever a customer places an order or triggers a subscription renewal.</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-8 py-3 rounded-full shadow transition-all cursor-pointer pt-2"
            >
              Save Configuration Settings
            </button>
          </form>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
