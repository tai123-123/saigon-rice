import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

export const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Mrs. Linda Nguyen",
      role: "Homemaker, District 3, HCMC",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      content: "Our family used to try different rice brands but since eating Soc Trang ST25 from Saigon Rice, we are hooked. Soft, fragrant, and sweet texture. The monthly automatic delivery is extremely convenient.",
      rating: 5
    },
    {
      id: 2,
      name: "Mr. David Tran",
      role: "Owner of Vietnamese Culinary Restaurant",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      content: "Outstanding rice quality, very clean grains with no impurities. Golden flower sticky rice works wonderfully for our restaurant clients. 5 stars for high professional standards.",
      rating: 5
    },
    {
      id: 3,
      name: "Mrs. Susan Pham",
      role: "Retired Professor, Phu Nhuan District",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150",
      content: "I have diabetes so my doctor advised eating black brown rice and GABA germinated rice. Saigon Rice's brown rice is very easy to chew. Delivery is fast and the staff are extremely polite.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-soft-gray/30 border-t border-b border-soft-gray/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-[10px] font-black text-primary uppercase tracking-widest block">Customer Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-secondary-dark m-0">What Our Customers Say</h2>
          <p className="text-sm text-secondary/70 font-light leading-relaxed m-0">Over 10,000+ families trust Saigon Rice clean premium grains daily.</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-secondary/5 relative flex flex-col justify-between"
            >
              <FaQuoteLeft className="text-primary/10 absolute top-6 right-8" size={32} />

              <div className="space-y-4 text-left">
                {/* Rating */}
                <div className="flex gap-1 text-amber-500">
                  {[...Array(r.rating)].map((_, i) => (
                    <FaStar key={i} size={14} />
                  ))}
                </div>
                <p className="text-xs text-secondary-dark/85 leading-relaxed font-light italic m-0">
                  "{r.content}"
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-soft-gray text-left">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-11 h-11 rounded-full object-cover border border-primary/20 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-sm text-secondary-dark m-0">{r.name}</h4>
                  <p className="text-[10px] text-secondary/60 m-0">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
