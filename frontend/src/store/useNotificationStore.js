import { create } from "zustand";
import axios from "../api/axios.js";
import { useAuthStore } from "./useAuthStore";

export const useNotificationStore = create((set, get) => ({
  notifications: [],

  fetchNotifications: async () => {
    const authUser = useAuthStore.getState().authUser;
    if (!authUser || !authUser.idUser) {
      console.error("User is not defined");
      return;
    }
    const userId = authUser.idUser;
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

  subscribeToNotifications: () => {
    const socket = useAuthStore.getState().socket;

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

  unsubscribeFromNotifications: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newNotification");
  },
}));