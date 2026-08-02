import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { FaTrash, FaSearch, FaUserTag } from 'react-icons/fa';

export const AdminCustomers = ({ onShowToast }) => {
  const { users } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleRemoveCustomer = (email) => {
    if (!window.confirm("Are you sure you want to permanently delete this customer account?")) return;
    
    const savedUsersList = JSON.parse(localStorage.getItem('saigon_rice_all_users')) || [];
    const updated = savedUsersList.filter(u => u.email !== email);
    localStorage.setItem('saigon_rice_all_users', JSON.stringify(updated));
    
    if (onShowToast) onShowToast("Customer account deleted successfully.", 'info');
    window.location.reload();
  };

  const customersList = users
    .filter(u => u.role !== 'admin')
    .map(u => {
      const orders = u.orders || [];
      const totalOrders = orders.length;
      const totalSpending = orders.reduce((sum, o) => sum + o.total, 0);
      return {
        ...u,
        totalOrders,
        totalSpending
      };
    });

  const filteredCustomers = customersList.filter(c => 
    c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Title */}
        <div className="text-left space-y-1">
          <h2 className="text-2xl font-bold font-serif text-secondary-dark m-0">Customer Accounts Registry</h2>
          <p className="text-xs text-secondary/60 m-0">Verify user credentials, active delivery counts, total spending history, or delete inactive profiles.</p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm flex items-center justify-between">
          <div className="flex items-center bg-soft-gray border border-secondary/10 rounded-full px-4 py-2 w-full max-w-sm">
            <FaSearch className="text-secondary/50 mr-2" size={14} />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-secondary-dark placeholder-secondary/50 w-full"
            />
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-3xl overflow-hidden border border-secondary/10 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-soft-gray/50 border-b border-soft-gray text-secondary/60 font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Customer Name</th>
                  <th className="py-4 px-6">Contact Email</th>
                  <th className="py-4 px-6">Phone Number</th>
                  <th className="py-4 px-6">Addresses</th>
                  <th className="py-4 px-6">Orders Count</th>
                  <th className="py-4 px-6">Total Spending</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft-gray text-secondary-dark font-semibold">
                {filteredCustomers.map((c, idx) => (
                  <tr key={idx} className="hover:bg-soft-gray/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-secondary-light/20 flex items-center justify-center text-secondary font-bold">
                          {c.fullName.charAt(0)}
                        </div>
                        <span>{c.fullName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-normal">{c.email}</td>
                    <td className="py-4 px-6 font-normal">{c.phone}</td>
                    <td className="py-4 px-6 font-normal truncate max-w-xs">{c.addresses?.[0] || 'No address saved'}</td>
                    <td className="py-4 px-6 text-center">{c.totalOrders}</td>
                    <td className="py-4 px-6">{formatPrice(c.totalSpending)}</td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleRemoveCustomer(c.email)}
                        className="p-2 text-rose-500 hover:text-rose-700 cursor-pointer"
                        title="Delete Profile"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
