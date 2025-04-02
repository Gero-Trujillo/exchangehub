import { create } from "zustand"; // Importa la función `create` de Zustand para crear un estado global
import axios from "../api/axios.js"; // Importa la instancia de Axios configurada para realizar solicitudes HTTP
import { useAuthStore } from "./useAuthStore"; // Importa el estado global relacionado con la autenticación

// Define el estado global relacionado con el chat
export const useChatStore = create((set, get) => ({
  messages: [], // Lista de mensajes del chat
  users: [], // Lista de usuarios con los que el usuario autenticado ha interactuado
  unreadMessages: 0, // 🔔 Contador de mensajes no leídos
  selectedUser: null, // Usuario actualmente seleccionado en el chat
  isUsersLoading: false, // Estado de carga para la lista de usuarios
  isMessagesLoading: false, // Estado de carga para los mensajes

  // Obtiene la lista de usuarios con los que el usuario autenticado ha interactuado
  getUsers: async (id) => {
    set({ isUsersLoading: true }); // Indica que la lista de usuarios está cargando
    try {
      const res = await axios.get(`/messages/users/${id}`); // Solicita la lista de usuarios desde la API
      const usersWithUnread = res.data.map((user) => ({
        ...user,
        hasUnreadMessages: user.unreadCount > 0, // ✅ Marca si el usuario tiene mensajes no leídos
      }));

      const unreadCount = usersWithUnread.filter((u) => u.hasUnreadMessages).length; // Calcula el total de mensajes no leídos

      set({ users: usersWithUnread, unreadMessages: unreadCount }); // Actualiza la lista de usuarios y el contador de mensajes no leídos
    } catch (error) {
      console.log(error); // Loguea el error si ocurre
    } finally {
      set({ isUsersLoading: false }); // Indica que la carga ha finalizado
    }
  },

  // Obtiene los datos de un usuario específico por su ID
  getUser: async (id) => {
    try {
      const res = await axios.get(`/users/${id}`); // Solicita los datos del usuario desde la API
      set({ selectedUser: res.data }); // Actualiza el usuario seleccionado en el estado
      return res.data; // Devuelve los datos del usuario
    } catch (error) {
      console.log(error); // Loguea el error si ocurre
    }
  },

  // Obtiene los mensajes entre el usuario autenticado y otro usuario
  getMessages: async (idUser, myId) => {
    set({ isMessagesLoading: true }); // Indica que los mensajes están cargando
    try {
      const res = await axios.get(`/messages/${idUser}/${myId}`); // Solicita los mensajes desde la API
      set({ messages: res.data }); // Actualiza la lista de mensajes en el estado

      // 🔄 Marca los mensajes como leídos
      get().markMessagesAsRead(idUser, myId);
    } catch (error) {
      console.log(error); // Loguea el error si ocurre
    } finally {
      set({ isMessagesLoading: false }); // Indica que la carga ha finalizado
    }
  },

  // Envía un mensaje a otro usuario
  sendMessage: async (messageData, senderId) => {
    const { selectedUser } = get(); // Obtiene el usuario seleccionado del estado
    try {
      await axios.post(
        `/messages/send/${selectedUser.idUser}/${senderId}`,
        messageData
      ); // Envía el mensaje a través de la API
    } catch (error) {
      console.log(error); // Loguea el error si ocurre
    }
  },

  // Agrega un mensaje a la lista de mensajes en el estado
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  // Se suscribe a los eventos de nuevos mensajes a través de Socket.IO
  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket; // Obtiene la instancia del socket desde el estado global

    if (!socket) return; // Si no hay socket, no hace nada
    socket.on("newMessage", (message) => {
      message.sentAt = new Date().toISOString(); // Agrega la marca de tiempo al mensaje
      set((state) => ({
        messages: [...state.messages, message], // Agrega el nuevo mensaje a la lista
        unreadMessages: state.unreadMessages + 1, // 🔔 Incrementa el contador de mensajes no leídos
        users: state.users.map((user) =>
          user.id === message.idSender
            ? { ...user, hasUnreadMessages: true } // Marca al usuario como con mensajes no leídos
            : user
        ),
      }));
    });
  },

  // Cancela la suscripción a los eventos de nuevos mensajes
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket; // Obtiene la instancia del socket desde el estado global
    if (!socket) return; // Si no hay socket, no hace nada
    socket.off("newMessage"); // Cancela la suscripción al evento "newMessage"
  },

  // Marca los mensajes como leídos entre el usuario autenticado y otro usuario
  markMessagesAsRead: async (idUser, myId) => {
    try {
      await axios.post(`/messages/read/${idUser}/${myId}`); // Marca los mensajes como leídos en la API

      // 🔄 Actualiza el estado de los usuarios y el contador de mensajes no leídos
      set((state) => ({
        users: state.users.map((user) =>
          user.id === idUser ? { ...user, hasUnreadMessages: false } : user
        ),
        unreadMessages: Math.max(0, state.unreadMessages - 1),
      }));
    } catch (error) {
      console.log(error); // Loguea el error si ocurre
    }
  },

  // Actualiza el estado de un mensaje especial (por ejemplo, marcarlo como importante)
  updateIsSpecialStatus: async (idMessage) => {
    try {
      await axios.patch(`/messages/${idMessage}`); // Actualiza el estado del mensaje en la API
    } catch (error) {
      console.log(error); // Loguea el error si ocurre
    }
  },

  // Establece el usuario seleccionado en el estado
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
