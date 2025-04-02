import { Navigate, Outlet } from "react-router-dom"; // Importa componentes de React Router para navegación y renderizado de rutas anidadas
import { useAuth } from "./context/AuthContext"; // Importa el contexto de autenticación para verificar el estado del usuario

/**
 * Componente para proteger rutas que requieren autenticación.
 * Redirige al usuario a la página de inicio de sesión si no está autenticado.
 */
function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth(); // Obtiene el estado de autenticación y el indicador de carga desde el contexto

  // Muestra un mensaje de carga mientras se verifica el estado de autenticación
  if (loading) return <h1>Cargando...</h1>;

  // Redirige al usuario a la página de inicio de sesión si no está autenticado
  if (!loading && !isAuthenticated) return <Navigate to="/login" />;

  // Renderiza las rutas protegidas si el usuario está autenticado
  return <Outlet />;
}

export default ProtectedRoute; // Exporta el componente para usarlo en las rutas protegidas
