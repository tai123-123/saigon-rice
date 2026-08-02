import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import customer pages
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

// Import admin pages
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminAnalytics from '../pages/admin/AdminAnalytics';
import AdminOrders from '../pages/admin/AdminOrders';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminCustomers from '../pages/admin/AdminCustomers';
import AdminInventory from '../pages/admin/AdminInventory';
import AdminSubscriptions from '../pages/admin/AdminSubscriptions';
import AdminDelivery from '../pages/admin/AdminDelivery';
import AdminSettings from '../pages/admin/AdminSettings';

// Protected Route Guard for Standard Customers
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
};

// Protected Route Guard for Admin console
const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return (currentUser && currentUser.role === 'admin') ? children : <Navigate to="/admin/login" replace />;
};

export const AppRouter = ({ onShowToast }) => {
  return (
    <Routes>
      {/* Customer Shop Routes */}
      <Route path="/" element={<Home onShowToast={onShowToast} />} />
      <Route path="/products" element={<Products onShowToast={onShowToast} />} />
      <Route path="/products/:id" element={<ProductDetail onShowToast={onShowToast} />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact onShowToast={onShowToast} />} />
      <Route path="/login" element={<Login onShowToast={onShowToast} />} />
      <Route path="/register" element={<Register onShowToast={onShowToast} />} />
      
      {/* Protected Customer Routes */}
      <Route path="/checkout" element={
        <ProtectedRoute>
          <Checkout onShowToast={onShowToast} />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard onShowToast={onShowToast} />
        </ProtectedRoute>
      } />

      {/* Admin Auth Portal */}
      <Route path="/admin/login" element={<AdminLogin onShowToast={onShowToast} />} />

      {/* Protected Admin Console Routes */}
      <Route path="/admin/dashboard" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
      <Route path="/admin/analytics" element={
        <AdminRoute>
          <AdminAnalytics />
        </AdminRoute>
      } />
      <Route path="/admin/orders" element={
        <AdminRoute>
          <AdminOrders onShowToast={onShowToast} />
        </AdminRoute>
      } />
      <Route path="/admin/products" element={
        <AdminRoute>
          <AdminProducts onShowToast={onShowToast} />
        </AdminRoute>
      } />
      <Route path="/admin/customers" element={
        <AdminRoute>
          <AdminCustomers onShowToast={onShowToast} />
        </AdminRoute>
      } />
      <Route path="/admin/inventory" element={
        <AdminRoute>
          <AdminInventory />
        </AdminRoute>
      } />
      <Route path="/admin/subscriptions" element={
        <AdminRoute>
          <AdminSubscriptions onShowToast={onShowToast} />
        </AdminRoute>
      } />
      <Route path="/admin/delivery" element={
        <AdminRoute>
          <AdminDelivery />
        </AdminRoute>
      } />
      <Route path="/admin/settings" element={
        <AdminRoute>
          <AdminSettings onShowToast={onShowToast} />
        </AdminRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
