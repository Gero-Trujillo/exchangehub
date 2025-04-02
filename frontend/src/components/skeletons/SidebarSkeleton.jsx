import { Users } from "lucide-react"; // Importa el ícono de usuarios desde la librería Lucide

/**
 * Componente `SidebarSkeleton` para mostrar un estado de carga simulado
 * mientras se cargan los contactos en la barra lateral.
 * Utiliza elementos de "skeleton" para representar contactos ficticios.
 */
const SidebarSkeleton = () => {
  // Crea un array de 8 elementos para generar los skeletons de contactos
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
      {/* Cabecera de la barra lateral */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" /> {/* Ícono de usuarios */}
          <span className="font-medium hidden lg:block">Contacts</span>
          {/* Texto "Contacts" visible solo en pantallas grandes */}
        </div>
      </div>

      {/* Skeletons de contactos */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Skeleton del avatar */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            {/* Skeleton de la información del usuario (visible solo en pantallas grandes) */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" /> {/* Nombre del usuario */}
              <div className="skeleton h-3 w-16" /> {/* Información adicional */}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton; // Exporta el componente para su uso en otras partes de la aplicación
