import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductProvider, useProducts } from './ProductContext';
import { OrderProvider, useOrders } from './OrderContext';
import { CustomerProvider, useCustomers } from './CustomerContext';
import { InventoryProvider, useInventory } from './InventoryContext';
import { NotificationProvider, useNotifications } from './NotificationContext';
import { AnalyticsProvider, useAnalytics } from './AnalyticsContext';

const StoreContext = createContext();

const StoreInnerProvider = ({ children }) => {
  const { products, addProduct, editProduct, deleteProduct, disableProduct } = useProducts();
  const { orders, addOrder, updateOrderStatus, deleteOrder } = useOrders();
  const { customers, disableAccount, deleteCustomer } = useCustomers();
  const { updateStock, deductStock } = useInventory();
  const { notifications, addNotification, markAllNotificationsRead, clearNotifications } = useNotifications();
  const { getStats } = useAnalytics();

  // Subscriptions state
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('saigon_rice_subscriptions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('saigon_rice_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const toggleSubscription = (subId, action) => {
    setSubscriptions(prev => prev.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          status: action === 'cancel' ? 'Cancelled' : (action === 'pause' ? 'Paused' : 'Active')
        };
      }
      return s;
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const placeOrder = (orderData) => {
    const orderId = 'SGR-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: orderId,
      customerName: orderData.fullName,
      customerEmail: orderData.email,
      customerPhone: orderData.phone,
      shippingAddress: orderData.address,
      orderDate: new Date().toISOString().split('T')[0],
      items: orderData.items,
      subtotal: orderData.subtotal,
      shippingFee: orderData.deliveryFee,
      tax: orderData.vat,
      totalAmount: orderData.total,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'COD' ? 'Pending' : 'Paid',
      orderStatus: 'Pending',
      createdAt: new Date().toISOString()
    };

    // Add order
    addOrder(newOrder);

    // Deduct stock in inventory
    deductStock(orderData.items);

    // Add low stock warnings to notification center if any items run low
    orderData.items.forEach(item => {
      const match = products.find(p => p.id === item.id);
      if (match) {
        const nextStock = Math.max(0, match.stock - item.quantity);
        if (nextStock === 0) {
          addNotification({
            title: 'Out of Stock Warning',
            message: `${match.name} is completely out of stock. Add to cart disabled.`,
            type: 'warning'
          });
        } else if (nextStock < 5) {
          addNotification({
            title: 'Low Stock Warning',
            message: `${match.name} has only ${nextStock} bag(s) left.`,
            type: 'warning'
          });
        }
      }
    });

    // Add notification for new order
    addNotification({
      title: 'New Order Created',
      message: `Order #${orderId} of ${formatPrice(orderData.total)} by ${orderData.fullName} was successfully placed.`,
      type: 'info'
    });

    return orderId;
  };

  return (
    <StoreContext.Provider value={{
      products,
      orders,
      subscriptions,
      notifications,
      customers,
      placeOrder,
      updateOrderStatus,
      addNotification,
      markAllNotificationsRead,
      clearNotifications,
      addProduct,
      editProduct,
      deleteProduct,
      disableProduct,
      deleteOrder,
      updateProductStock: updateStock,
      toggleSubscription,
      disableAccount,
      deleteCustomer,
      getStats
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const StoreProvider = ({ children }) => {
  return (
    <ProductProvider>
      <OrderProvider>
        <CustomerProvider>
          <InventoryProvider>
            <NotificationProvider>
              <AnalyticsProvider>
                <StoreInnerProvider>
                  {children}
                </StoreInnerProvider>
              </AnalyticsProvider>
            </NotificationProvider>
          </InventoryProvider>
        </CustomerProvider>
      </OrderProvider>
    </ProductProvider>
  );
};

export const useStore = () => useContext(StoreContext);
export default StoreContext;
