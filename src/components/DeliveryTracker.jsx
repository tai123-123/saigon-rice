import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBoxOpen, FaTruck, FaMapMarkerAlt, FaCheckCircle, FaUserShield, FaClock } from 'react-icons/fa';

export const DeliveryTracker = ({ orderId, address, onFinished }) => {
  const [step, setStep] = useState(0);
  const [eta, setEta] = useState(45);

  const steps = [
    { label: 'Order Confirmed', desc: 'System is validating your order.', icon: <FaBoxOpen /> },
    { label: 'Preparing Order', desc: 'We are packing your premium rice bag.', icon: <FaBoxOpen /> },
    { label: 'Out for Delivery', desc: 'Shipper picked up package and is en route.', icon: <FaTruck /> },
    { label: 'Nearby', desc: 'Shipper is within 500 meters of your address.', icon: <FaMapMarkerAlt /> },
    { label: 'Delivered', desc: 'Your order has been successfully delivered!', icon: <FaCheckCircle /> }
  ];

  useEffect(() => {
    if (step >= steps.length - 1) return;

    const interval = setInterval(() => {
      setStep(prev => {
        const next = prev + 1;
        if (next === 1) setEta(35);
        if (next === 2) setEta(20);
        if (next === 3) setEta(5);
        if (next === 4) {
          setEta(0);
          if (onFinished) onFinished();
        }
        return next;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [step, onFinished]);

  const points = [
    { x: 40, y: 160 },
    { x: 100, y: 130 },
    { x: 220, y: 110 },
    { x: 280, y: 50 },
    { x: 340, y: 40 }
  ];

  const currentPos = points[step] || points[0];

  return (
    <div className="bg-white rounded-3xl p-6 border border-secondary/10 shadow-lg space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-soft-gray pb-4 gap-2 text-left">
        <div>
          <span className="text-[10px] font-bold text-primary bg-primary/10 rounded-full px-2.5 py-1">LIVE SHIPMENT TRACKING</span>
          <h3 className="font-bold text-md text-secondary-dark mt-2 m-0">Order ID: #{orderId || 'SGR-889912'}</h3>
        </div>
        <div className="flex items-center gap-2 text-primary font-bold text-xs bg-accent/20 text-primary-dark px-3.5 py-1.5 rounded-2xl">
          <FaClock />
          <span>ETA: {eta > 0 ? `${eta} mins` : 'Delivered'}</span>
        </div>
      </div>

      {/* Shipper Info */}
      <div className="flex items-center justify-between bg-soft-gray/50 rounded-2xl p-4 text-left text-xs font-semibold text-secondary-dark">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center text-white text-md font-bold">
            T
          </div>
          <div>
            <h4 className="font-bold text-sm text-secondary-dark m-0">Tyler Nguyen</h4>
            <p className="text-[10px] text-secondary/60 m-0">Saigon Express Driver</p>
          </div>
        </div>
        <div className="text-right space-y-1">
          <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
            <FaUserShield size={10} /> Fully Vaccinated
          </span>
          <span className="text-[10px] text-secondary/60">Phone: 090 999 8888</span>
        </div>
      </div>

      {/* Live Map Simulation */}
      <div className="relative w-full h-48 bg-emerald-50/70 border border-emerald-100 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
        {/* Custom Stylized Grid Map */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Roads */}
          <path d="M 20 180 Q 80 150 120 140 T 240 120 T 300 60 T 360 40" fill="none" stroke="#d1fae5" strokeWidth="12" strokeLinecap="round" />
          <path d="M 20 180 Q 80 150 120 140 T 240 120 T 300 60 T 360 40" fill="none" stroke="#a7f3d0" strokeWidth="4" strokeLinecap="round" strokeDasharray="6,4" />
          
          <line x1="80" y1="20" x2="120" y2="190" stroke="#e6fcf5" strokeWidth="6" />
          <line x1="200" y1="190" x2="280" y2="10" stroke="#e6fcf5" strokeWidth="6" />

          {/* Map Land Marks */}
          <circle cx="50" cy="50" r="10" fill="#a7f3d0" opacity="0.4" />
          <circle cx="180" cy="140" r="15" fill="#a7f3d0" opacity="0.3" />
          <circle cx="320" cy="120" r="12" fill="#a7f3d0" opacity="0.3" />

          {/* WareHouse Starting point */}
          <circle cx="40" cy="160" r="8" fill="#1b4332" />
          <text x="25" y="185" fill="#1b4332" fontSize="9" fontWeight="bold">Warehouse</text>

          {/* User Destination point */}
          <circle cx="340" cy="40" r="8" fill="#d4af37" />
          <text x="315" y="25" fill="#6e5044" fontSize="9" fontWeight="bold">Your House</text>
        </svg>

        {/* Live Truck Marker */}
        <motion.div
          animate={{ x: currentPos.x - 12, y: currentPos.y - 12 }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="absolute left-0 top-0 w-6 h-6 bg-primary text-white rounded-full shadow-lg border border-white flex items-center justify-center z-10"
        >
          <FaTruck size={10} />
        </motion.div>

        {/* Radar Ring animation */}
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute left-0 top-0 w-12 h-12 border-2 border-primary rounded-full pointer-events-none"
          style={{ x: currentPos.x - 24, y: currentPos.y - 24 }}
        />
      </div>

      {/* Progress Timeline */}
      <div className="space-y-4 text-left">
        <h4 className="text-xs font-bold text-secondary-dark uppercase tracking-wider block">Shipment Status</h4>
        <div className="relative pl-6 space-y-5 border-l border-secondary/15 ml-2.5">
          {steps.map((s, idx) => {
            const isCompleted = idx < step;
            const isActive = idx === step;
            return (
              <div key={idx} className="relative">
                {/* Timeline Bullet */}
                <div 
                  className={`absolute -left-8.5 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted 
                      ? 'bg-emerald-500 border-emerald-500 text-white text-[9px]' 
                      : isActive 
                        ? 'bg-primary border-primary text-white text-[9px]' 
                        : 'bg-white border-secondary/25 text-secondary/35 text-[9px]'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>
                {/* Node info */}
                <div className="space-y-0.5">
                  <h5 className={`text-xs font-bold ${isActive ? 'text-primary' : 'text-secondary-dark'}`}>
                    {s.label}
                  </h5>
                  <p className="text-[10px] text-secondary/70 leading-normal font-light m-0">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracker;
