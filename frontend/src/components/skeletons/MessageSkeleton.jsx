/**
 * Componente `MessageSkeleton` para mostrar un estado de carga simulado
 * mientras se cargan los mensajes en el chat.
 * Utiliza elementos de "skeleton" para representar mensajes ficticios.
 */
const MessageSkeleton = () => {
  // Crea un array de 6 elementos para generar mensajes de skeleton
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}
        >
          {/* Imagen del avatar del mensaje */}
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              <div className="skeleton w-full h-full rounded-full bg-neutral-300 dark:bg-zinc-800" />
            </div>
          </div>

          {/* Cabecera del mensaje */}
          <div className="chat-header mb-1">
            <div className="skeleton h-4 w-16 bg-neutral-300 dark:bg-zinc-800" />
          </div>

          {/* Burbuja del mensaje */}
          <div className="chat-bubble bg-transparent p-0">
            <div className="skeleton h-16 w-[200px] bg-neutral-300 dark:bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton; // Exporta el componente para su uso en otras partes de la aplicación
