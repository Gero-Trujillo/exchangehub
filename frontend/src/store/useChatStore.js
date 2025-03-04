import { create } from "zustand";
import axios from "../api/axios.js";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  unreadMessages: 0, // 🔔 Contador de mensajes no leídos
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async (id) => {
    set({ isUsersLoading: true });
    try {
      const res = await axios.get(`/messages/users/${id}`);
      const usersWithUnread = res.data.map((user) => ({
        ...user,
        hasUnreadMessages: user.unreadCount > 0, // ✅ Marcar si tiene mensajes no leídos
      }));
      
      const unreadCount = usersWithUnread.filter((u) => u.hasUnreadMessages).length;

      set({ users: usersWithUnread, unreadMessages: unreadCount });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getUser: async (id) => {
    try {
      const res = await axios.get(`/users/${id}`);
      set({ selectedUser: res.data });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  getMessages: async (idUser, myId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axios.get(`/messages/${idUser}/${myId}`);
      set({ messages: res.data });

      // 🔄 Marcar como leídos cuando se abren los mensajes
      get().markMessagesAsRead(idUser, myId);
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData, senderId) => {
    const { selectedUser, messages } = get();
    try {
      await axios.post(
        `/messages/send/${selectedUser.idUser}/${senderId}`,
        messageData
      );
    } catch (error) {
      console.log(error);
    }
  },

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    if (!socket) return;
    socket.on("newMessage", (message) => {
      message.sentAt = new Date().toISOString();
      set((state) => ({
        messages: [...state.messages, message],
        unreadMessages: state.unreadMessages + 1, // 🔔 Aumentar contador
      }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },

  markMessagesAsRead: async (idUser, myId) => {
    try {
      await axios.post(`/messages/read/${idUser}/${myId}`);
      
      // 🔄 Actualizar el estado de usuarios y notificaciones
      set((state) => ({
        users: state.users.map((user) =>
          user.id === idUser ? { ...user, hasUnreadMessages: false } : user
        ),
        unreadMessages: Math.max(0, state.unreadMessages - 1),
      }));
    } catch (error) {
      console.log(error);
    }
  },

  updateIsSpecialStatus: async (idMessage) => {
    try {
      await axios.patch(`/messages/${idMessage}`);
    } catch (error) {
      console.log(error);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
