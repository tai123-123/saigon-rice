import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('saigon_rice_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('saigon_rice_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          orderStatus: newStatus,
          paymentStatus: newStatus === 'Delivered' ? 'Paid' : o.paymentStatus
        };
      }
      return o;
    }));
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  return (
    <OrderContext.Provider value={{
      orders,
      setOrders,
      addOrder,
      updateOrderStatus,
      deleteOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
