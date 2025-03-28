import { createContext, useState, useContext, useEffect } from "react";
import { loginUser, registerUser, verifyToken } from "../api/auth.js"; // Importa las funciones de la API relacionadas con la autenticación
import Cookies from "js-cookie"; // Importa la librería para manejar cookies

// Crea el contexto de autenticación
export const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para indicar si el usuario está autenticado
  const [loading, setLoading] = useState(true); // Estado para indicar si la autenticación está en proceso
  const [error, setError] = useState(null); // Estado para almacenar errores relacionados con la autenticación

  // Función para iniciar sesión
  const singin = async (user) => {
    try {
      const response = await loginUser(user); // Llama a la API para iniciar sesión
      setUser(response.data); // Almacena los datos del usuario autenticado
      setIsAuthenticated(true); // Marca al usuario como autenticado
    } catch (error) {
      setError(error.response.data.message); // Almacena el mensaje de error
    }
  };

  // Función para registrar un nuevo usuario
  const singup = async (user) => {
    try {
      const response = await registerUser(user); // Llama a la API para registrar al usuario
      window.location.href = "/register/response"; // Redirige a la página de respuesta después del registro
    } catch (error) {
      setError(error.response.data.message); // Almacena el mensaje de error
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    Cookies.remove("accessToken"); // Elimina el token de acceso de las cookies
    setUser(null); // Limpia los datos del usuario autenticado
    setIsAuthenticated(false); // Marca al usuario como no autenticado
  };

  // Verifica si el usuario está autenticado al cargar la aplicación
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get(); // Obtiene las cookies disponibles

      if (!cookies.accessToken) {
        // Si no hay token de acceso, marca al usuario como no autenticado
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyToken(cookies.accessToken); // Verifica el token de acceso con la API
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null);
          return;
        }

        setUser(res.data); // Almacena los datos del usuario autenticado
        setIsAuthenticated(true); // Marca al usuario como autenticado
        setLoading(false); // Finaliza el estado de carga
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  // Proveedor del contexto que expone las funciones y estados relacionados con la autenticación
  return (
    <AuthContext.Provider
      value={{ singin, singup, logout, user, isAuthenticated, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
