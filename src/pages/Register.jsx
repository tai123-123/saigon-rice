import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaPhoneAlt, FaEnvelope, FaLock } from 'react-icons/fa';

export const Register = ({ onShowToast }) => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!fullName.trim()) tempErrors.fullName = 'Please enter your full name.';
    
    if (!phone.trim()) tempErrors.phone = 'Please enter your phone number.';
    else if (!/^[0-9]{9,11}$/.test(phone.trim())) tempErrors.phone = 'Invalid phone number.';
    
    if (!email.trim()) tempErrors.email = 'Please enter your email address.';
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = 'Invalid email address.';
    
    if (!password) tempErrors.password = 'Please enter your password.';
    else if (password.length < 6) tempErrors.password = 'Password must be at least 6 characters.';
    
    if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Confirm password does not match.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = register(fullName.trim(), phone.trim(), email.trim(), password);
    if (res.success) {
      if (onShowToast) {
        onShowToast('Account registered successfully!', 'success');
      }
      navigate('/dashboard');
    } else {
      setErrors({ server: res.message });
      if (onShowToast) {
        onShowToast(res.message, 'error');
      }
    }
  };

  return (
    <div 
      className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('https://special.nhandan.vn/hanh-trinh-hat-gao-Viet-Nam/assets/BQ90b3pTit/5-1920x1005.jpg')` }}
    >
      <div className="absolute inset-0 bg-primary-dark/40 backdrop-blur-[3px]" />

      {/* High-Contrast Premium Form Card */}
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl relative z-10 border border-secondary/10 text-left space-y-6 text-secondary-dark">
        
        <div className="text-center space-y-2">
          <span className="text-primary text-[10px] font-black uppercase tracking-widest block">Join Saigon Rice</span>
          <h2 className="text-2xl font-bold font-serif text-secondary-dark m-0">Create New Account</h2>
          <p className="text-xs text-secondary/60 font-light m-0">Sign up to manage recurring deliveries, save multiple shipping addresses, and accumulate points.</p>
        </div>

        {errors.server && (
          <div className="bg-rose-5 border border-rose-100 text-rose-800 text-xs px-4 py-2.5 rounded-2xl font-semibold">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs font-semibold text-secondary-dark">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-secondary-dark block font-bold">Full Name *</label>
            <div className="flex items-center bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 focus-within:ring-1 focus-within:ring-primary transition-all">
              <FaUser className="text-primary mr-3" />
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-transparent border-none outline-none text-secondary-dark placeholder-secondary/40 flex-grow"
              />
            </div>
            {errors.fullName && <p className="text-[10px] text-rose-500 font-semibold m-0">{errors.fullName}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-secondary-dark block font-bold">Phone Number *</label>
            <div className="flex items-center bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 focus-within:ring-1 focus-within:ring-primary transition-all">
              <FaPhoneAlt className="text-primary mr-3" />
              <input
                type="text"
                placeholder="0901234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent border-none outline-none text-secondary-dark placeholder-secondary/40 flex-grow"
              />
            </div>
            {errors.phone && <p className="text-[10px] text-rose-500 font-semibold m-0">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-secondary-dark block font-bold">Email Address *</label>
            <div className="flex items-center bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 focus-within:ring-1 focus-within:ring-primary transition-all">
              <FaEnvelope className="text-primary mr-3" />
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none outline-none text-secondary-dark placeholder-secondary/40 flex-grow"
              />
            </div>
            {errors.email && <p className="text-[10px] text-rose-500 font-semibold m-0">{errors.email}</p>}
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-secondary-dark block font-bold">Password *</label>
              <div className="flex items-center bg-soft-gray border border-secondary/15 rounded-xl px-3 py-2.5 focus-within:ring-1 focus-within:ring-primary transition-all">
                <FaLock className="text-primary mr-2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border-none outline-none text-secondary-dark placeholder-secondary/40 w-full"
                />
              </div>
              {errors.password && <p className="text-[10px] text-rose-500 font-semibold m-0">{errors.password}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-secondary-dark block font-bold">Confirm Password *</label>
              <div className="flex items-center bg-soft-gray border border-secondary/15 rounded-xl px-3 py-2.5 focus-within:ring-1 focus-within:ring-primary transition-all">
                <FaLock className="text-primary mr-2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-transparent border-none outline-none text-secondary-dark placeholder-secondary/40 w-full"
                />
              </div>
              {errors.confirmPassword && <p className="text-[10px] text-rose-500 font-semibold m-0">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Toggle Pass */}
          <div className="text-right">
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="text-[10px] text-secondary/60 hover:text-primary underline transition-colors cursor-pointer"
            >
              {showPassword ? 'Hide password' : 'Show password'}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-light text-white font-bold text-sm py-3.5 px-6 rounded-full shadow-lg hover:shadow-primary/20 transition-all cursor-pointer mt-4"
          >
            Register Account
          </button>
        </form>

        <div className="text-center text-xs text-secondary/60 pt-2 border-t border-soft-gray">
          Already have an account?{' '}
          <Link to="/login" className="text-primary underline hover:text-primary-light font-bold">
            Log in now
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;
