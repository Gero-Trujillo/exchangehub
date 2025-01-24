import SidebarChat from "../components/SidebarChat";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

function ChatHomePage() {
  const { selectedUser } = useChatStore();
  return (
    <>
      <div className="h-screen bg-transparent">
        <div className="flex items-center justify-center pt-8 px-4">
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
