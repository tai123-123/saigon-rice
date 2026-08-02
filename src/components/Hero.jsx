import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronRight, FaLeaf, FaShieldAlt, FaTruck } from 'react-icons/fa';

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-primary-dark min-h-[85vh] flex items-center">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&q=80&w=1600')` }}
      />
      
      {/* Radial Gradient for visual depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark via-primary-dark/80 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 text-white w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-accent text-xs font-bold uppercase tracking-wider"
            >
              <FaLeaf /> 100% Organic Specialty Rice
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif leading-tight text-white m-0"
            >
              Premium Country Flavor <br />
              <span className="text-accent bg-gradient-to-r from-accent to-yellow-300 bg-clip-text text-transparent">In Every Meal</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-white max-w-2xl font-medium leading-relaxed m-0"
            >
              Experience clean Soc Trang ST25, Jasmine, brown, and sticky rice harvests direct from ecological deltas of Vietnam. Delivered fast to your kitchen door, preserving the fresh fragrance of new harvests.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link to="/products" className="bg-accent hover:bg-accent-hover text-primary-dark font-bold text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-accent/20 transition-all flex items-center gap-2">
                Shop Rice Now <FaChevronRight size={12} />
              </Link>
              <Link to="/about" className="bg-transparent hover:bg-white/10 text-white font-bold text-sm px-8 py-4 rounded-full border border-white/30 transition-all">
                Discover Process
              </Link>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 mt-8 text-center sm:text-left"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <div className="p-2 bg-white/10 rounded-xl text-accent"><FaShieldAlt size={18} /></div>
                <div>
                  <h5 className="font-bold text-sm text-white">Safe / Certified</h5>
                  <p className="text-[11px] text-soft-gray/60">SRP & Organic Standard</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <div className="p-2 bg-white/10 rounded-xl text-accent"><FaTruck size={18} /></div>
                <div>
                  <h5 className="font-bold text-sm text-white">Express Delivery</h5>
                  <p className="text-[11px] text-soft-gray/60">Delivered in 2 Hours</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <div className="p-2 bg-white/10 rounded-xl text-accent"><FaLeaf size={18} /></div>
                <div>
                  <h5 className="font-bold text-sm text-white">Natural & Pure</h5>
                  <p className="text-[11px] text-soft-gray/60">Preservative-free</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Product Spotlight Image */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative mx-auto w-80 h-96 bg-white/5 rounded-3xl p-6 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col justify-between"
            >
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-accent text-primary-dark font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg rotate-12 animate-pulse">
                HOT SALE
              </div>

              <img 
                src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400" 
                alt="ST25 Premium Spot" 
                className="w-full h-56 object-cover rounded-2xl shadow-md border border-white/10"
              />
              <div className="space-y-2 mt-4 text-left">
                <span className="text-[10px] uppercase font-bold text-accent tracking-widest">Featured Product</span>
                <h4 className="font-bold text-lg text-white">ST25 Premium Rice</h4>
                <p className="text-xs text-soft-gray/70 line-clamp-2 m-0">Representing the world's best, soft, and fragrant rice texture.</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-accent font-black text-md">$7.80 <span className="text-xs font-normal text-soft-gray/50 line-through">$8.60</span></span>
                  <Link to="/products?id=st-25-premium" className="bg-white/10 hover:bg-white text-white hover:text-primary-dark text-xs font-bold px-3 py-1.5 rounded-full transition-colors">
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
