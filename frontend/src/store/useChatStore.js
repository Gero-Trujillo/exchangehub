import { create } from "zustand";
import axios from "../api/axios.js";

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
      const { data } = await axios.get(`/messages/${idUser}/${myId}`);
      console.log(data)
      set({ messages: data });
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
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log(error);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
