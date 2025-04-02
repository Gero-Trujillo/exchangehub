import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

/**
 * Componente `ChatHeader` para mostrar la cabecera del chat.
 * Incluye el avatar, nombre del usuario seleccionado, su estado (en línea o desconectado)
 * y un botón para cerrar el chat.
 */
function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore(); // Obtiene el usuario seleccionado y la función para deseleccionarlo
  const { onlineUsers } = useAuthStore(); // Obtiene la lista de usuarios en línea desde el estado global

  return (
    <div className="p-2.5 border-b border-emerald-600 dark:border-emerald-300 bg-neutral-100 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar del usuario */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <Link to={`/Perfil/Usuario/${selectedUser.idUser}`}>
                <img
                  className="rounded-full w-full h-full cursor-pointer"
                  src={selectedUser.profileImageUrl || "https://robohash.org/1"} // Imagen del usuario o una predeterminada
                  alt={selectedUser.name} // Texto alternativo con el nombre del usuario
                />
              </Link>
            </div>
          </div>

          {/* Información del usuario */}
          <div>
            <h3 className="font-medium text-emerald-600">
              {selectedUser.name} {selectedUser.lastname}{" "}
              {/* Nombre completo */}
            </h3>
            <p className="text-sm text-emerald-600">
              {
                onlineUsers.includes(selectedUser.idUser.toString())
                  ? "En linea" // Muestra "En línea" si el usuario está conectado
                  : "Desconectado"
                // Muestra "Desconectado" si no está conectado
              }
            </p>
          </div>
        </div>

        {/* Botón para cerrar el chat */}
        <button onClick={() => setSelectedUser(null)}>
          <X /> {/* Ícono de cerrar */}
        </button>
      </div>
    </div>
  );
}

export default ChatHeader; // Exporta el componente para su uso en otras partes de la aplicación
