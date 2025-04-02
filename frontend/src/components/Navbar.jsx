import logo from "../assets/exchangeLogo.png"; // Importa el logo de la aplicación
import { useEffect, useState } from "react"; // Importa hooks de React para manejar estados y efectos
import { Link, useLocation, useNavigate } from "react-router-dom"; // Importa herramientas para navegación entre rutas
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación
import { useChatStore } from "../store/useChatStore"; // Importa el estado global del chat
import "./Navbar.css"; // Importa los estilos específicos para la barra de navegación
import { useNotificationStore } from "../store/useNotificationStore"; // Importar useNotificationStore
import { useAuthStore } from "../store/useAuthStore"; // Importar useAuthStore
import {
  IoHomeOutline,
  IoPersonOutline,
  IoBagHandleOutline,
  IoRocketOutline,
  IoNotificationsOutline
} from "react-icons/io5"; // Importa iconos
import { FiMessageCircle } from "react-icons/fi"; // Importa iconos de mensajes

/**
 * Componente `Navbar` para mostrar la barra de navegación de la aplicación.
 * Incluye enlaces a diferentes secciones, un selector de tema (claro/oscuro) y notificaciones de mensajes.
 */
function Navbar() {
  const location = useLocation(); // Obtiene la ubicación actual de la ruta
  const navigate = useNavigate(); // Hook para redirigir a otras rutas
  const { isAuthenticated, user } = useAuth(); // Obtiene el estado de autenticación y el usuario actual
  const { unreadMessages, users, getUsers, getUser, messages } = useChatStore(); // Obtiene mensajes no leídos y funciones relacionadas con el chat
  const { authUser } = useAuthStore();
  const {
    notifications,
    fetchNotifications,
    markAsRead,
    subscribeToNotifications,
  } = useNotificationStore(); // Obtener notificaciones
  const [timestamp, setTimestamp] = useState(Date.now());

  // Menú de navegación con enlaces a diferentes secciones
  const Menus = [
    { name: "Inicio", icon: "home-outline", dis: "translate-x-0", path: "/" },
    {
      name: "Perfil",
      icon: "person-outline",
      dis: "translate-x-16",
      path: "/Perfil",
    },
    {
      name: "Mensajes",
      icon: "chatbubble-outline",
      dis: "translate-x-32",
      path: "/Mensajes",
    },
    {
      name: "Productos",
      icon: "bag-handle-outline",
      dis: "translate-x-48",
      path: "/Productos",
    },
    {
      name: "Premium",
      icon: "rocket-outline",
      dis: "translate-x-64",
      path: "/Premium",
    },
  ];

  const [active, setActive] = useState(0); // Estado para rastrear el menú activo
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark" // Obtiene el tema actual del almacenamiento local o establece "dark" como predeterminado
  );
  const [showNotifications, setShowNotifications] = useState(false); // Estado para mostrar/ocultar las notificaciones

  // Actualiza el menú activo según la ruta actual
  useEffect(() => {
    const currentPath = location.pathname.slice(1).toLowerCase(); // Obtiene la ruta actual
    const activeIndex = Menus.findIndex(
      (menu) =>
        menu.name.toLowerCase() === currentPath ||
        currentPath.startsWith(menu.name.toLowerCase())
    );
    if (activeIndex !== -1) {
      setActive(activeIndex); // Establece el índice del menú activo
    }
  }, [location.pathname, Menus]);

  // Obtiene los usuarios y mensajes no leídos si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated && authUser && authUser.idUser) {
      fetchNotifications(); // Obtener notificaciones
    }
  }, [isAuthenticated, authUser, getUsers, fetchNotifications, timestamp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now()); // Actualizar el timestamp cada segundo
    }, 3000);
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  // Aplica el tema (claro/oscuro) al cargar el componente o cuando cambia el tema
  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark"); // Agrega la clase "dark" al elemento HTML
    } else {
      document.querySelector("html").classList.remove("dark"); // Elimina la clase "dark" del elemento HTML
    }
    localStorage.setItem("theme", theme); // Guarda el tema en el almacenamiento local
  }, [theme]);

  useEffect(() => {
    if (authUser && authUser.socket) {
      const unsubscribe = subscribeToNotifications(authUser.socket);
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [authUser, subscribeToNotifications]);

  const handleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleNotificationClick = (idNotification, idSender) => {
    markAsRead(idNotification); // Marcar la notificación como leída
    setShowNotifications(false);
    getUser(idSender);
    navigate("/mensajes");
  };

  // Agregar evento de clic al documento para cerrar notificaciones
  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Evitar que el clic en el icono de notificaciones cierre las notificaciones
  const handleNotificationIconClick = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="navbar w-[100%] flex flex-col md:flex-row justify-evenly items-center p-4 sticky top-0 border-b-2 z-20 bg-neutral-100 dark:bg-zinc-900 py-6">
      {/* Logo y nombre de la aplicación */}
      <Link to="/">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-24" />
          <h1 className="text-4xl font-bold text-emerald-600">
            Exchange<span className="text-emerald-300">Hub</span>
          </h1>
        </div>
      </Link>

      {/* Menú de navegación para usuarios autenticados */}
      {isAuthenticated ? (
        <div className="bg-emerald-600 dark:bg-emerald-300 max-h-[4.4rem] px-6 md:rounded-xl w-full md:max-w-fit flex gap-8 items-center fixed bottom-0 md:relative">
          <ul className="flex relative text-white">
            {/* Indicador del menú activo */}
            <span
              className={`bg-emerald-300 dark:bg-emerald-600 duration-500 ${Menus[active].dis} border-4 border-slate-100 dark:border-zinc-900 h-16 w-16 absolute -top-5 rounded-full`}
            ></span>

            {/* Elementos del menú */}
            {Menus.map((menu, i) => (
              <li key={i} className="w-16 dark:text-emerald-900">
                <Link
                  to={menu.name}
                  className="flex flex-col text-center pt-6"
                  onClick={() => setActive(i)} // Cambia el menú activo al hacer clic
                >
                  <span
                    className={`text-xl cursor-pointer duration-500 ${
                      i === active && "-mt-6 text-zinc-800 dark:text-slate-100"
                    }`}
                  >
                    <ion-icon name={menu.icon}></ion-icon>
                  </span>
                  <span
                    className={`${
                      active === i
                        ? "translate-y-4 duration-700 opacity-100"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    {menu.name}
                  </span>
                </Link>
              </li>
            ))}

            {/* Icono de notificaciones */}
            <li className="relative w-16 dark:text-emerald-900">
              <div
                className="flex flex-col text-center pt-6 cursor-pointer"
                onClick={handleNotificationIconClick}
              >
                <span className="text-xl relative">
                  <ion-icon name="notifications-outline"></ion-icon>
                  {notifications.filter((notification) => !notification.isRead)
                    .length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs font-bold rounded-full px-2">
                      {
                        notifications.filter(
                          (notification) => !notification.isRead
                        ).length
                      }
                    </span>
                  )}
                </span>
              </div>

              {showNotifications && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 w-64">
                  <h3 className="font-bold text-black dark:text-white mb-2">
                    Mensajes nuevos
                  </h3>
                  {notifications
                    .filter((notification) => !notification.isRead)
                    .map((notification) => (
                      <div
                        key={notification.idNotification}
                        className="p-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer"
                        onClick={() =>
                          handleNotificationClick(
                            notification.idNotification,
                            notification.idSender
                          )
                        }
                      >
                        <strong>
                          {
                            users.find(
                              (user) => user.idUser === notification.idSender
                            )?.name
                          }
                        </strong>
                        <p className="text-sm">
                          {notification.message || "Imagen adjunta"}
                        </p>
                      </div>
                    ))}
                  <button
                    className="mt-2 w-full bg-emerald-600 text-white py-1 rounded"
                    onClick={() =>
                      notifications.forEach((notification) =>
                        markAsRead(notification.idNotification)
                      )
                    }
                  >
                    Leer todas las notificaciones
                  </button>
                </div>
              )}
            </li>
          </ul>

          {/* Botón para cambiar el tema */}
          <button
            className="text-3xl cursor-pointer text-slate-100 dark:text-emerald-900"
            onClick={handleTheme}
          >
            {theme === "light" ? (
              <ion-icon name="sunny-outline"></ion-icon>
            ) : (
              <ion-icon name="moon-outline"></ion-icon>
            )}
          </button>
        </div>
      ) : (
        // Opciones para usuarios no autenticados
        <div className="flex gap-4">
          <button className="relative px-8 py-2 rounded-md bg-neutral-100 isolation-auto z-10 border-2 border-emerald-600 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-600 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-emerald-600 hover:text-emerald-300 dark:bg-zinc-900 dark:border-emerald-300 dark:before:bg-emerald-300 dark:text-emerald-300 dark:hover:text-emerald-600">
            <Link to="/login">Iniciar sesión</Link>
          </button>

          <div className="block content-center">
            <button
              className="text-3xl cursor-pointer text-emerald-600 dark:text-emerald-300"
              onClick={handleTheme}
            >
              {theme === "light" ? (
                <ion-icon name="sunny-outline"></ion-icon>
              ) : (
                <ion-icon name="moon-outline"></ion-icon>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar; // Exporta el componente para su uso en otras partes de la aplicación
