import React from 'react';
import { motion } from 'framer-motion';

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <motion.div
        className="w-16 h-16 border-4 border-primary border-t-accent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.p
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-secondary font-medium tracking-wide text-sm"
      >
        Đang tải gạo ngon Saigon Rice...
      </motion.p>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-secondary/10 animate-pulse space-y-4">
      <div className="bg-soft-gray aspect-square w-full rounded-xl" />
      <div className="h-4 bg-soft-gray rounded w-3/4" />
      <div className="h-3 bg-soft-gray rounded w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-soft-gray rounded w-1/4" />
        <div className="h-8 bg-soft-gray rounded w-8" />
      </div>
    </div>
  );
};
