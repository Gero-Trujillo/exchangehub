import React from 'react'

/**
 * Componente `ChatPreview` para mostrar una vista previa de un chat.
 * Incluye el avatar del usuario, su nombre y un fragmento del último mensaje.
 */
function ChatPreview() {
  return (
    <>
      {/* Botón que representa la vista previa del chat */}
      <button className='w-full flex gap-4 p-2 bg-white hover:bg-neutral-100 rounded-lg'>
        <div className='flex gap-4 items-center'>
          {/* Imagen de perfil del usuario */}
          <img
            className='w-14 h-14 object-cover'
            src="https://robohash.org/2" // Imagen de perfil generada dinámicamente
            alt="User Avatar" // Texto alternativo para accesibilidad
          />
          <div className='flex flex-col gap-1 text-left'>
            {/* Nombre del usuario */}
            <h3 className='text-lg font-semibold text-emerald-600'>User Name</h3>
            {/* Fragmento del último mensaje */}
            <p className='w-64 sm:w-36 md:w-48 lg:w-64 xl:w-72 2xl:w-96 text-sm text-neutral-500 overflow-hidden whitespace-nowrap truncate'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhjjjjjjj
            </p>
          </div>
        </div>
      </button>
    </>
  )
}

export default ChatPreview // Exporta el componente para su uso en otras partes de la aplicación
