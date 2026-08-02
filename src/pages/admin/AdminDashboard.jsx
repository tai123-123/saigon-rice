import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { products } from '../../data/products';
import { useAuth } from '../../context/AuthContext';
import { 
  FaShoppingBag, FaDollarSign, FaUsers, FaBoxOpen, 
  FaClock, FaCheckCircle, FaChartBar, FaCalendarCheck,
  FaArrowUp, FaArrowDown 
} from 'react-icons/fa';

export const AdminDashboard = () => {
  const { users } = useAuth();

  // Aggregate stats from LocalStorage/States
  const customers = users.filter(u => u.role !== 'admin');
  
  // Flatten orders from all users
  const allOrders = users.reduce((acc, user) => {
    if (user.orders) {
      const userOrdersWithCustomer = user.orders.map(o => ({
        ...o,
        customerName: user.fullName,
        phone: user.phone
      }));
      return [...acc, ...userOrdersWithCustomer];
    }
    return acc;
  }, []);

  const totalRevenue = allOrders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = allOrders.filter(o => o.status !== 'Delivered').length;
  const completedOrders = allOrders.filter(o => o.status === 'Delivered').length;
  
  // Subscriptions count
  const activeSubsCount = users.reduce((acc, user) => {
    if (user.subscriptions) {
      const activeUserSubs = user.subscriptions.filter(s => s.status === 'Active');
      return acc + activeUserSubs.length;
    }
    return acc;
  }, 0);

  // Format helper
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const stats = [
    { label: "Total Orders", val: allOrders.length, trend: allOrders.length > 0 ? "+12.5%" : "0%", up: true, icon: <FaShoppingBag />, color: "bg-emerald-500/10 text-emerald-600" },
    { label: "Total Revenue", val: formatPrice(totalRevenue), trend: totalRevenue > 0 ? "+8.3%" : "0%", up: true, icon: <FaDollarSign />, color: "bg-amber-500/10 text-amber-600" },
    { label: "Total Customers", val: customers.length, trend: customers.length > 0 ? "+4.1%" : "0%", up: true, icon: <FaUsers />, color: "bg-indigo-500/10 text-indigo-600" },
    { label: "Total Grains Catalog", val: products.length, trend: "Stable", up: true, icon: <FaBoxOpen />, color: "bg-blue-500/10 text-blue-600" },
    { label: "Pending Shipments", val: pendingOrders, trend: pendingOrders > 0 ? "-2.4%" : "0%", up: false, icon: <FaClock />, color: "bg-rose-500/10 text-rose-600" },
    { label: "Completed Orders", val: completedOrders, trend: completedOrders > 0 ? "+14.2%" : "0%", up: true, icon: <FaCheckCircle />, color: "bg-teal-500/10 text-teal-600" },
    { label: "Monthly Sales Target", val: "84%", trend: "+5.0%", up: true, icon: <FaChartBar />, color: "bg-purple-500/10 text-purple-600" },
    { label: "Active Subscriptions", val: activeSubsCount, trend: activeSubsCount > 0 ? "+10%" : "0%", up: true, icon: <FaCalendarCheck />, color: "bg-cyan-500/10 text-cyan-600" }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Title */}
        <div className="text-left space-y-1">
          <h2 className="text-2xl font-bold font-serif text-secondary-dark m-0">Admin Dashboard Overview</h2>
          <p className="text-xs text-secondary/60 m-0">Real-time indicators showing store sales metrics, inventory catalog, and shipment queues.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((card, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-secondary/60 uppercase tracking-wider">{card.label}</span>
                <div className={`p-3 rounded-2xl ${card.color}`}>{card.icon}</div>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-xl sm:text-2xl font-black text-secondary-dark">{card.val}</span>
                <span className={`text-[10px] font-bold flex items-center gap-0.5 ${
                  card.up ? 'text-emerald-600' : 'text-rose-500'
                }`}>
                  {card.up ? <FaArrowUp size={8} /> : <FaArrowDown size={8} />} {card.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Two Columns for detail summary logs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Orders table widget */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0">Recent Order Activity</h3>
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
                  {allOrders.slice(0, 5).map((o, idx) => (
                    <tr key={idx} className="hover:bg-soft-gray/30 transition-colors">
                      <td className="py-3.5 pl-1 text-primary">#{o.id}</td>
                      <td>{o.customerName}</td>
                      <td>{formatPrice(o.total)}</td>
                      <td>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                          o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {allOrders.length === 0 && (
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
            <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0">Seller Console Shortcuts</h3>
            
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
