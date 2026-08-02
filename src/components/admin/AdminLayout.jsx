import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChartLine, FaShoppingBag, FaBoxOpen, FaUsers, FaWarehouse, 
  FaTruck, FaCalendarAlt, FaCog, FaSignOutAlt, FaBars, 
  FaTimes, FaBell, FaSearch, FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';

export const AdminLayout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  // Keep date & time updated
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { notifications, markAllNotificationsRead } = useStore();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <FaChartLine /> },
    { label: "Orders", path: "/admin/orders", icon: <FaShoppingBag /> },
    { label: "Products", path: "/admin/products", icon: <FaBoxOpen /> },
    { label: "Customers", path: "/admin/customers", icon: <FaUsers /> },
    { label: "Inventory", path: "/admin/inventory", icon: <FaWarehouse /> },
    { label: "Delivery Tracking", path: "/admin/delivery", icon: <FaTruck /> },
    { label: "Subscriptions", path: "/admin/subscriptions", icon: <FaCalendarAlt /> },
    { label: "Analytics", path: "/admin/analytics", icon: <FaChartLine /> },
    { label: "Settings", path: "/admin/settings", icon: <FaCog /> }
  ];

  const handleNotificationClick = () => {
    markAllNotificationsRead();
  };

  const formatDate = (date) => {
    return date.toLocaleString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="min-h-screen bg-soft-gray flex text-left">
      
      {/* SIDEBAR - DESKTOP */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 260 }}
        className="hidden md:flex flex-col bg-primary-dark text-white border-r border-white/5 relative flex-shrink-0"
      >
        {/* Toggle Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-7 w-6 h-6 bg-accent hover:bg-accent-hover text-primary-dark rounded-full flex items-center justify-center shadow-lg z-10 cursor-pointer"
        >
          {collapsed ? <FaChevronRight size={10} /> : <FaChevronLeft size={10} />}
        </button>

        {/* Branding header */}
        <div className="h-20 flex items-center justify-center border-b border-white/5 px-4 overflow-hidden">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <span className="font-serif font-black tracking-wider text-accent text-lg">
              {collapsed ? "SR" : "SAIGON RICE"}
            </span>
            {!collapsed && <span className="text-[9px] font-black uppercase bg-accent/20 text-accent px-1.5 py-0.5 rounded">ADMIN</span>}
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="flex-grow py-6 px-3 space-y-1">
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-xs font-bold transition-all relative ${
                  isActive ? 'bg-primary text-white shadow-md' : 'text-soft-gray/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <FaSignOutAlt className="text-sm" />
            {!collapsed && <span>Log out</span>}
          </button>
        </div>
      </motion.aside>

      {/* MOBILE MENU TOGGLE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-primary-dark/60 backdrop-blur-xs"
            />
            {/* Sidebar content */}
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              className="relative w-64 bg-primary-dark text-white flex flex-col h-full shadow-2xl z-10"
            >
              <div className="h-20 flex items-center justify-between px-5 border-b border-white/5">
                <span className="font-serif font-black tracking-wider text-accent text-md">SAIGON RICE ADMIN</span>
                <button onClick={() => setMobileOpen(false)} className="text-white hover:text-accent"><FaTimes size={18} /></button>
              </div>
              <nav className="flex-grow py-4 px-3 space-y-1">
                {navItems.map((item, idx) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
                        isActive ? 'bg-primary text-white shadow-md' : 'text-soft-gray/60 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="text-sm">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-white/5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span>Log out</span>
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* TOP BAR */}
        <header className="h-20 bg-white border-b border-secondary/10 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="flex items-center gap-4">
            {/* Hamburger for mobile */}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-secondary-dark hover:text-primary md:hidden cursor-pointer"
            >
              <FaBars size={20} />
            </button>

            {/* Date & Time */}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-secondary/60 font-semibold bg-soft-gray px-4 py-2 rounded-full border border-secondary/5">
              {formatDate(dateTime)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Notification bell widget */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 text-secondary hover:text-primary bg-soft-gray hover:bg-secondary/5 rounded-full relative transition-colors cursor-pointer"
              >
                <FaBell size={16} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-rose-500 text-white font-bold text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification drop list */}
              <AnimatePresence>
                {notificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-25" onClick={() => setNotificationsOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-3 w-80 bg-white border border-secondary/15 rounded-2xl shadow-xl z-30 py-2.5 overflow-hidden"
                    >
                      <h4 className="px-4 py-2.5 text-xs font-extrabold text-secondary-dark border-b border-soft-gray uppercase tracking-wider m-0">Admin Notifications</h4>
                      <div className="divide-y divide-soft-gray max-h-64 overflow-y-auto">
                        {notifications.map(n => (
                          <button
                            key={n.id}
                            onClick={handleNotificationClick}
                            className={`w-full text-left px-4 py-3 hover:bg-soft-gray flex flex-col gap-0.5 transition-colors ${
                              !n.read ? 'bg-primary/5' : ''
                            }`}
                          >
                            <span className={`text-[11px] font-bold ${!n.read ? 'text-primary' : 'text-secondary-dark'}`}>{n.title}</span>
                            <span className="text-[10px] text-secondary-dark/85 font-light leading-relaxed">{n.message}</span>
                            <span className="text-[8px] text-secondary/40 font-bold uppercase">{n.type}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Admin Profile */}
            <div className="flex items-center gap-2.5 pl-3.5 border-l border-secondary/10">
              <div className="w-9 h-9 rounded-full bg-primary text-white border border-primary/20 flex items-center justify-center text-sm font-black uppercase">
                A
              </div>
              <div className="hidden lg:block text-xs font-bold text-secondary-dark">
                <span className="block leading-tight">{currentUser?.fullName}</span>
                <span className="text-[9px] text-secondary/50 font-black uppercase tracking-wider block mt-0.5">ADMINISTRATOR</span>
              </div>
            </div>

          </div>

        </header>

        {/* PANEL CONTENT VIEW */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto bg-soft-gray/25">
          {children}
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
