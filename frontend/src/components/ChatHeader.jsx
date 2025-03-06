import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-emerald-600 dark:border-emerald-300 bg-neutral-100 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <Link to={`/Perfil/Usuario/${selectedUser.idUser}`}>
                <img
                  className="rounded-full w-full h-full cursor-pointer"
                  src={selectedUser.profileImageUrl || "https://robohash.org/1"}
                  alt={selectedUser.name}
                />
              </Link>
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium text-emerald-600">
              {selectedUser.name} {selectedUser.lastname}
            </h3>
            <p className="text-sm text-emerald-600">
              {onlineUsers.includes(selectedUser.idUser.toString())
                ? "En linea"
                : "Desconectado"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
