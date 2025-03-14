import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../store/useNotificationStore";
import { useSocket } from "../context/SocketProvider.jsx";

const Notifications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { notifications, fetchNotifications, markAsRead, subscribeToNotifications } = useNotificationStore();
  const socket = useSocket();

  useEffect(() => {
    if (user && user.idUser) {
      fetchNotifications(user.idUser);
    }
  }, [user, fetchNotifications]);

  useEffect(() => {
    const unsubscribe = subscribeToNotifications(socket);
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [socket, subscribeToNotifications]);

  const handleMarkAsRead = async (idNotification) => {
    await markAsRead(idNotification);
  };

  const handleRedirectToChat = async (idSender, idNotification) => {
    await handleMarkAsRead(idNotification);
    navigate(`/mensajes?idSender=${idSender}`);
  };

  return (
    <div className="notifications">
      <h2>Notificaciones</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.idNotification} className={notification.isRead ? "read" : "unread"}>
            <p>{notification.message}</p>
            <button onClick={() => handleMarkAsRead(notification.idNotification)}>
              Marcar como leído
            </button>
            <button onClick={() => handleRedirectToChat(notification.idSender, notification.idNotification)}>
              Ir al chat
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;