import React, { createContext, useContext } from 'react';
import { useOrders } from './OrderContext';
import { useProducts } from './ProductContext';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const { orders } = useOrders();
  const { products } = useProducts();

  const getStats = () => {
    const totalOrdersCount = orders.length;
    const completedOrdersCount = orders.filter(o => o.orderStatus === 'Delivered').length;
    const pendingOrdersCount = orders.filter(o => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled').length;
    const cancelledOrdersCount = orders.filter(o => o.orderStatus === 'Cancelled').length;

    // Filter today's orders
    const todayStr = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.orderDate === todayStr);
    const todayOrdersCount = todayOrders.length;

    // Filter monthly orders (August index 7 or current month)
    const currentMonth = new Date().getMonth();
    const monthlyOrders = orders.filter(o => {
      if (!o.orderDate) return false;
      return new Date(o.orderDate).getMonth() === currentMonth;
    });
    const monthlyOrdersCount = monthlyOrders.length;

    // Total Revenue (only from delivered/completed orders as per logic: "Revenue must be calculated from completed orders only. Completed Orders -> Sum(order.total)")
    const completedOrdersList = orders.filter(o => o.orderStatus === 'Delivered');
    const totalRevenue = completedOrdersList.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    // Today's Revenue
    const todayRevenue = todayOrders.filter(o => o.orderStatus === 'Delivered').reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    // Monthly Revenue
    const monthlyRevenue = monthlyOrders.filter(o => o.orderStatus === 'Delivered').reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    // Average Order Value
    const averageOrderValue = completedOrdersCount > 0 ? Math.round(totalRevenue / completedOrdersCount) : 0;

    // Products metrics
    const totalProductsCount = products.length;
    const lowStockCount = products.filter(p => p.stock > 0 && p.stock < 5).length;
    const outOfStockCount = products.filter(p => p.stock === 0).length;

    return {
      totalOrders: totalOrdersCount,
      completedOrders: completedOrdersCount,
      pendingOrders: pendingOrdersCount,
      cancelledOrders: cancelledOrdersCount,
      todayOrders: todayOrdersCount,
      monthlyOrders: monthlyOrdersCount,
      totalRevenue,
      todayRevenue,
      monthlyRevenue,
      averageOrderValue,
      totalProducts: totalProductsCount,
      lowStockProducts: lowStockCount,
      outOfStockProducts: outOfStockCount
    };
  };

  return (
    <AnalyticsContext.Provider value={{
      getStats
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);
