import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('saigon_rice_all_users');
    if (saved) {
      return JSON.parse(saved).filter(u => u.role !== 'admin');
    }
    return [];
  });

  // Sync with storage changes
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('saigon_rice_all_users');
      if (saved) {
        setCustomers(JSON.parse(saved).filter(u => u.role !== 'admin'));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const disableAccount = (email) => {
    const savedUsers = JSON.parse(localStorage.getItem('saigon_rice_all_users')) || [];
    const updated = savedUsers.map(u => u.email === email ? { ...u, disabled: !u.disabled } : u);
    localStorage.setItem('saigon_rice_all_users', JSON.stringify(updated));
    setCustomers(updated.filter(u => u.role !== 'admin'));

    // Trigger AuthContext update if it's currently logged-in user
    const currentUser = JSON.parse(localStorage.getItem('saigon_rice_user'));
    if (currentUser && currentUser.email === email) {
      localStorage.setItem('saigon_rice_user', JSON.stringify({ ...currentUser, disabled: !currentUser.disabled }));
    }
    // Dispatch standard event to notify other contexts
    window.dispatchEvent(new Event('storage'));
  };

  const deleteCustomer = (email) => {
    const savedUsers = JSON.parse(localStorage.getItem('saigon_rice_all_users')) || [];
    const updated = savedUsers.filter(u => u.email !== email);
    localStorage.setItem('saigon_rice_all_users', JSON.stringify(updated));
    setCustomers(updated.filter(u => u.role !== 'admin'));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <CustomerContext.Provider value={{
      customers,
      disableAccount,
      deleteCustomer
    }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomerContext);
