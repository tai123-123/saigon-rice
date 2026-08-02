import React, { createContext, useContext } from 'react';
import { useProducts } from './ProductContext';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const { products, setProducts } = useProducts();

  const updateStock = (prodId, newStock) => {
    setProducts(prev => prev.map(p => {
      if (p.id === prodId) {
        const stockStatus = newStock === 0 ? "Out of Stock" : (newStock < 5 ? "Low Stock" : "In Stock");
        return { ...p, stock: newStock, stockStatus };
      }
      return p;
    }));
  };

  const deductStock = (items) => {
    setProducts(prev => prev.map(p => {
      const orderItem = items.find(item => item.id === p.id);
      if (orderItem) {
        const nextStock = Math.max(0, (p.stock || 0) - orderItem.quantity);
        const nextSales = (p.sales || 0) + orderItem.quantity;
        const nextRevenue = (p.revenue || 0) + (Math.round(p.price * (1 - (p.discount || 0) / 100)) * orderItem.quantity);
        const stockStatus = nextStock === 0 ? "Out of Stock" : (nextStock < 5 ? "Low Stock" : "In Stock");
        return { ...p, stock: nextStock, sales: nextSales, revenue: nextRevenue, stockStatus };
      }
      return p;
    }));
  };

  return (
    <InventoryContext.Provider value={{
      updateStock,
      deductStock
    }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
