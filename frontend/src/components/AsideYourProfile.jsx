import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { MdOutlineWorkspacePremium } from "react-icons/md";

/**
 * Componente `AsideYourProfile` para mostrar el perfil de un usuario seleccionado.
 * Incluye información como nombre, apellido, correo electrónico y si es usuario premium.
 * @param {string} id - ID del usuario seleccionado.
 */
function AsideYourProfile({ id }) {
  const { getUser } = useChatStore(); // Obtiene la función para obtener los datos de un usuario desde el estado global
  const [selectedUser, setSelectedUser] = useState({}); // Estado para almacenar los datos del usuario seleccionado

  // Efecto para obtener los datos del usuario al cargar el componente
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(id); // Llama a la función para obtener los datos del usuario
      setSelectedUser(data); // Actualiza el estado con los datos del usuario
    };
    fetchUser();
  }, [id, getUser]); // Dependencias: se ejecuta cuando cambian `id` o `getUser`

  return (
    <>
      <aside className="w-full lg:w-1/4 flex flex-col dark:text-white items-center rounded-lg gap-10 justify-between">
        {/* Contenedor principal del perfil */}
        <div className="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-emerald-300 via-emerald-600 to-emerald-900 before:absolute before:top-0 w-full h-72 relative flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
          {/* Imagen de perfil */}
          <div
            className="w-28 h-28 mt-8 rounded-full border-4 border-neutral-100 dark:border-zinc-900 z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500 cursor-pointer"
            style={{
              backgroundImage: `url(${
                selectedUser.profileImageUrl ||
                "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
              })`, // Imagen de perfil o una imagen predeterminada
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Información del usuario */}
          <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
            <span className="text-2xl font-semibold text-zinc-800 dark:text-slate-100 flex items-center">
              {`${selectedUser.name} ${selectedUser.lastname}`}{" "}
              {selectedUser.isPremium ? (
                <span className="text-yellow-400">
                  <MdOutlineWorkspacePremium />
                </span>
              ) : null}
            </span>
            <p className="text-zinc-600 dark:text-zinc-500">{selectedUser.email}</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AsideYourProfile; // Exporta el componente para su uso en otras partes de la aplicación
