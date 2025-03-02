import { useState, useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageInput from "./MessageInput";
import { useAuth } from "../context/AuthContext";
import { formatMessageTime } from "../libs/utils";
import SeeOffer from "./SeeOffer";

function ChatContainer() {
  const {
    messages,
    selectedUser,
    getMessages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { user } = useAuth();
  const messageEndRef = useRef(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [idMessage, setIdMessage] = useState(null);

  useEffect(() => {
    getMessages(selectedUser.idUser, user.idUser);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser.idUser,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    user.idUser,
  ]);

  const handleViewOffer = (offerDetails, idMessage) => {
    setSelectedOffer(offerDetails);
    setIdMessage(idMessage);
    document.getElementById('seeOfferModal').showModal();
  };

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.idMessage}
              className={`chat ${
                message.idSender === user.idUser ? "chat-end" : "chat-start"
              }`}
              ref={messageEndRef}
            >
              <div className=" chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.idSender === user.idUser
                        ? user.profileImageUrl || "https://robohash.org/1"
                        : selectedUser.profileImageUrl ||
                          "https://robohash.org/1"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1 text-zinc-500 dark:text-zinc-300">
                  {formatMessageTime(message.sentAt)}
                </time>
              </div>
              <div
                className={`chat-bubble flex flex-col ${
                  message.idSender === user.idUser
                    ? "bg-emerald-600 text-white dark:bg-emerald-300 dark:text-zinc-900"
                    : "bg-neutral-200 text-zinc-900 dark:bg-zinc-700 dark:text-neutral-100"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[250px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
                {message.isSpecial ? (
                  <button className="btn bg-neutral-100 border-neutral-100 text-zinc-800  hover:bg-neutral-200 hover:border-neutral-200 dark:bg-zinc-800 dark:border-zinc-800 dark:text-neutral-100 dark:hover:bg-zinc-700 mt-2" onClick={()=>handleViewOffer(message.offerDetails, message.idMessage)}>
                    Ver oferta
                  </button>
                ): null}
              </div>
            </div>
          ))}
        </div>

        <MessageInput />
        {selectedOffer && <SeeOffer offer={selectedOffer} idMessage={idMessage} />}
      </div>
    </>
  );
}

export default ChatContainer;
