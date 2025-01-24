import {useEffect, useState} from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { useChatStore } from "../store/useChatStore";
import { Users } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";


function SidebarChat() {
  const { user } = useAuth();
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const onlineUsers  = [2,4];
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    let id = user.idUser;
    getUsers(id);
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user.idUser))
    : users;


  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <>
      <aside className="h-full w-20 lg:w-72 border-r border-emerald-600 dark:border-emerald-300 flex flex-col transition-all duration-200">
        <div className="border-b border-emerald-600 dark:border-emerald-300 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className="size-6 text-emerald-600 dark:text-emerald-300" />
            <span className="font-medium hidden lg:block text-emerald-600 dark:text-emerald-300">Contactos</span>
          </div>
          {/* TODO: Online filter toggle */}
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-sm border-zinc-500"
              />
              <span className="text-sm text-zinc-500 dark:text-zinc-300">Solo en linea</span>
            </label>
            <span className="text-xs text-zinc-500">
              ({onlineUsers.length - 1} online)
            </span>
          </div>
        </div>

        <div className="overflow-y-auto w-full py-3">
          {filteredUsers.map((user) => (
            <button
              key={user.idUser}
              onClick={() => setSelectedUser(user)}
              className={`
              w-full p-3 flex items-center gap-3
              hover:bg-neutral-200 dark:hover:bg-zinc-800 transition-colors
              ${
                selectedUser?.idUser === user.idUser
                  ? "bg-neutral-300 dark:bg-zinc-700"
                  : ""
              }
            `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profileImageUrl || "https://robohash.org/1"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user.idUser) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate text-zinc-900 dark:text-neutral-100">{user.name} {user.lastname}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user.idUser) ? "En linea" : "Desconectado"}
                </div>
              </div>
            </button>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center text-zinc-500 py-4">
              Ningun conatcto en linea
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default SidebarChat;
