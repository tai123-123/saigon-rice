import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import { useStore } from '../context/StoreContext';
import { FaLeaf, FaTruck, FaAward, FaUserCheck, FaChevronRight } from 'react-icons/fa';

export const Home = ({ onShowToast }) => {
  const { products } = useStore();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const featuredProducts = products.filter(p => !p.disabled && (p.discount > 0 || p.rating >= 4.9)).slice(0, 4);

  const features = [
    {
      title: "Organic Certified Rice",
      desc: "Adheres to international SRP environmental standards, chemical-free and non-bleached.",
      icon: <FaLeaf className="text-primary text-2xl" />
    },
    {
      title: "Super Express Delivery",
      desc: "Delivered to your kitchen doorstep in 2H inside urban Saigon.",
      icon: <FaTruck className="text-primary text-2xl" />
    },
    {
      title: "Export-Grade Quality",
      desc: "Carefully sorted from premium long grain lineages: ST25, Jasmine.",
      icon: <FaAward className="text-primary text-2xl" />
    },
    {
      title: "Recurring Subscription",
      desc: "Automate delivery schedule weekly/monthly and save up to 15%.",
      icon: <FaUserCheck className="text-primary text-2xl" />
    }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Spotlight */}
      <Hero />

      {/* Features Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#faf6ee] rounded-2xl p-6 border border-secondary/15 shadow-sm text-left space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-primary/20 rounded-xl inline-block">{feat.icon}</div>
              <h3 className="font-bold text-sm text-secondary-dark m-0">{feat.title}</h3>
              <p className="text-xs text-secondary-dark/85 leading-relaxed font-semibold m-0">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-soft-gray/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between text-left gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest block">RECOMMENDED FOR FAMILIES</span>
              <h2 className="text-3xl font-bold font-serif text-secondary-dark m-0">Spotlight Premium Products</h2>
              <p className="text-xs text-secondary-dark/85 font-semibold max-w-lg m-0">Clean, delicious, and fragrant rice varieties highly sought after by home cooks.</p>
            </div>
            <Link to="/products" className="text-xs font-bold text-primary hover:text-primary-light flex items-center gap-1 hover:gap-2 transition-all self-start sm:self-auto">
              View All Products <FaChevronRight size={9} />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Subscriptions Spotlight */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          
          <div className="space-y-6">
            <span className="text-[10px] font-black text-primary bg-primary/10 rounded-full px-3 py-1 uppercase tracking-wider inline-block">NEXT-GEN CONVENIENCE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-secondary-dark leading-tight m-0">
              Smart Recurring Delivery <br />
              <span className="text-primary">Never Run Out of Rice</span>
            </h2>
            <p className="text-sm text-secondary-dark/80 font-light leading-relaxed m-0">
              Busy schedule making you occasionally forget to check the rice box? With Smart Rice Subscription, select your favorite grains once and Saigon Rice handles the rest, delivering automatic fresh bags weekly, bi-weekly, or monthly.
            </p>
            
            <ul className="space-y-3 text-xs font-semibold text-secondary-dark/95">
              <li>✓ Save up to 15% compared to purchasing individual retail items.</li>
              <li>✓ Enjoy 100% free delivery on all recurring schedule packages.</li>
              <li>✓ Modify your grains choice or adjust schedule details in 1 click.</li>
              <li>✓ Pause, resume, or cancel at any time, zero long-term commitments.</li>
            </ul>

            <div className="pt-2">
              <Link to="/dashboard" className="bg-primary hover:bg-primary-light text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all inline-block">
                Configure Subscription
              </Link>
            </div>
          </div>

          {/* Graphical Presentation */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-secondary/10 bg-soft-gray flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800" 
              alt="Rice sack mock delivery" 
              className="w-full h-full object-cover"
            />
            {/* Float layer */}
            <div className="absolute bottom-5 left-5 right-5 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50 text-xs flex items-center justify-between">
              <div>
                <h4 className="font-bold text-secondary-dark m-0">Delivery: Monthly (ST25 Premium)</h4>
                <p className="text-[10px] text-secondary/60 m-0">Status: Repeats automatically on the 5th of each month</p>
              </div>
              <span className="px-3 py-1 bg-emerald-500 text-white font-bold rounded-lg text-[10px]">Active</span>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter onShowToast={onShowToast} />

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onShowToast={onShowToast}
        />
      )}
    </div>
  );
};

export default Home;
