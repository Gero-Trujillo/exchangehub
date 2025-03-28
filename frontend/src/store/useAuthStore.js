import { create } from "zustand"; // Importa la función `create` de Zustand para crear un estado global
import { loginUser, registerUser } from "../api/auth.js"; // Importa las funciones de autenticación de la API
import Cookies from "js-cookie"; // Importa la librería para manejar cookies
import { io } from "socket.io-client"; // Importa la librería para manejar conexiones de Socket.IO

const BASE_URL = "http://localhost:3000"; // URL base para las conexiones de Socket.IO

// Define el estado global relacionado con la autenticación y la conexión de sockets
export const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null, // Usuario autenticado almacenado en el estado
  isSigningUp: false, // Estado para indicar si el usuario está registrándose
  isLoggingIn: false, // Estado para indicar si el usuario está iniciando sesión
  isUpdatingProfile: false, // Estado para indicar si el perfil del usuario está siendo actualizado
  onlineUsers: [], // Lista de usuarios en línea
  socket: null, // Instancia de Socket.IO

  // Función para iniciar sesión
  login: async (data) => {
    set({ isLoggingIn: true }); // Indica que el inicio de sesión está en progreso
    try {
      const res = await loginUser(data); // Llama a la API para iniciar sesión
      set({ authUser: res.data }); // Almacena los datos del usuario autenticado en el estado
      localStorage.setItem("authUser", JSON.stringify(res.data)); // Guarda los datos del usuario en el almacenamiento local
      get().connectSocket(); // Conecta el socket después de iniciar sesión
    } catch (error) {
      console.log(error.response.data.message); // Loguea el mensaje de error
    } finally {
      set({ isLoggingIn: false }); // Indica que el inicio de sesión ha finalizado
    }
  },

  // Función para registrar un nuevo usuario
  signup: async (data) => {
    set({ isSigningUp: true }); // Indica que el registro está en progreso
    try {
      const res = await registerUser(data); // Llama a la API para registrar al usuario
    } catch (error) {
      console.log(error.response.data.message); // Loguea el mensaje de error
    } finally {
      set({ isSigningUp: false }); // Indica que el registro ha finalizado
    }
  },

  // Función para cerrar sesión
  logout: async () => {
    try {
      Cookies.remove("accessToken"); // Elimina el token de acceso de las cookies
      set({ authUser: null }); // Limpia el estado del usuario autenticado
      get().disconnectSocket(); // Desconecta el socket
    } catch (error) {
      console.log(error.response.data.message); // Loguea el mensaje de error
    }
  },

  // Función para conectar el socket
  connectSocket: () => {
    const { authUser } = get(); // Obtiene el usuario autenticado del estado
    if (!authUser || get().socket?.connected) return; // Si no hay usuario o el socket ya está conectado, no hace nada

    const socket = io(BASE_URL, {
      query: {
        userId: authUser.idUser, // Envía el ID del usuario como parámetro de consulta
      },
    });
    socket.connect(); // Conecta el socket

    set({ socket: socket }); // Almacena la instancia del socket en el estado

    // Escucha el evento "getOnlineUsers" para actualizar la lista de usuarios en línea
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds }); // Actualiza la lista de usuarios en línea en el estado
    });
  },

  // Función para desconectar el socket
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect(); // Desconecta el socket si está conectado
  },

  // Reconecta el socket al cargar la aplicación si el usuario está autenticado
  reconnectSocketOnLoad: () => {
    const authUser = get().authUser; // Obtiene el usuario autenticado del estado
    if (authUser) {
      get().connectSocket(); // Reconecta el socket si el usuario está autenticado
    }
  },
}));
