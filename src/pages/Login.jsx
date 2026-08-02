import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa';

export const Login = ({ onShowToast }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!email.trim()) tempErrors.email = 'Please enter your email address.';
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = 'Invalid email address.';
    
    if (!password) tempErrors.password = 'Please enter your password.';
    else if (password.length < 6) tempErrors.password = 'Password must be at least 6 characters.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = login(email.trim(), password);
    if (res.success) {
      if (onShowToast) {
        onShowToast('Successfully logged in! Welcome back.', 'success');
      }
      // Check user role to redirect appropriately
      const parsedUsers = JSON.parse(localStorage.getItem('saigon_rice_all_users')) || [];
      const loggedUser = parsedUsers.find(u => u.email === email.trim());
      if (loggedUser && loggedUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate(redirectPath);
      }
    } else {
      setErrors({ server: res.message });
      if (onShowToast) {
        onShowToast(res.message, 'error');
      }
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-soft-gray/30">
      {/* High-Contrast Premium Card */}
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-secondary/10 text-left space-y-6">
        
        <div className="text-center space-y-2">
          <span className="text-primary text-[10px] font-black uppercase tracking-widest block">Welcome Back</span>
          <h2 className="text-2xl font-bold font-serif text-secondary-dark m-0">Log in to Saigon Rice</h2>
          <p className="text-xs text-secondary/60 font-light m-0">Log in to manage your recurring deliveries and earn discount vouchers.</p>
        </div>

        {errors.server && (
          <div className="bg-rose-50 border border-rose-100 text-rose-800 text-xs px-4 py-2.5 rounded-2xl font-semibold">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-semibold text-secondary-dark">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-secondary-dark block font-bold">Email address</label>
            <div className="flex items-center bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 focus-within:ring-1 focus-within:ring-primary transition-all">
              <FaEnvelope className="text-primary mr-3" />
              <input
                type="email"
                placeholder="example@saigonrice.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none outline-none text-secondary-dark placeholder-secondary/40 flex-grow"
              />
            </div>
            {errors.email && <p className="text-[10px] text-rose-500 font-semibold m-0">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-secondary-dark block font-bold">Password</label>
            <div className="flex items-center bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 focus-within:ring-1 focus-within:ring-primary transition-all">
              <FaLock className="text-primary mr-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border-none outline-none text-secondary-dark placeholder-secondary/40 flex-grow"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-secondary/50 hover:text-primary ml-2 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
            {errors.password && <p className="text-[10px] text-rose-500 font-semibold m-0">{errors.password}</p>}
          </div>

          {/* Remember me & Forgot Pass */}
          <div className="flex items-center justify-between text-[11px] pt-1 font-semibold text-secondary/70">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-primary"
              />
              Remember me
            </label>
            <button 
              type="button" 
              onClick={() => {
                if (onShowToast) {
                  onShowToast('A password reset link has been dispatched to your email address.', 'info');
                }
              }}
              className="hover:text-primary underline transition-colors cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-light text-white font-bold text-sm py-3.5 px-6 rounded-full shadow-lg hover:shadow-primary/20 transition-all cursor-pointer mt-4"
          >
            Log In Now
          </button>
        </form>

        <div className="text-center text-xs text-secondary/60 pt-2 border-t border-soft-gray">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary underline hover:text-primary-light font-bold">
            Sign up now
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
