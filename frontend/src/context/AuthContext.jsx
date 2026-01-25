import { createContext, useState } from "react";

// 1. Create the context
export const AuthContext = createContext();
const sampleUser = {
  id: 1,
  uuid: "550e8400-e29b-41d4-a716-446655440000",
  full_name: "Juan Dela Cruz",
  email: "juan@example.com",
  mobile_number: "09123456789",
  role: "landlord",
  tenant_type: "owner",
  profile_image: "https://via.placeholder.com/150",
  is_verified: true,
  created_at: "2026-01-25T10:30:00Z",
};

// 2. Create the provider
export const AuthProvider = ({ children }) => {
  // Initialize state from sessionStorage if it exists
  const [user, setUser] = useState(sampleUser);

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
