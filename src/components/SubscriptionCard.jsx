import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import { products } from '../data/products';

export const SubscriptionCard = ({ tier, onSubscribe }) => {
  const [selectedRiceId, setSelectedRiceId] = useState(products[0].id);
  const [frequency, setFrequency] = useState('Monthly');

  const activeRice = products.find(p => p.id === selectedRiceId) || products[0];

  const getDiscount = (freq) => {
    if (freq === 'Weekly') return 0.15; // 15% off
    if (freq === 'Bi-weekly') return 0.10; // 10% off
    return 0.05; // 5% off (Monthly)
  };

  const getFreqName = (freq) => {
    if (freq === 'Weekly') return 'Weekly';
    if (freq === 'Bi-weekly') return 'Every 2 Weeks';
    return 'Monthly';
  };

  const discount = getDiscount(frequency);
  const rawPrice = activeRice.price;
  const discountedPrice = Math.round(rawPrice * (1 - discount));

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`bg-white rounded-3xl p-8 border-2 shadow-lg flex flex-col justify-between h-full relative ${
        tier.popular ? 'border-primary shadow-xl ring-2 ring-primary/20' : 'border-secondary/10'
      }`}
    >
      {tier.popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
          Most Popular
        </span>
      )}

      <div className="space-y-6">
        {/* Tier Header */}
        <div className="text-left space-y-2">
          <h3 className="text-xl font-bold text-secondary-dark font-serif m-0">{tier.name}</h3>
          <p className="text-xs text-secondary/70 m-0">{tier.description}</p>
        </div>

        {/* Pricing Area */}
        <div className="text-left">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-primary">{formatPrice(discountedPrice)}</span>
            <span className="text-secondary/50 text-xs font-semibold">/ delivery</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide block mt-1">
            Save {Math.round(discount * 100)}% off retail price
          </span>
        </div>

        {/* Select Rice Dropdown */}
        <div className="text-left space-y-2">
          <label className="text-xs font-bold text-secondary-dark uppercase tracking-wider block">Select Rice Choice:</label>
          <select
            value={selectedRiceId}
            onChange={(e) => setSelectedRiceId(e.target.value)}
            className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-3 py-2.5 text-xs text-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
          >
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.bagSize})</option>
            ))}
          </select>
        </div>

        {/* Frequency selector buttons */}
        <div className="text-left space-y-2">
          <label className="text-xs font-bold text-secondary-dark uppercase tracking-wider block">Delivery Frequency:</label>
          <div className="grid grid-cols-3 gap-2">
            {['Weekly', 'Bi-weekly', 'Monthly'].map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setFrequency(f)}
                className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all border cursor-pointer ${
                  frequency === f
                    ? 'bg-primary border-primary text-white shadow-sm'
                    : 'bg-white border-secondary/15 text-secondary-dark hover:bg-soft-gray'
                }`}
              >
                {getFreqName(f)}
              </button>
            ))}
          </div>
        </div>

        {/* Benefits List */}
        <ul className="space-y-2.5 text-xs font-medium text-secondary-dark/95 text-left border-t border-soft-gray pt-5">
          {tier.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
          <li className="flex items-center gap-2">
            <FaCalendarAlt className="text-primary flex-shrink-0" />
            <span>Delivery: <strong>{getFreqName(frequency)}</strong></span>
          </li>
        </ul>
      </div>

      {/* Subscribe Button */}
      <button
        onClick={() => onSubscribe({ tier, activeRice, frequency, discountedPrice })}
        className="w-full bg-primary hover:bg-primary-light text-white font-bold text-sm py-3.5 px-6 rounded-full shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2 mt-8 transition-all cursor-pointer"
      >
        Subscribe Now <FaChevronRight size={10} />
      </button>
    </motion.div>
  );
};

export default SubscriptionCard;
