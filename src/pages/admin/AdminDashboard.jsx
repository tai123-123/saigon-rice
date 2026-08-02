import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useStore } from '../../context/StoreContext';
import { 
  FaShoppingBag, FaDollarSign, FaUsers, FaBoxOpen, 
  FaClock, FaCheckCircle, FaChartBar, FaCalendarCheck,
  FaArrowUp, FaTimesCircle, FaBan, FaHourglassHalf, FaExclamationTriangle
} from 'react-icons/fa';

export const AdminDashboard = () => {
  const { orders, products, subscriptions, customers, getStats } = useStore();
  const stats = getStats();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const dashboardCards = [
    { label: "Total Revenue", val: formatPrice(stats.totalRevenue), desc: "Completed orders only", icon: <FaDollarSign />, color: "bg-emerald-500/10 text-emerald-600" },
    { label: "Today's Revenue", val: formatPrice(stats.todayRevenue), desc: "Today's completed orders", icon: <FaDollarSign />, color: "bg-amber-500/10 text-amber-600" },
    { label: "Monthly Revenue", val: formatPrice(stats.monthlyRevenue), desc: "Current month revenue", icon: <FaDollarSign />, color: "bg-indigo-500/10 text-indigo-600" },
    { label: "Average Order Value", val: formatPrice(stats.averageOrderValue), desc: "Avg completed order value", icon: <FaChartBar />, color: "bg-purple-500/10 text-purple-600" },

    { label: "Total Orders", val: stats.totalOrders, desc: "All system orders", icon: <FaShoppingBag />, color: "bg-blue-500/10 text-blue-600" },
    { label: "Completed Orders", val: stats.completedOrders, desc: "Delivered status", icon: <FaCheckCircle />, color: "bg-teal-500/10 text-teal-600" },
    { label: "Pending Orders", val: stats.pendingOrders, desc: "Processing/Shipping status", icon: <FaHourglassHalf />, color: "bg-yellow-500/10 text-yellow-600" },
    { label: "Cancelled Orders", val: stats.cancelledOrders, desc: "Cancelled status", icon: <FaTimesCircle />, color: "bg-rose-500/10 text-rose-600" },

    { label: "Today's Orders", val: stats.todayOrders, desc: "Placed today", icon: <FaClock />, color: "bg-cyan-500/10 text-cyan-600" },
    { label: "Monthly Orders", val: stats.monthlyOrders, desc: "Placed this month", icon: <FaClock />, color: "bg-sky-500/10 text-sky-600" },
    { label: "Registered Customers", val: customers.length, desc: "Registered accounts", icon: <FaUsers />, color: "bg-violet-500/10 text-violet-600" },
    { label: "Active Subscriptions", val: subscriptions.filter(s => s.status === 'Active').length, desc: "Active auto-delivery", icon: <FaCalendarCheck />, color: "bg-teal-500/10 text-teal-600" },

    { label: "Products Catalog", val: stats.totalProducts, desc: "Rice grain varieties", icon: <FaBoxOpen />, color: "bg-orange-500/10 text-orange-600" },
    { label: "Low Stock Items", val: stats.lowStockProducts, desc: "Below 5 bags warning", icon: <FaExclamationTriangle />, color: "bg-amber-500/10 text-amber-600" },
    { label: "Out of Stock Items", val: stats.outOfStockProducts, desc: "0 bags left", icon: <FaBan />, color: "bg-rose-500/10 text-rose-600" }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Title */}
        <div className="text-left space-y-1">
          <h2 className="text-2xl font-bold font-serif text-secondary-dark m-0">Shopify-grade Administration Overview</h2>
          <p className="text-xs text-secondary/60 m-0">Real-time indicators showing store sales metrics, inventory catalog, and shipment queues.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {dashboardCards.map((card, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-5 border border-secondary/10 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-secondary/50 uppercase tracking-wider">{card.label}</span>
                <div className={`p-2.5 rounded-xl ${card.color} text-xs`}>{card.icon}</div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-black text-secondary-dark leading-tight">{card.val}</span>
                <span className="text-[9px] text-secondary/40 font-medium mt-0.5">{card.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Two Columns for detail summary logs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Orders table widget */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-secondary-dark uppercase tracking-wider m-0">Recent Order Activity</h3>
              <Link to="/admin/orders" className="text-xs font-bold text-primary hover:underline">View All Orders</Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-soft-gray text-secondary/50 font-bold uppercase tracking-wider">
                    <th className="pb-3 pl-1">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Total Amount</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-soft-gray font-semibold text-secondary-dark">
                  {orders.slice(0, 5).map((o, idx) => (
                    <tr key={idx} className="hover:bg-soft-gray/30 transition-colors">
                      <td className="py-3.5 pl-1 text-primary">#{o.id}</td>
                      <td>{o.customerName}</td>
                      <td>{formatPrice(o.totalAmount)}</td>
                      <td>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                          o.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {o.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-6 text-center text-secondary/50 italic font-medium">No order activity logged yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick actions panel */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm space-y-4">
            <h3 className="font-bold text-xs text-secondary-dark uppercase tracking-wider m-0 text-left">Seller Console Shortcuts</h3>
            
            <div className="flex flex-col gap-2">
              <Link to="/admin/products" className="py-3 px-4 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-2xl text-xs font-bold text-primary flex items-center justify-between transition-colors">
                <span>Add & Modify Rice Grains</span>
                <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full">New</span>
              </Link>
              <Link to="/admin/inventory" className="py-3 px-4 bg-secondary/5 hover:bg-secondary/10 border border-secondary/10 rounded-2xl text-xs font-bold text-secondary-dark flex items-center justify-between transition-colors">
                <span>Check Low Stock Levels</span>
                <span className="text-[10px] bg-secondary text-white px-2 py-0.5 rounded-full">Alerts</span>
              </Link>
              <Link to="/admin/analytics" className="py-3 px-4 bg-accent/10 hover:bg-accent/20 border border-accent/20 rounded-2xl text-xs font-bold text-primary-dark flex items-center justify-between transition-colors">
                <span>View Profit Charts</span>
                <span className="text-[10px] bg-primary-dark text-white px-2 py-0.5 rounded-full">Recharts</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
