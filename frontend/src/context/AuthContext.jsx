import { createContext, useState, useContext, useEffect } from "react";
import { loginUser, registerUser, verifyToken } from "../api/auth.js";
import Cookies from "js-cookie";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const singin = async (user) => {
    try {
      const response = await loginUser(user);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const singup = async (user) => {
    try {
      const response = await registerUser(user);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.accessToken) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyToken(cookies.accessToken);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null);
          return;
        }

        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ singin, singup, user, isAuthenticated, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
