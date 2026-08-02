import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingBag, FaUser, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path) => location.pathname === path;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 left-0 w-full z-40 glassmorphism shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text tracking-wide font-serif">
            SAIGON RICE
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 bg-accent/20 text-accent font-semibold text-[10px] rounded-full">
            PREMIUM
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-secondary-dark">
          <Link to="/" className={`hover:text-primary transition-colors ${isActive('/') ? 'text-primary border-b-2 border-primary pb-1' : ''}`}>Home</Link>
          <Link to="/products" className={`hover:text-primary transition-colors ${isActive('/products') ? 'text-primary border-b-2 border-primary pb-1' : ''}`}>Products</Link>
          <Link to="/about" className={`hover:text-primary transition-colors ${isActive('/about') ? 'text-primary border-b-2 border-primary pb-1' : ''}`}>About Us</Link>
          <Link to="/contact" className={`hover:text-primary transition-colors ${isActive('/contact') ? 'text-primary border-b-2 border-primary pb-1' : ''}`}>Contact</Link>
        </nav>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center bg-soft-gray/80 border border-secondary/15 rounded-full px-4 py-1.5 max-w-xs focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
          <input
            type="text"
            placeholder="Search premium rice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs text-secondary-dark placeholder-secondary/60 w-44 focus:w-56 transition-all duration-300"
          />
          <button type="submit" className="text-secondary hover:text-primary">
            <FaSearch size={14} />
          </button>
        </form>

        {/* Right Side Options */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2.5 text-secondary hover:text-primary transition-colors rounded-full hover:bg-soft-gray">
            <FaShoppingBag size={20} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-0 right-0 bg-accent text-primary-dark font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* User Section */}
          {currentUser ? (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/dashboard" className="flex items-center gap-2 hover:text-primary transition-colors text-sm font-semibold text-secondary-dark">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                  {currentUser.fullName.charAt(0)}
                </div>
                <span className="max-w-[100px] truncate">{currentUser.fullName}</span>
              </Link>
              <button 
                onClick={() => { logout(); navigate('/'); }} 
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold border border-rose-300 hover:border-rose-500 rounded-full px-3 py-1 transition-all"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Link to="/login" className="font-semibold text-secondary hover:text-primary px-3 py-1.5 transition-colors">Log in</Link>
              <Link to="/register" className="font-semibold bg-primary hover:bg-primary-light text-white px-4 py-1.5 rounded-full shadow-md transition-all">Sign up</Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-secondary-dark hover:text-primary md:hidden focus:outline-none"
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-secondary/10 px-4 py-5 space-y-4 shadow-lg overflow-hidden"
          >
            {/* Search Bar - Mobile */}
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-soft-gray border border-secondary/10 rounded-full px-4 py-2 w-full">
              <input
                type="text"
                placeholder="Search premium rice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-secondary-dark placeholder-secondary/50 flex-grow"
              />
              <button type="submit" className="text-secondary hover:text-primary">
                <FaSearch size={16} />
              </button>
            </form>

            <div className="flex flex-col gap-3 font-semibold text-secondary-dark">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`py-2 hover:text-primary border-b border-soft-gray ${isActive('/') ? 'text-primary' : ''}`}>Home</Link>
              <Link to="/products" onClick={() => setMobileMenuOpen(false)} className={`py-2 hover:text-primary border-b border-soft-gray ${isActive('/products') ? 'text-primary' : ''}`}>Products</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`py-2 hover:text-primary border-b border-soft-gray ${isActive('/about') ? 'text-primary' : ''}`}>About Us</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={`py-2 hover:text-primary border-b border-soft-gray ${isActive('/contact') ? 'text-primary' : ''}`}>Contact</Link>
              
              {currentUser ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="py-2 flex items-center gap-2 hover:text-primary border-b border-soft-gray">
                    <FaUser className="text-primary" /> Dashboard ({currentUser.fullName})
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); navigate('/'); }}
                    className="w-full text-left py-2 text-rose-600 hover:text-rose-800"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 border border-secondary/20 rounded-full hover:bg-soft-gray">Log in</Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 bg-primary text-white rounded-full">Sign up</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
