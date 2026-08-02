import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useStore } from '../../context/StoreContext';
import { FaEye, FaEdit, FaTrash, FaPrint, FaSearch, FaTimes, FaFileAlt } from 'react-icons/fa';

export const AdminOrders = ({ onShowToast }) => {
  const { orders, updateOrderStatus, deleteOrder } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null);
  const [statusToUpdate, setStatusToUpdate] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleUpdateStatus = (orderId, nextStatus) => {
    updateOrderStatus(orderId, nextStatus);
    if (onShowToast) onShowToast(`Order #${orderId} status updated to ${nextStatus}`, 'success');
    setSelectedOrder(null);
  };

  const handleDeleteOrder = (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order record?")) return;
    deleteOrder(orderId);
    if (onShowToast) onShowToast(`Order #${orderId} has been deleted.`, 'info');
  };

  // Filter orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = searchQuery
      ? o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerPhone.includes(searchQuery)
      : true;

    const matchesStatus = statusFilter === 'All' ? true : o.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Title */}
        <div className="text-left space-y-1">
          <h2 className="text-2xl font-bold font-serif text-secondary-dark m-0">Fulfillment & Order Logs</h2>
          <p className="text-xs text-secondary/60 m-0">Verify shopper shipment status, dispatch logs, or print checkout invoice records.</p>
        </div>

        {/* Filter controls */}
        <div className="bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center bg-soft-gray border border-secondary/10 rounded-full px-4 py-2 w-full max-w-sm">
            <FaSearch className="text-secondary/50 mr-2" size={14} />
            <input
              type="text"
              placeholder="Search by ID, name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-secondary-dark placeholder-secondary/50 w-full"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-soft-gray border border-secondary/15 rounded-full px-4 py-2 text-xs text-secondary-dark focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending Order">Pending Order</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Preparing Order">Preparing Order</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Nearby">Nearby</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl overflow-hidden border border-secondary/10 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-soft-gray/50 border-b border-soft-gray text-secondary/60 font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Products</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft-gray text-secondary-dark font-semibold">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-soft-gray/30 transition-colors">
                    <td className="py-4 px-6 text-primary">#{o.id}</td>
                    <td className="py-4 px-6">
                      <span className="block">{o.customerName}</span>
                      <span className="text-[10px] text-secondary/50 font-normal">{o.customerPhone}</span>
                    </td>
                    <td className="py-4 px-6 max-w-xs truncate">
                      {o.items.map(it => `${it.name} (${it.quantity})`).join(', ')}
                    </td>
                    <td className="py-4 px-6">{formatPrice(o.totalAmount)}</td>
                    <td className="py-4 px-6 text-[10px] uppercase font-bold">{o.paymentMethod}</td>
                    <td className="py-4 px-6 font-normal">{o.orderDate}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        o.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {o.orderStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setSelectedOrder(o)} className="p-2 text-secondary hover:text-primary transition-colors cursor-pointer" title="View details/Status"><FaEye /></button>
                        <button onClick={() => setInvoiceOrder(o)} className="p-2 text-secondary hover:text-primary transition-colors cursor-pointer" title="Print Invoice"><FaPrint /></button>
                        <button onClick={() => handleDeleteOrder(o.id)} className="p-2 text-rose-500 hover:text-rose-700 transition-colors cursor-pointer" title="Delete"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-secondary/50 italic font-medium">No order log matches selected search query.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* UPDATE STATUS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary-dark/60 backdrop-blur-xs" onClick={() => setSelectedOrder(null)} />
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 space-y-6 text-left">
            <button onClick={() => setSelectedOrder(null)} className="absolute top-4 right-4 text-secondary hover:text-primary cursor-pointer"><FaTimes /></button>
            <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0">Fulfillment Controls #{selectedOrder.id}</h3>
            
            <div className="text-xs space-y-2 text-secondary-dark/95">
              <p>Customer: <strong>{selectedOrder.customerName}</strong></p>
              <p>Address: <strong>{selectedOrder.shippingAddress}</strong></p>
              <p>Current Status: <strong className="text-primary">{selectedOrder.orderStatus}</strong></p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary-dark block">Update Delivery Status:</label>
              <select
                value={statusToUpdate || selectedOrder.orderStatus}
                onChange={(e) => setStatusToUpdate(e.target.value)}
                className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-3 py-2.5 text-xs text-secondary-dark focus:outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Shipping">Shipping</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <button
              onClick={() => handleUpdateStatus(selectedOrder.id, statusToUpdate || selectedOrder.orderStatus)}
              className="w-full bg-primary hover:bg-primary-light text-white font-bold text-xs py-3.5 rounded-full shadow transition-all cursor-pointer"
            >
              Save Delivery Status
            </button>
          </div>
        </div>
      )}

      {/* PRINT INVOICE DIALOG POPUP */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary-dark/60 backdrop-blur-xs" onClick={() => setInvoiceOrder(null)} />
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full relative z-10 space-y-6 text-left border border-secondary/10 shadow-2xl">
            <button onClick={() => setInvoiceOrder(null)} className="absolute top-4 right-4 text-secondary hover:text-primary cursor-pointer"><FaTimes /></button>
            
            {/* Invoice sheet printable layout */}
            <div className="space-y-4 border border-secondary/15 p-6 rounded-2xl bg-amber-50/5">
              <div className="flex items-center justify-between border-b border-soft-gray pb-3">
                <div>
                  <h4 className="font-serif font-black text-primary m-0">SAIGON RICE</h4>
                  <p className="text-[9px] text-secondary/60 m-0">120 Le Loi, District 1, HCMC</p>
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-[10px] text-secondary-dark uppercase tracking-wider m-0">Invoice</h4>
                  <p className="text-[9px] text-secondary/60 m-0">No: #{invoiceOrder.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[10px] text-secondary-dark font-medium leading-relaxed">
                <div>
                  <span className="block font-bold text-secondary/50 uppercase">Customer details:</span>
                  <strong>{invoiceOrder.customerName}</strong><br />
                  Phone: {invoiceOrder.customerPhone}<br />
                  Email: {invoiceOrder.customerEmail}
                </div>
                <div>
                  <span className="block font-bold text-secondary/50 uppercase">Delivery address:</span>
                  {invoiceOrder.shippingAddress}
                </div>
              </div>

              <div className="border-t border-b border-soft-gray py-3">
                <table className="w-full text-[10px] border-collapse font-semibold text-secondary-dark">
                  <thead>
                    <tr className="text-secondary/50 uppercase">
                      <th className="text-left pb-2">Grain Description</th>
                      <th className="text-center pb-2">Qty</th>
                      <th className="text-right pb-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceOrder.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="py-1">{it.name} ({it.bagSize})</td>
                        <td className="text-center py-1">{it.quantity}</td>
                        <td className="text-right py-1">{formatPrice(Math.round(it.price * (1 - (it.discount || 0) / 100)))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center text-xs font-bold text-secondary-dark pt-1">
                <span>Total Payment:</span>
                <span className="text-primary font-black text-sm">{formatPrice(invoiceOrder.totalAmount)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-grow bg-primary hover:bg-primary-light text-white font-bold text-xs py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FaPrint /> Print Invoice PDF
              </button>
              <button
                onClick={() => setInvoiceOrder(null)}
                className="bg-soft-gray text-secondary-dark font-bold text-xs px-6 py-3 rounded-full cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};

export default AdminOrders;
