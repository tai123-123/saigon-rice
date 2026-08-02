import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('saigon_rice_notifications');
    if (saved) return JSON.parse(saved);

    const defaultNotifications = [
      {
        id: 'notif-1',
        title: 'Welcome to Saigon Rice Admin Portal',
        message: 'System initialization complete. Real-time data sync active.',
        time: new Date().toISOString(),
        read: false,
        type: 'info'
      }
    ];
    localStorage.setItem('saigon_rice_notifications', JSON.stringify(defaultNotifications));
    return defaultNotifications;
  });

  useEffect(() => {
    localStorage.setItem('saigon_rice_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notif) => {
    const newNotif = {
      id: 'notif-' + Date.now(),
      title: notif.title,
      message: notif.message,
      time: new Date().toISOString(),
      read: false,
      type: notif.type || 'info'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAllNotificationsRead,
      clearNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
