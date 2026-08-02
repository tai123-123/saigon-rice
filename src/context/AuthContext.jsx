import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('saigon_rice_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('saigon_rice_all_users');
    const defaultUsers = [
      {
        fullName: "Demo Customer",
        email: "demo@saigonrice.vn",
        password: "password123",
        role: "customer",
        phone: "0987654321",
        addresses: ["120 Le Loi Street, Ben Thanh Ward, District 1, Ho Chi Minh City"],
        orders: [],
        subscriptions: []
      },
      {
        fullName: "System Administrator",
        email: "admin@saigonrice.vn",
        password: "adminpassword123",
        role: "admin",
        phone: "0999999999",
        addresses: ["Saigon Rice HQ Office, District 1, HCMC"],
        orders: [],
        subscriptions: []
      }
    ];

    if (saved) {
      const parsed = JSON.parse(saved);
      // Guarantee the admin account is always present in users list
      const hasAdmin = parsed.some(u => u.email === 'admin@saigonrice.vn');
      if (!hasAdmin) {
        const updated = [...parsed, defaultUsers[1]];
        localStorage.setItem('saigon_rice_all_users', JSON.stringify(updated));
        return updated;
      }
      return parsed;
    } else {
      localStorage.setItem('saigon_rice_all_users', JSON.stringify(defaultUsers));
      return defaultUsers;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('saigon_rice_user', JSON.stringify(currentUser));
      const updatedUsers = users.map(u => u.email === currentUser.email ? currentUser : u);
      setUsers(updatedUsers);
      localStorage.setItem('saigon_rice_all_users', JSON.stringify(updatedUsers));
    } else {
      localStorage.removeItem('saigon_rice_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, message: "Incorrect email or password." };
  };

  const register = (fullName, phone, email, password) => {
    if (users.find(u => u.email === email)) {
      return { success: false, message: "Email already registered in the system." };
    }
    const newUser = {
      fullName,
      phone,
      email,
      password,
      role: "customer",
      addresses: [],
      orders: [],
      subscriptions: []
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('saigon_rice_all_users', JSON.stringify(updatedUsers));
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return;
    const newProfile = { ...currentUser, ...updatedData };
    setCurrentUser(newProfile);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, updateProfile, users }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
