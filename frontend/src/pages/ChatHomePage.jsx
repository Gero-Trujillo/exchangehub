import SidebarChat from "../components/SidebarChat";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

function ChatHomePage() {
  const { selectedUser } = useChatStore();
  return (
    <>
      <div data-aos="fade-left" className="h-full bg-transparent flex flex-col flex-1 mb-16 md:mb-0">
        <div className="flex items-center justify-center pp-8">
          <div className="rounded-lg shadow-md shadow-neutral-200 dark:shadow-zinc-800 w-full max-w-8xl h-[calc(100vh-8rem)] bg-transparent dark:bg-transparent">
            <div className="flex h-full rounded-lg overflow-hidden">
              <SidebarChat />
              {selectedUser ? <ChatContainer /> : <NoChatSelected />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatHomePage;
