import { create } from "zustand";
import { loginUser, registerUser } from "../api/auth.js";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await loginUser(data);
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await registerUser(data);
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      Cookies.remove("accessToken");
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      console.log(error.response.data.message);
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser.idUser,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
