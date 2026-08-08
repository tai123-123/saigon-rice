import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaSeedling, FaAward, FaShieldAlt, FaTruck, 
  FaHeart, FaCheckCircle, FaBoxes, FaEye, FaBullseye
} from 'react-icons/fa';

export const About = () => {
  const scrollTransition = { duration: 0.6, ease: "easeOut" };

  const scrollToStory = () => {
    const element = document.getElementById('story-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-secondary-dark font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://img.thuthuatphanmem.vn/uploads/2018/10/05/hinh-anh-canh-dong-lua-chin-dep_044839369.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-black/20" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={scrollTransition}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-secondary-dark leading-tight m-0"
          >
            About Saigon Rice
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...scrollTransition, delay: 0.2 }}
            className="text-xs sm:text-sm text-secondary-dark/90 max-w-xl mx-auto font-light leading-relaxed m-0"
          >
            Bringing premium Vietnamese rice to every family through carefully selected products, trusted quality, and dedicated customer service.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...scrollTransition, delay: 0.4 }}
            className="pt-2"
          >
            <button
              onClick={scrollToStory}
              className="bg-primary hover:bg-primary-light text-white font-bold text-xs py-3.5 px-8 rounded-full shadow-md transition-all cursor-pointer"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section id="story-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={scrollTransition}
            className="text-left space-y-5"
          >
            <span className="text-[10px] font-black text-primary uppercase tracking-widest block">Corporate Profile</span>
            <h2 className="text-3xl font-extrabold font-serif text-secondary-dark m-0 leading-tight">Our Story</h2>
            
            <div className="text-xs sm:text-sm text-secondary-dark/80 space-y-4 font-light leading-relaxed">
              <p className="font-bold text-secondary-dark text-sm sm:text-base m-0">
                Saigon Rice was founded with one simple belief: Every family deserves clean, safe, and delicious rice.
              </p>
              <p>
                Vietnam is recognized globally as one of the premier rice-growing regions. However, finding rice with consistent premium quality and reliable food safety standards remains a challenge for many consumers. Saigon Rice was established to bridge this gap.
              </p>
              <p className="m-0">
                We work directly with experienced local farmers across the Mekong Delta to select export-grade varieties. Through strict storage controls and vacuum packaging, we deliver the authentic flavor and nutrition of freshly harvested crops to your home.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={scrollTransition}
            className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-secondary/5"
          >
            <img 
              src={`${import.meta.env.BASE_URL}rice_wholesale_store.jpg`}
              alt="Vietnam wholesale rice store sacks" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-20 bg-soft-gray/30 border-t border-b border-secondary/5 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-[#faf6ee] rounded-3xl p-8 border border-secondary/15 shadow-sm space-y-4"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary text-xl">
              <FaBullseye />
            </div>
            <h3 className="text-lg font-bold font-serif text-secondary-dark m-0">Mission</h3>
            <p className="text-xs sm:text-sm text-secondary-dark font-medium leading-relaxed m-0">
              Deliver premium Vietnamese rice with consistent quality and reliable service.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-[#faf6ee] rounded-3xl p-8 border border-secondary/15 shadow-sm space-y-4"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary text-xl">
              <FaEye />
            </div>
            <h3 className="text-lg font-bold font-serif text-secondary-dark m-0">Vision</h3>
            <p className="text-xs sm:text-sm text-secondary-dark font-medium leading-relaxed m-0">
              Become a trusted Vietnamese rice brand that customers confidently choose for everyday meals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. WHY CHOOSE SAIGON RICE */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-black text-primary uppercase tracking-widest block font-bold">Our Strengths</span>
          <h2 className="text-3xl font-extrabold font-serif text-secondary-dark m-0">Why Choose Saigon Rice</h2>
          <p className="text-xs text-secondary-dark/75 font-semibold m-0">Four key pillars that define our standards and customer commitment.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div whileHover={{ y: -3 }} className="bg-[#faf6ee] rounded-3xl p-6 border border-secondary/15 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary text-lg"><FaAward /></div>
            <h4 className="font-bold text-xs text-secondary-dark m-0">Premium Quality</h4>
            <p className="text-xs text-secondary-dark/85 font-medium leading-relaxed m-0">Carefully selected rice from trusted suppliers.</p>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} className="bg-[#faf6ee] rounded-3xl p-6 border border-secondary/15 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary text-lg"><FaShieldAlt /></div>
            <h4 className="font-bold text-xs text-secondary-dark m-0">Food Safety</h4>
            <p className="text-xs text-secondary-dark/85 font-medium leading-relaxed m-0">Products are carefully packaged to maintain freshness and quality.</p>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} className="bg-[#faf6ee] rounded-3xl p-6 border border-secondary/15 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary text-lg"><FaTruck /></div>
            <h4 className="font-bold text-xs text-secondary-dark m-0">Fast Delivery</h4>
            <p className="text-xs text-secondary-dark/85 font-medium leading-relaxed m-0">Reliable nationwide delivery with secure packaging.</p>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} className="bg-[#faf6ee] rounded-3xl p-6 border border-secondary/15 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary text-lg"><FaHeart /></div>
            <h4 className="font-bold text-xs text-secondary-dark m-0">Customer Commitment</h4>
            <p className="text-xs text-secondary-dark/85 font-medium leading-relaxed m-0">Dedicated support before and after every purchase.</p>
          </motion.div>
        </div>
      </section>

      {/* 5. QUALITY PROCESS */}
      <section className="py-24 bg-soft-gray/30 border-t border-b border-secondary/5 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-black text-primary uppercase tracking-widest block font-bold">Standard Operations</span>
            <h2 className="text-3xl font-extrabold font-serif text-secondary-dark m-0">Quality Process</h2>
            <p className="text-xs text-secondary-dark/75 font-semibold m-0">Four direct steps from selection to doorstep delivery.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#faf6ee] rounded-3xl p-6 border border-secondary/15 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary"><FaSeedling /></div>
              <h4 className="font-bold text-xs text-secondary-dark m-0">Rice Selection</h4>
              <p className="text-xs text-secondary-dark/85 font-medium leading-relaxed m-0">Sourcing export-grade grain cultivars directly from Mekong farms.</p>
            </div>

            <div className="bg-[#faf6ee] rounded-3xl p-6 border border-secondary/15 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary"><FaCheckCircle /></div>
              <h4 className="font-bold text-xs text-secondary-dark m-0">Quality Inspection</h4>
              <p className="text-xs text-secondary-dark/85 font-medium leading-relaxed m-0">Testing for pesticide-free credentials and milling consistency.</p>
            </div>

            <div className="bg-[#faf6ee] rounded-3xl p-6 border border-secondary/15 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary"><FaBoxes /></div>
              <h4 className="font-bold text-xs text-secondary-dark m-0">Packaging</h4>
              <p className="text-xs text-secondary-dark/85 font-medium leading-relaxed m-0">Vacuum-sealing to lock in freshness and natural aromas.</p>
            </div>

            <div className="bg-[#faf6ee] rounded-3xl p-6 border border-secondary/15 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary"><FaTruck /></div>
              <h4 className="font-bold text-xs text-secondary-dark m-0">Delivery</h4>
              <p className="text-xs text-secondary-dark/85 font-medium leading-relaxed m-0">Fast dispatch to customers, restaurants, and partners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-secondary-dark leading-tight m-0">
            Experience Premium Vietnamese Rice
          </h2>
          <p className="text-xs sm:text-sm text-secondary/70 leading-relaxed font-light max-w-xl mx-auto m-0">
            Explore our collection of carefully selected rice products and discover the quality trusted by families across Vietnam.
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <Link to="/products" className="bg-primary hover:bg-primary-light text-white font-bold text-xs py-3.5 px-8 rounded-full shadow-md transition-all">
              Explore Products
            </Link>
            <Link to="/contact" className="bg-white hover:bg-soft-gray text-secondary-dark border border-secondary/15 font-bold text-xs py-3.5 px-8 rounded-full shadow transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
