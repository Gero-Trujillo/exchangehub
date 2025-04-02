import SidebarChat from "../components/SidebarChat";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

function ChatHomePage() {
  // Extraemos el usuario seleccionado desde el store de chat
  const { selectedUser } = useChatStore();

  return (
    <>
      {/* Contenedor principal de la página de chat */}
      <div
        data-aos="fade-left" // Animación al cargar el componente
        className="h-full bg-transparent flex flex-col flex-1 mb-16 md:mb-0"
      >
        {/* Contenedor central con diseño responsivo */}
        <div className="flex items-center justify-center pp-8">
          <div className="rounded-lg shadow-md shadow-neutral-200 dark:shadow-zinc-800 w-full max-w-8xl h-[calc(100vh-8rem)] bg-transparent dark:bg-transparent">
            {/* Contenedor del layout principal del chat */}
            <div className="flex h-full rounded-lg overflow-hidden">
              {/* Barra lateral de contactos */}
              <SidebarChat />
              {/* Muestra el contenedor del chat si hay un usuario seleccionado, de lo contrario muestra un mensaje */}
              {selectedUser ? <ChatContainer /> : <NoChatSelected />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatHomePage;
