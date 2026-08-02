import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaLock, FaEnvelope } from 'react-icons/fa';

export const AdminLogin = ({ onShowToast }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!email.trim()) tempErrors.email = 'Email required.';
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = 'Invalid email.';
    if (!password) tempErrors.password = 'Password required.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = login(email.trim(), password);
    if (res.success) {
      // Re-verify if logged user has admin permissions
      const savedUser = JSON.parse(localStorage.getItem('saigon_rice_user'));
      if (savedUser && savedUser.role === 'admin') {
        if (onShowToast) {
          onShowToast('Welcome back, System Administrator!', 'success');
        }
        navigate('/admin/dashboard');
      } else {
        setErrors({ server: "Access denied. Standard accounts cannot access Admin console." });
        if (onShowToast) {
          onShowToast('Access denied. Admin role required.', 'error');
        }
      }
    } else {
      setErrors({ server: res.message });
      if (onShowToast) {
        onShowToast(res.message, 'error');
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1200')` }}
    >
      <div className="absolute inset-0 bg-primary-dark/70 backdrop-blur-[4px]" />

      <div className="max-w-md w-full glassmorphism-card rounded-3xl p-8 shadow-2xl relative z-10 border border-white/10 text-left space-y-6 text-white">
        
        <div className="text-center space-y-2">
          <span className="text-accent text-[9px] font-black uppercase tracking-widest block bg-accent/20 px-3 py-1 rounded-full inline-block">Security Portal</span>
          <h2 className="text-2xl font-bold font-serif m-0">Saigon Rice Seller Admin</h2>
          <p className="text-xs text-soft-gray/60 font-light m-0">Please sign in with administrator credentials to manage inventories and shipments.</p>
        </div>

        {errors.server && (
          <div className="bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs px-4 py-2.5 rounded-2xl font-semibold">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleAdminLoginSubmit} className="space-y-4 text-xs font-semibold">
          <div className="space-y-1">
            <label className="text-soft-gray block font-bold">Admin Email</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 focus-within:ring-1 focus-within:ring-accent transition-all">
              <FaEnvelope className="text-accent mr-3" />
              <input
                type="email"
                placeholder="admin@saigonrice.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-soft-gray/50 w-full"
              />
            </div>
            {errors.email && <p className="text-[10px] text-rose-300 font-semibold m-0">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-soft-gray block font-bold">Security Password</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 focus-within:ring-1 focus-within:ring-accent transition-all">
              <FaLock className="text-accent mr-3" />
              <input
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-soft-gray/50 w-full"
              />
            </div>
            {errors.password && <p className="text-[10px] text-rose-300 font-semibold m-0">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-hover text-primary-dark font-bold text-sm py-3.5 px-6 rounded-full shadow-lg hover:shadow-accent/20 transition-all cursor-pointer mt-4"
          >
            Authenticate Portal
          </button>
        </form>

        <div className="bg-white/5 rounded-2xl p-4 text-[10px] border border-white/10 text-soft-gray/70 leading-relaxed space-y-1">
          <strong>Seller Portal Credentials:</strong><br />
          Email: <code className="text-accent">admin@saigonrice.vn</code><br />
          Password: <code className="text-accent">adminpassword123</code>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
