import { createContext, useState } from "react";

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the provider
export const AuthProvider = ({ children }) => {
  // Initialize state from sessionStorage if it exists
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // simple login function
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  // simple logout function
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
