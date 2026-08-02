import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { FaPause, FaPlay, FaTimesCircle, FaSearch, FaCalendarAlt } from 'react-icons/fa';

export const AdminSubscriptions = ({ onShowToast }) => {
  const { users } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Extract subscriptions
  const allSubscriptions = users.reduce((acc, user) => {
    if (user.subscriptions) {
      const userSubs = user.subscriptions.map(s => ({
        ...s,
        customerName: user.fullName,
        customerEmail: user.email,
        customerRef: user
      }));
      return [...acc, ...userSubs];
    }
    return acc;
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getFreqName = (freq) => {
    if (freq === 'Weekly') return 'Weekly';
    if (freq === 'Bi-weekly') return 'Every 2 Weeks';
    return 'Monthly';
  };

  const handleToggleStatus = (subId) => {
    const subToFind = allSubscriptions.find(s => s.id === subId);
    if (!subToFind) return;

    const owner = subToFind.customerRef;
    const updatedSubs = owner.subscriptions.map(s => {
      if (s.id === subId) {
        const nextStatus = s.status === 'Active' ? 'Paused' : 'Active';
        if (onShowToast) onShowToast(nextStatus === 'Active' ? `Resumed subscription #${subId}` : `Paused subscription #${subId}`, 'info');
        return { ...s, status: nextStatus };
      }
      return s;
    });

    const updatedUsersList = users.map(u => 
      u.email === owner.email ? { ...u, subscriptions: updatedSubs } : u
    );

    localStorage.setItem('saigon_rice_all_users', JSON.stringify(updatedUsersList));
    const currentUserSession = JSON.parse(localStorage.getItem('saigon_rice_user'));
    if (currentUserSession && currentUserSession.email === owner.email) {
      localStorage.setItem('saigon_rice_user', JSON.stringify({ ...currentUserSession, subscriptions: updatedSubs }));
    }

    window.location.reload();
  };

  const handleCancelSub = (subId) => {
    if (!window.confirm("Are you sure you want to terminate this recurring smart subscription?")) return;

    const subToFind = allSubscriptions.find(s => s.id === subId);
    if (!subToFind) return;

    const owner = subToFind.customerRef;
    const updatedSubs = owner.subscriptions.filter(s => s.id !== subId);

    const updatedUsersList = users.map(u => 
      u.email === owner.email ? { ...u, subscriptions: updatedSubs } : u
    );

    localStorage.setItem('saigon_rice_all_users', JSON.stringify(updatedUsersList));
    const currentUserSession = JSON.parse(localStorage.getItem('saigon_rice_user'));
    if (currentUserSession && currentUserSession.email === owner.email) {
      localStorage.setItem('saigon_rice_user', JSON.stringify({ ...currentUserSession, subscriptions: updatedSubs }));
    }

    if (onShowToast) onShowToast(`Cancelled subscription #${subId}`, 'info');
    window.location.reload();
  };

  const filteredSubs = allSubscriptions.filter(s => 
    s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.riceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Title */}
        <div className="text-left space-y-1">
          <h2 className="text-2xl font-bold font-serif text-secondary-dark m-0">Smart Rice Subscription Management</h2>
          <p className="text-xs text-secondary/60 m-0">Monitor active subscription tiers, pause dispatch schedules, or terminate recurring delivery plans.</p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm flex items-center justify-between">
          <div className="flex items-center bg-soft-gray border border-secondary/10 rounded-full px-4 py-2 w-full max-w-sm">
            <FaSearch className="text-secondary/50 mr-2" size={14} />
            <input
              type="text"
              placeholder="Search by ID, customer name or grain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-secondary-dark placeholder-secondary/50 w-full"
            />
          </div>
        </div>

        {/* Subscriptions Table */}
        <div className="bg-white rounded-3xl overflow-hidden border border-secondary/10 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-soft-gray/50 border-b border-soft-gray text-secondary/60 font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Sub ID</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Rice Choice</th>
                  <th className="py-4 px-6">Plan Tier</th>
                  <th className="py-4 px-6">Frequency</th>
                  <th className="py-4 px-6">Cycle Cost</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Fulfillment Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft-gray text-secondary-dark font-semibold">
                {filteredSubs.map((s) => (
                  <tr key={s.id} className="hover:bg-soft-gray/30 transition-colors">
                    <td className="py-4 px-6 text-primary">#{s.id}</td>
                    <td className="py-4 px-6">
                      <span className="block">{s.customerName}</span>
                      <span className="text-[10px] text-secondary/50 font-normal">{s.customerEmail}</span>
                    </td>
                    <td className="py-4 px-6">{s.riceName}</td>
                    <td className="py-4 px-6">{s.tierName}</td>
                    <td className="py-4 px-6">{getFreqName(s.frequency)}</td>
                    <td className="py-4 px-6">{formatPrice(s.price)}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        s.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(s.id)}
                          className={`p-2 rounded-lg border transition-all cursor-pointer ${
                            s.status === 'Active' ? 'text-amber-600 border-amber-300 bg-amber-50 hover:bg-amber-100' : 'text-emerald-600 border-emerald-300 bg-emerald-50 hover:bg-emerald-100'
                          }`}
                          title={s.status === 'Active' ? "Pause Subscription" : "Resume Subscription"}
                        >
                          {s.status === 'Active' ? <FaPause size={10} /> : <FaPlay size={10} />}
                        </button>
                        <button
                          onClick={() => handleCancelSub(s.id)}
                          className="p-2 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all cursor-pointer"
                          title="Terminate Subscription"
                        >
                          <FaTimesCircle size={10} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredSubs.length === 0 && (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-secondary/50 italic font-medium">No recurring subscription records match.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminSubscriptions;
