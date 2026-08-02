import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import SubscriptionCard from '../components/SubscriptionCard';
import DeliveryTracker from '../components/DeliveryTracker';
import { FaUser, FaHistory, FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaTimesCircle, FaPause, FaPlay, FaRegBell, FaChartLine } from 'react-icons/fa';

export const Dashboard = ({ onShowToast }) => {
  const { currentUser, updateProfile } = useAuth();
  const { orders, updateOrderStatus } = useStore();
  const customerOrders = orders.filter(o => o.customerEmail === currentUser.email);
  const [activeTab, setActiveTab] = useState('orders');

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [phone, setPhone] = useState(currentUser.phone);

  const [newAddress, setNewAddress] = useState('');
  const [trackingOrderId, setTrackingOrderId] = useState(() => {
    return customerOrders[0]?.id || null;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleUpdateProfileSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      if (onShowToast) onShowToast('Please fill in all required fields.', 'error');
      return;
    }
    updateProfile({ fullName, phone });
    setIsEditingProfile(false);
    if (onShowToast) onShowToast('Personal details updated successfully!', 'success');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress.trim()) return;
    const currentAddresses = currentUser.addresses || [];
    if (currentAddresses.includes(newAddress.trim())) {
      if (onShowToast) onShowToast('This address already exists.', 'error');
      return;
    }
    const updatedAddresses = [...currentAddresses, newAddress.trim()];
    updateProfile({ addresses: updatedAddresses });
    setNewAddress('');
    if (onShowToast) onShowToast('Address added successfully!', 'success');
  };

  const handleDeleteAddress = (addr) => {
    const currentAddresses = currentUser.addresses || [];
    const updatedAddresses = currentAddresses.filter(a => a !== addr);
    updateProfile({ addresses: updatedAddresses });
    if (onShowToast) onShowToast('Address deleted successfully.', 'success');
  };

  const handleRegisterSubscription = (subDetails) => {
    const currentSubs = currentUser.subscriptions || [];
    const subId = 'SUB-' + Math.floor(100000 + Math.random() * 900000);
    const newSubscription = {
      id: subId,
      tierName: subDetails.tier.name,
      riceId: subDetails.activeRice.id,
      riceName: subDetails.activeRice.name,
      frequency: subDetails.frequency,
      price: subDetails.discountedPrice,
      status: 'Active',
      startDate: new Date().toISOString().split('T')[0]
    };

    updateProfile({ subscriptions: [newSubscription, ...currentSubs] });
    if (onShowToast) {
      onShowToast(`Successfully enrolled in ${subDetails.tier.name}!`, 'success');
    }
  };

  const handleToggleSubStatus = (subId) => {
    const currentSubs = currentUser.subscriptions || [];
    const updatedSubs = currentSubs.map(sub => {
      if (sub.id === subId) {
        const nextStatus = sub.status === 'Active' ? 'Paused' : 'Active';
        if (onShowToast) {
          onShowToast(nextStatus === 'Active' ? 'Subscription resumed successfully.' : 'Subscription paused.', 'info');
        }
        return { ...sub, status: nextStatus };
      }
      return sub;
    });
    updateProfile({ subscriptions: updatedSubs });
  };

  const handleCancelSub = (subId) => {
    const currentSubs = currentUser.subscriptions || [];
    const updatedSubs = currentSubs.filter(sub => sub.id !== subId);
    updateProfile({ subscriptions: updatedSubs });
    if (onShowToast) {
      onShowToast('Subscription cancelled.', 'info');
    }
  };

  const subTiers = [
    {
      name: "Small Family Plan",
      description: "Perfect for households with 2 - 3 members.",
      popular: false,
      benefits: [
        "One 5kg bag of organic certified rice",
        "Free doorstep home delivery",
        "Option to swap rice choices after every cycle"
      ]
    },
    {
      name: "Large Family Plan",
      description: "Perfect for larger households with 4 - 6 members.",
      popular: true,
      benefits: [
        "One 10kg bag of premium aromatic rice",
        "Bonus 1kg golden flower sticky rice bag",
        "Free express courier delivery",
        "Flexible pause and resume options"
      ]
    }
  ];

  const getFreqName = (freq) => {
    if (freq === 'Weekly') return 'Weekly';
    if (freq === 'Bi-weekly') return 'Every 2 Weeks';
    return 'Monthly';
  };

  const activeTrackingOrder = customerOrders.find(o => o.id === trackingOrderId);

  return (
    <div className="py-12 bg-soft-gray/10 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-soft-gray pb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-secondary-dark leading-tight m-0">Welcome Back, {currentUser.fullName}</h1>
            <p className="text-xs text-secondary/70 m-0">Manage your recurring subscriptions, delivery addresses, and track active orders.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-2 self-start sm:self-auto">
            <FaRegBell />
            <span>You have 0 new notifications</span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Tabs */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-secondary/5 shadow-sm space-y-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full py-3 px-4 rounded-2xl text-left text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'orders' ? 'bg-primary text-white shadow-md' : 'text-secondary-dark hover:bg-soft-gray'
              }`}
            >
              <FaHistory /> Order History & Live Map
            </button>
            
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`w-full py-3 px-4 rounded-2xl text-left text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'subscriptions' ? 'bg-primary text-white shadow-md' : 'text-secondary-dark hover:bg-soft-gray'
              }`}
            >
              <FaCalendarAlt /> Smart Rice Subscriptions
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full py-3 px-4 rounded-2xl text-left text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'addresses' ? 'bg-primary text-white shadow-md' : 'text-secondary-dark hover:bg-soft-gray'
              }`}
            >
              <FaMapMarkerAlt /> Saved Delivery Addresses
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full py-3 px-4 rounded-2xl text-left text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'profile' ? 'bg-primary text-white shadow-md' : 'text-secondary-dark hover:bg-soft-gray'
              }`}
            >
              <FaUser /> Account Details
            </button>

            {currentUser && currentUser.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                className="w-full py-3 px-4 rounded-2xl text-left text-xs font-bold transition-all flex items-center gap-2.5 bg-accent/20 text-primary-dark hover:bg-accent/30 mt-2 block"
              >
                <FaChartLine /> Seller Admin Panel
              </Link>
            )}
          </div>

          {/* Right Panels */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Profile Panel */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-8 border border-secondary/5 shadow-sm space-y-6">
                <h3 className="font-bold text-sm text-secondary-dark m-0 uppercase tracking-wide">Personal Information</h3>
                
                {isEditingProfile ? (
                  <form onSubmit={handleUpdateProfileSubmit} className="space-y-4 max-w-md">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-secondary-dark block">Full Name *</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-secondary-dark block">Phone Number *</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-2.5 pt-2">
                      <button
                        type="submit"
                        className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-6 py-2.5 rounded-full transition-all cursor-pointer"
                      >
                        Save changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="bg-soft-gray text-secondary-dark font-bold text-xs px-6 py-2.5 rounded-full transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-secondary-dark/85">
                      <div>Full Name: <strong className="text-secondary-dark">{currentUser.fullName}</strong></div>
                      <div>Phone Number: <strong className="text-secondary-dark">{currentUser.phone}</strong></div>
                      <div>Email Address: <strong className="text-secondary-dark">{currentUser.email}</strong></div>
                    </div>
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="bg-soft-gray hover:bg-secondary/10 text-secondary-dark font-bold text-xs px-5 py-2.5 rounded-full transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <FaEdit /> Edit Profile Information
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Addresses Panel */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-3xl p-8 border border-secondary/5 shadow-sm space-y-6">
                <h3 className="font-bold text-sm text-secondary-dark m-0 uppercase tracking-wide">Delivery Address Book</h3>
                
                <form onSubmit={handleAddAddress} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add new delivery address..."
                    required
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="flex-grow bg-soft-gray border border-secondary/15 rounded-full px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-6 py-2.5 rounded-full flex-shrink-0 transition-all cursor-pointer"
                  >
                    Add New
                  </button>
                </form>

                <div className="space-y-3 pt-2">
                  {currentUser.addresses && currentUser.addresses.length > 0 ? (
                    currentUser.addresses.map((addr, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs p-4 bg-soft-gray/50 rounded-2xl border border-soft-gray">
                        <div className="flex items-start gap-2.5 text-left font-medium text-secondary-dark">
                          <FaMapMarkerAlt className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{addr}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteAddress(addr)}
                          className="text-[10px] font-bold text-rose-600 hover:text-rose-800 cursor-pointer ml-4"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-secondary/60 italic font-medium m-0">You haven't saved any delivery addresses yet.</p>
                  )}
                </div>
              </div>
            )}

             {/* Orders Panel */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                
                {activeTrackingOrder && (activeTrackingOrder.orderStatus !== 'Delivered') && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest block">Live Shipment Tracking</span>
                    <DeliveryTracker 
                      orderId={activeTrackingOrder.id}
                      address={activeTrackingOrder.shippingAddress}
                      onFinished={() => {
                        updateOrderStatus(activeTrackingOrder.id, 'Delivered');
                        if (onShowToast) onShowToast('Package delivered successfully!', 'success');
                      }}
                    />
                  </div>
                )}

                <div className="bg-white rounded-3xl p-8 border border-secondary/5 shadow-sm space-y-6">
                  <h3 className="font-bold text-sm text-secondary-dark m-0 uppercase tracking-wide">Transaction History</h3>
                  
                  {customerOrders.length > 0 ? (
                    <div className="divide-y divide-soft-gray">
                      {customerOrders.map((o) => (
                        <div key={o.id} className="py-5 first:pt-0 space-y-3 text-xs font-semibold">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-secondary-dark">
                            <div>
                              Order: <strong className="text-primary">#{o.id}</strong> <span className="text-secondary/40 font-medium">| Date: {o.orderDate}</span>
                            </div>
                            <div className="flex gap-2">
                              {o.orderStatus !== 'Delivered' && (
                                <button
                                  onClick={() => setTrackingOrderId(o.id)}
                                  className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 cursor-pointer"
                                >
                                  Track on Map
                                </button>
                              )}
                              <span className={`px-3 py-1 rounded-full text-[10px] ${
                                o.orderStatus === 'Delivered' 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {o.orderStatus}
                              </span>
                            </div>
                          </div>

                          <div className="bg-soft-gray/50 rounded-2xl p-4 text-left font-light space-y-1.5 text-[11px] text-secondary-dark/80">
                            {o.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span>{it.name} ({it.bagSize}) x {it.quantity}</span>
                                <span className="font-bold">{formatPrice(Math.round(it.price * (1 - (it.discount || 0) / 100)) * it.quantity)}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center text-xs pt-1">
                            <span className="text-secondary/60">Method: {o.paymentMethod === 'COD' ? 'Cash on delivery' : 'Vietcombank bank wire'}</span>
                            <span className="text-secondary-dark">Total: <strong className="text-primary text-sm font-black">{formatPrice(o.totalAmount)}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-secondary/60 italic font-medium m-0">You haven't placed any orders at Saigon Rice yet.</p>
                  )}
                </div>

              </div>
            )}

            {/* Subscriptions Panel */}
            {activeTab === 'subscriptions' && (
              <div className="space-y-10">
                
                {/* Active Subscriptions */}
                <div className="bg-white rounded-3xl p-8 border border-secondary/5 shadow-sm space-y-6">
                  <h3 className="font-bold text-sm text-secondary-dark m-0 uppercase tracking-wide">Active Recurring Subscriptions</h3>
                  
                  {currentUser.subscriptions && currentUser.subscriptions.length > 0 ? (
                    <div className="divide-y divide-soft-gray">
                      {currentUser.subscriptions.map((sub) => (
                        <div key={sub.id} className="py-5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-semibold text-secondary-dark">
                          <div className="text-left space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-secondary-dark m-0">{sub.tierName}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] ${
                                sub.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {sub.status === 'Active' ? 'Active' : 'Paused'}
                              </span>
                            </div>
                            <p className="text-[10px] text-secondary/70 m-0">Rice Choice: <strong>{sub.riceName}</strong></p>
                            <p className="text-[10px] text-secondary/70 m-0">Frequency: <strong>{getFreqName(sub.frequency)}</strong> • Price: <strong>{formatPrice(sub.price)}</strong></p>
                            <p className="text-[10px] text-secondary/40 m-0">Subscription ID: #{sub.id} • Start Date: {sub.startDate}</p>
                          </div>

                          <div className="flex gap-2 self-start sm:self-center">
                            <button
                              onClick={() => handleToggleSubStatus(sub.id)}
                              className={`px-3 py-1.5 rounded-full border text-[10px] font-bold cursor-pointer transition-all ${
                                sub.status === 'Active'
                                  ? 'bg-amber-500 border-amber-500 text-white hover:bg-amber-600'
                                  : 'bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-600'
                              }`}
                            >
                              {sub.status === 'Active' ? <span className="flex items-center gap-1"><FaPause size={8} /> Pause</span> : <span className="flex items-center gap-1"><FaPlay size={8} /> Resume</span>}
                            </button>
                            <button
                              onClick={() => handleCancelSub(sub.id)}
                              className="px-3 py-1.5 rounded-full border border-rose-300 hover:border-rose-500 text-rose-600 hover:bg-rose-50 hover:text-rose-800 text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1"
                            >
                              <FaTimesCircle size={9} /> Cancel
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-secondary/60 italic font-medium m-0">You don't have any active recurring subscriptions.</p>
                  )}
                </div>

                {/* Subscriptions Options */}
                <div className="space-y-6">
                  <div className="text-left space-y-1.5">
                    <h3 className="text-lg font-bold font-serif text-secondary-dark m-0">Enroll in a New Recurring Subscription</h3>
                    <p className="text-xs text-secondary/60 font-light m-0">Select one of our optimized subscription tiers to get started.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {subTiers.map((tier, idx) => (
                      <SubscriptionCard
                        key={idx}
                        tier={tier}
                        onSubscribe={handleRegisterSubscription}
                      />
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
