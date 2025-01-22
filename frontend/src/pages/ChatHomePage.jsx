import SidebarChat from "../components/SidebarChat";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

function ChatHomePage() {
  const selectedChat = false;
  return (
    <>
      <section className="bg-neutral-100 w-full flex justify-center items-center p-2 md:p-4 lg:p-6 xl:p-8">
        <SidebarChat />
        {!selectedChat ? <NoChatSelected /> : <ChatContainer />}
      </section>
    </>
  );
}

export default ChatHomePage;
