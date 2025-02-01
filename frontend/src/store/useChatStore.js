import { create } from "zustand";
import axios from "../api/axios.js";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async (id) => {
    set({ isUsersLoading: true });
    try {
      const res = await axios.get(`/messages/users/${id}`);
      set({ users: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (idUser, myId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axios.get(`/messages/${idUser}/${myId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData, senderId) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axios.post(
        `/messages/send/${selectedUser.idUser}/${senderId}`,
        messageData
      );
    } catch (error) {
      console.log(error);
    }
  },

  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (message) => {
      message.sentAt = new Date().toISOString();
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
