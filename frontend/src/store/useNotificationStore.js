import { create } from "zustand";
import axios from "../api/axios.js";

export const useNotificationStore = create((set, get) => ({
  notifications: [],

  fetchNotifications: async (userId) => {
    try {
      const res = await axios.get(`/notifications/${userId}`);
      set({ notifications: res.data });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  },

  markAsRead: async (idNotification) => {
    try {
      await axios.patch(`/notifications/${idNotification}`);
      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.idNotification === idNotification
            ? { ...notification, isRead: true }
            : notification
        ),
      }));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  },

  markMessagesAsRead: async (senderId, receiverId) => {
    try {
      await axios.patch(`/messages/markAsRead`, { senderId, receiverId });
      // Actualizar el estado de los mensajes si es necesario
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  },

  subscribeToNotifications: (socket) => {
    if (!socket) return;

    const handleNewNotification = (notification) => {
      set((state) => ({
        notifications: [notification, ...state.notifications],
      }));
    };

    socket.on("newNotification", handleNewNotification);

    return () => {
      socket.off("newNotification", handleNewNotification);
    };
  },
}));