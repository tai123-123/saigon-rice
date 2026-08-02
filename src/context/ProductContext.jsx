import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('saigon_rice_products');
    if (saved) return JSON.parse(saved);

    const mapped = initialProducts.map(p => ({
      ...p,
      stock: p.id === 'st-25-premium' ? 25 : Math.floor(Math.random() * 40) + 15,
      sales: 0,
      revenue: 0,
      disabled: false,
      views: Math.floor(Math.random() * 250) + 50
    }));
    localStorage.setItem('saigon_rice_products', JSON.stringify(mapped));
    return mapped;
  });

  useEffect(() => {
    localStorage.setItem('saigon_rice_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (prod) => {
    const newProd = {
      ...prod,
      id: prod.id || 'prod-' + Date.now(),
      sales: 0,
      revenue: 0,
      views: 0,
      disabled: false,
      stockStatus: prod.stock === 0 ? "Out of Stock" : (prod.stock < 5 ? "Low Stock" : "In Stock")
    };
    setProducts(prev => [newProd, ...prev]);
    return newProd;
  };

  const editProduct = (updatedProd) => {
    setProducts(prev => prev.map(p => p.id === updatedProd.id ? {
      ...p,
      ...updatedProd,
      stockStatus: updatedProd.stock === 0 ? "Out of Stock" : (updatedProd.stock < 5 ? "Low Stock" : "In Stock")
    } : p));
  };

  const deleteProduct = (prodId) => {
    setProducts(prev => prev.filter(p => p.id !== prodId));
  };

  const disableProduct = (prodId) => {
    setProducts(prev => prev.map(p => p.id === prodId ? { ...p, disabled: !p.disabled } : p));
  };

  return (
    <ProductContext.Provider value={{
      products,
      setProducts,
      addProduct,
      editProduct,
      deleteProduct,
      disableProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
