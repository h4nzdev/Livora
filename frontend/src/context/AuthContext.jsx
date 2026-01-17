import { createContext, useState } from "react";

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  // simple login function
  const login = (userData) => {
    setUser(userData);
  };

  // simple logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
