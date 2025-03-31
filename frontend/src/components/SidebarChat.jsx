import { useEffect, useState } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { useChatStore } from "../store/useChatStore";
import { Users } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

function SidebarChat() {
  // Extraemos el usuario autenticado desde el contexto de autenticación
  const { user } = useAuth();

  // Extraemos funciones y estados del store de chat
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  // Extraemos la lista de usuarios en línea desde el store de autenticación
  const { onlineUsers } = useAuthStore();

  // Estado local para controlar si se muestran solo los usuarios en línea
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  // Efecto para obtener la lista de usuarios al montar el componente
  useEffect(() => {
    let id = user.idUser; // ID del usuario autenticado
    getUsers(id); // Llama a la función para obtener los usuarios
  }, [getUsers]);

  // Filtra los usuarios según el estado del toggle "Solo en línea"
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user.idUser.toString()))
    : users;

  // Muestra un componente de carga mientras se obtienen los usuarios
  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <>
      {/* Contenedor principal del sidebar */}
      <aside className="h-full w-20 lg:w-72 border-r border-emerald-600 dark:border-emerald-300 flex flex-col transition-all duration-200">
        {/* Encabezado del sidebar */}
        <div className="border-b border-emerald-600 dark:border-emerald-300 w-full p-5">
          <div className="flex items-center gap-2">
            {/* Ícono de contactos */}
            <Users className="size-6 text-emerald-600 dark:text-emerald-300" />
            <span className="font-medium hidden lg:block text-emerald-600 dark:text-emerald-300">
              Contactos
            </span>
          </div>

          {/* Filtro para mostrar solo usuarios en línea */}
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly} // Estado del toggle
                onChange={(e) => setShowOnlineOnly(e.target.checked)} // Actualiza el estado al cambiar
                className="checkbox checkbox-sm border-zinc-500"
              />
              <span className="text-sm text-zinc-500 dark:text-zinc-300">
                Solo en linea
              </span>
            </label>
            <span className="text-xs text-zinc-500">
              ({onlineUsers.length - 1} online) {/* Muestra la cantidad de usuarios en línea */}
            </span>
          </div>
        </div>

        {/* Lista de usuarios */}
        <div className="overflow-y-auto w-full py-3">
          {filteredUsers.map((user) => (
            <button
              key={user.idUser} // Clave única para cada usuario
              onClick={() => setSelectedUser(user)} // Selecciona al usuario al hacer clic
              className={`
              w-full p-3 flex items-center gap-3
              hover:bg-neutral-200 dark:hover:bg-zinc-800 transition-colors
              ${
                selectedUser?.idUser === user.idUser
                  ? "bg-neutral-300 dark:bg-zinc-700" // Resalta al usuario seleccionado
                  : ""
              }
            `}
            >
              {/* Imagen de perfil del usuario */}
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profileImageUrl || "https://robohash.org/1"} // Imagen de perfil o placeholder
                  alt={user.name} // Nombre del usuario como texto alternativo
                  className="size-12 object-cover rounded-full"
                />
                {/* Indicador de estado en línea */}
                {onlineUsers.includes(user.idUser.toString()) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              {/* Información del usuario (visible solo en pantallas grandes) */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate text-zinc-900 dark:text-neutral-100">
                  {user.name} {user.lastname} {/* Nombre completo del usuario */}
                </div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user.idUser.toString())
                    ? "En linea" // Estado en línea
                    : "Desconectado"} // Estado desconectado
                </div>
              </div>
            </button>
          ))}

          {/* Mensaje cuando no hay usuarios en línea */}
          {filteredUsers.length === 0 && (
            <div className="text-center text-zinc-500 py-4">
              Ningún contacto en línea
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default SidebarChat;
