import { createContext, useState, useContext } from "react";
import { loginUser } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const singin = async (user) => {
    try {
      const response = await loginUser(user);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ singin, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
