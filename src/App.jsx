import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRouter from './router/AppRouter';
import Toast from './components/Toast';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  return (
    <StoreProvider>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            
            {/* Main Content Area */}
            <main className="flex-grow">
              <AppRouter onShowToast={showToast} />
            </main>

            <Footer />

            {/* Toast Notification Container */}
            <AnimatePresence>
              {toast.show && (
                <Toast
                  message={toast.message}
                  type={toast.type}
                  onClose={closeToast}
                />
              )}
            </AnimatePresence>
          </div>
        </CartProvider>
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;
