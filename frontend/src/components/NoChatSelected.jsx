import { MessageSquare } from "lucide-react"; // Importa el ícono de mensaje desde la librería `lucide-react`

/**
 * Componente `NoChatSelected` para mostrar un mensaje cuando no se ha seleccionado ningún chat.
 * Proporciona una interfaz amigable para indicar al usuario que seleccione una conversación.
 */
function NoChatSelected() {
  return (
    <>
      {/* Contenedor principal */}
      <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-neutral-100 dark:bg-zinc-900">
        {/* Contenedor interno con contenido centrado */}
        <div className="max-w-md text-center space-y-6">
          {/* Icono animado */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
              >
                {/* Ícono de mensaje */}
                <MessageSquare className="w-8 h-8 text-emerald-600 dark:text-emerald-300 " />
              </div>
            </div>
          </div>

          {/* Texto de bienvenida */}
          <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">
            Bienvenido al chat de Exchange Hub
          </h2>
          <p className="text-zinc-500">
            Selecciona una conversación para empezar a chatear
          </p>
        </div>
      </div>
    </>
  );
}

export default NoChatSelected; // Exporta el componente para su uso en otras partes de la aplicación
