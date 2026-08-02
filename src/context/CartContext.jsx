import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('saigon_rice_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountFlat, setDiscountFlat] = useState(0);

  useEffect(() => {
    localStorage.setItem('saigon_rice_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, selectedBagSize = null) => {
    setCartItems(prev => {
      const bagSize = selectedBagSize || product.bagSize;
      const existingIndex = prev.findIndex(item => item.id === product.id && item.bagSize === bagSize);
      
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { ...product, quantity, bagSize }];
      }
    });
  };

  const removeFromCart = (id, bagSize) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.bagSize === bagSize)));
  };

  const updateQuantity = (id, bagSize, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, bagSize);
      return;
    }
    setCartItems(prev => prev.map(item => 
      (item.id === id && item.bagSize === bagSize) ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscountPercent(0);
    setDiscountFlat(0);
  };

  const applyPromo = (code) => {
    const sanitized = code.trim().toUpperCase();
    if (sanitized === 'WELCOME10') {
      setPromoCode(sanitized);
      setDiscountPercent(10);
      setDiscountFlat(0);
      return { success: true, message: 'Applied coupon WELCOME10 for 10% off!' };
    } else if (sanitized === 'SAIGON5') {
      setPromoCode(sanitized);
      setDiscountPercent(5);
      setDiscountFlat(0);
      return { success: true, message: 'Applied coupon SAIGON5 for 5% off!' };
    } else if (sanitized === 'GAOSACH') {
      setPromoCode(sanitized);
      setDiscountFlat(30000);
      setDiscountPercent(0);
      return { success: true, message: 'Applied coupon GAOSACH for 30,000đ off!' };
    }
    return { success: false, message: 'Invalid or expired coupon code.' };
  };

  const removePromo = () => {
    setPromoCode('');
    setDiscountPercent(0);
    setDiscountFlat(0);
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const discountedPrice = item.price * (1 - (item.discount || 0) / 100);
    return sum + discountedPrice * item.quantity;
  }, 0);

  const discountAmount = (subtotal * (discountPercent / 100)) + discountFlat;
  const deliveryFee = subtotal > 500000 || subtotal === 0 ? 0 : 30000;
  const vat = Math.round((subtotal - discountAmount) * 0.1);
  const total = Math.max(0, subtotal - discountAmount + deliveryFee + vat);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      promoCode,
      applyPromo,
      removePromo,
      subtotal,
      discountAmount,
      deliveryFee,
      vat,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
