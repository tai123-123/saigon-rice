import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useStore } from '../../context/StoreContext';
import { FaTrash, FaSearch, FaUserTag, FaBan, FaCheck, FaTimes, FaEye } from 'react-icons/fa';

export const AdminCustomers = ({ onShowToast }) => {
  const { customers, orders, disableAccount, deleteCustomer } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingCustomer, setViewingCustomer] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleDisableToggle = (email) => {
    disableAccount(email);
    if (onShowToast) onShowToast("Customer status updated successfully.", 'success');
  };

  const handleDelete = (email) => {
    if (!window.confirm("Are you sure you want to permanently delete this customer account?")) return;
    deleteCustomer(email);
    if (onShowToast) onShowToast("Customer account deleted successfully.", 'info');
  };

  const customersList = customers.map(u => {
    const customerOrders = orders.filter(o => o.customerEmail === u.email);
    const totalOrders = customerOrders.length;
    const totalSpending = customerOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const latestPurchase = customerOrders.length > 0 ? customerOrders[0].orderDate : 'N/A';
    
    return {
      ...u,
      totalOrders,
      totalSpending,
      latestPurchase,
      registrationDate: u.registrationDate || new Date().toISOString().split('T')[0]
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
          <p className="text-xs text-secondary/60 m-0">Verify user credentials, active delivery counts, total spending history, or disable accounts.</p>
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
                  <th className="py-4 px-6">Orders</th>
                  <th className="py-4 px-6">Total Spending</th>
                  <th className="py-4 px-6">Latest Purchase</th>
                  <th className="py-4 px-6">Status</th>
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
                    <td className="py-4 px-6 text-center font-bold">{c.totalOrders}</td>
                    <td className="py-4 px-6">{formatPrice(c.totalSpending)}</td>
                    <td className="py-4 px-6 font-normal">{c.latestPurchase}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        c.disabled ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {c.disabled ? 'Disabled' : 'Active'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2.5">
                        <button onClick={() => setViewingCustomer(c)} className="p-2 text-secondary hover:text-primary transition-colors cursor-pointer" title="View details"><FaEye /></button>
                        <button onClick={() => handleDisableToggle(c.email)} className={`p-2 transition-colors cursor-pointer ${c.disabled ? 'text-emerald-600 hover:text-emerald-850' : 'text-amber-500 hover:text-amber-700'}`} title={c.disabled ? "Enable account" : "Disable account"}>{c.disabled ? <FaCheck /> : <FaBan />}</button>
                        <button onClick={() => handleDelete(c.email)} className="p-2 text-rose-500 hover:text-rose-700 transition-colors cursor-pointer" title="Delete"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-secondary/50 italic font-medium">No customer matching selected search query.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* DETAIL MODAL popup */}
      {viewingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary-dark/60 backdrop-blur-xs" onClick={() => setViewingCustomer(null)} />
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 space-y-6 text-left border border-secondary/10 shadow-2xl">
            <button onClick={() => setViewingCustomer(null)} className="absolute top-4 right-4 text-secondary hover:text-primary cursor-pointer"><FaTimes /></button>
            <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0">Customer Account Details</h3>
            
            <div className="space-y-4 text-xs font-semibold text-secondary-dark/95">
              <p className="border-b border-soft-gray pb-2">Full Name: <strong className="text-secondary-dark">{viewingCustomer.fullName}</strong></p>
              <p className="border-b border-soft-gray pb-2">Contact Email: <strong>{viewingCustomer.email}</strong></p>
              <p className="border-b border-soft-gray pb-2">Phone Number: <strong>{viewingCustomer.phone}</strong></p>
              <p className="border-b border-soft-gray pb-2">Registration Date: <strong>{viewingCustomer.registrationDate}</strong></p>
              <p className="border-b border-soft-gray pb-2">Default Address: <strong>{viewingCustomer.addresses?.[0] || 'No saved address.'}</strong></p>
              <p className="border-b border-soft-gray pb-2">Total Shopping Spend: <strong className="text-primary">{formatPrice(viewingCustomer.totalSpending)}</strong></p>
              <p className="pb-2">Account Status: <strong className={viewingCustomer.disabled ? "text-rose-500" : "text-emerald-600"}>{viewingCustomer.disabled ? 'Disabled' : 'Active'}</strong></p>
            </div>
            
            <button
              onClick={() => setViewingCustomer(null)}
              className="w-full bg-soft-gray text-secondary-dark font-bold text-xs py-3 rounded-full cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCustomers;
