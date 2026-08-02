import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

export const Newsletter = ({ onShowToast }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      if (onShowToast) {
        onShowToast('Successfully subscribed! Check your inbox for a 10% discount voucher.', 'success');
      }
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-primary-dark text-white overflow-hidden relative">
      {/* Decorative vectors */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white m-0">Subscribe for Offers & Updates</h2>
        <p className="text-sm text-soft-gray/70 max-w-lg mx-auto font-light leading-relaxed m-0">
          Subscribe to keep updated with fresh new harvests, gourmet cooking guides, and receive a 10% discount voucher for your first purchase.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
          <input
            type="email"
            placeholder="Enter your email address..."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-xs text-white placeholder-soft-gray/40 outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-primary-dark font-bold text-xs py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer flex-shrink-0"
          >
            Subscribe <FaPaperPlane size={11} />
          </button>
        </form>

        <p className="text-[10px] text-soft-gray/40 font-semibold uppercase tracking-wider block">No Spam Guarantee • Unsubscribe at any time</p>
      </div>
    </section>
  );
};

export default Newsletter;
