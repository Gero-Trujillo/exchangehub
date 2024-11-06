import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { unReadNotificationsFunction } from "../../utils/unReadNotifications";
import moment from "moment";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { notifications, userChats, allUsers, markAllNotificationsAsRead, markNotificationAsRead } =
    useContext(ChatContext);

  const unReadNotifications = unReadNotificationsFunction(notifications);
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);

    return {
      ...n,
      senderName: sender?.name,
    };
  });
  console.log("unReadNotifications", unReadNotifications);
  console.log("modifiedNotifications", modifiedNotifications);

  return (
    <>
      <div className="notifications">
        <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chat-square-dots"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
          {unReadNotifications?.length === 0 ? null : (
            <span className="notification-count">
              <span>{unReadNotifications?.length}</span>
            </span>
          )}
        </div>
        {isOpen ? (
          <div className="notifications-box">
            <div className="notifications-header">
              <h3>Notifications</h3>
              <div className="mark-as-read"onClick={() => markAllNotificationsAsRead(notifications)}>Mark all as read</div>
            </div>
            {modifiedNotifications?.length === 0 ? (
              <span
                className="notification"
              >
                No Notifications yet...
              </span>
            ) : null}
            {modifiedNotifications &&
              modifiedNotifications.map((n, index) => {
                return (
                  <div
                    key={index}
                    className={
                      n.isRead ? "notification" : "notification not-read"
                    }
                    onClick={() =>{
                        markNotificationAsRead(n, userChats, user, notifications)
                        setIsOpen(false)
                    }}
                  >
                    <span>{`${n.senderName} sent you New Message`}</span>
                    <span className="notification-time">
                      {moment(n.date).calendar()}
                    </span>
                  </div>
                );
              })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Notification;
