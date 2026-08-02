import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

export const Toast = ({ message, type = 'success', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <FaCheckCircle className="text-emerald-500 text-lg" />,
    error: <FaExclamationCircle className="text-rose-500 text-lg" />,
    info: <FaInfoCircle className="text-amber-500 text-lg" />
  };

  const bgColors = {
    success: 'bg-white border-l-4 border-emerald-500',
    error: 'bg-white border-l-4 border-rose-500',
    info: 'bg-white border-l-4 border-amber-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl ${bgColors[type]} max-w-sm`}
    >
      {icons[type]}
      <p className="text-secondary-dark text-sm font-medium">{message}</p>
    </motion.div>
  );
};
export default Toast;
