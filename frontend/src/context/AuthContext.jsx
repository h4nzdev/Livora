// context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const initAuth = async () => {
      const storedUser = sessionStorage.getItem("user");

      if (storedUser) {
        // Use stored user if available
        setUser(JSON.parse(storedUser));
      } else {
        // Check Supabase session
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          sessionStorage.setItem("user", JSON.stringify(currentUser));
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  // Login function - calls the service
  const login = async (email, password) => {
    const result = await authService.login(email, password);

    if (result.success && result.user) {
      setUser(result.user);
      sessionStorage.setItem("user", JSON.stringify(result.user));
    }

    return result;
  };

  // Logout function - calls the service
  const logout = async () => {
    const result = await authService.logout();

    if (result.success) {
      setUser(null);
      sessionStorage.removeItem("user");
    }

    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
