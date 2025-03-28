import { useState, useRef } from "react"; // Importa hooks de React para manejar estados y referencias
import { Image, Send, X } from "lucide-react"; // Importa íconos desde la librería `lucide-react`
import { useChatStore } from "../store/useChatStore"; // Importa el estado global del chat
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación

/**
 * Componente `MessageInput` para enviar mensajes en un chat.
 * Permite enviar texto, imágenes y muestra una vista previa de las imágenes seleccionadas.
 */
function Messageinput() {
  const [text, setText] = useState(""); // Estado para almacenar el texto del mensaje
  const [imagePreview, setImagePreview] = useState(null); // Estado para almacenar la vista previa de la imagen seleccionada
  const fileInputRef = useRef(null); // Referencia al input de tipo archivo
  const { user } = useAuth(); // Obtiene el usuario autenticado desde el contexto
  const { sendMessage, addMessage } = useChatStore(); // Obtiene funciones para enviar y agregar mensajes al estado global

  // Maneja el cambio de imagen seleccionada
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtiene el archivo seleccionado
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file"); // Muestra un error si el archivo no es una imagen
      return;
    }

    const reader = new FileReader(); // Crea un lector de archivos
    reader.onloadend = () => {
      setImagePreview(reader.result); // Actualiza la vista previa con el contenido de la imagen
    };
    reader.readAsDataURL(file); // Lee el archivo como una URL de datos
  };

  // Elimina la imagen seleccionada
  const removeImage = () => {
    setImagePreview(null); // Limpia la vista previa de la imagen
    if (fileInputRef.current) fileInputRef.current.value = ""; // Limpia el input de archivo
  };

  // Maneja el envío del mensaje
  const handleSendMessage = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    if (!text.trim() && !imagePreview) return; // No envía si no hay texto ni imagen

    const formData = new FormData(); // Crea un objeto FormData para enviar la imagen
    formData.append("file", imagePreview); // Agrega la imagen al FormData
    formData.append("upload_preset", "iy7b0j5h"); // Configuración de Cloudinary
    formData.append("api_key", "233885991187399"); // Clave de API de Cloudinary

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/demo/image/upload",
        {
          method: "POST",
          body: formData, // Envía la imagen a Cloudinary
        }
      );
      const data = await res.json(); // Obtiene la respuesta de Cloudinary
      const image = data.secure_url; // URL de la imagen subida

      // Agrega el mensaje al estado global
      addMessage({
        text: text.trim(),
        image: image,
        idSender: user.idUser,
        sentAt: new Date().toISOString(), // Marca de tiempo del mensaje
      });

      // Envía el mensaje al servidor
      await sendMessage(
        {
          text: text.trim(),
          image: image,
          sentAt: new Date().toISOString(),
        },
        user.idUser
      );

      // Limpia el formulario
      setText(""); // Limpia el texto del mensaje
      setImagePreview(null); // Limpia la vista previa de la imagen
      if (fileInputRef.current) fileInputRef.current.value = ""; // Limpia el input de archivo
    } catch (error) {
      console.error("Failed to send message:", error); // Maneja errores en el envío del mensaje
    }
  };

  return (
    <div className="p-4 w-full">
      {/* Vista previa de la imagen seleccionada */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview} // Muestra la vista previa de la imagen
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage} // Elimina la imagen seleccionada
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" /> {/* Ícono para eliminar la imagen */}
            </button>
          </div>
        </div>
      )}

      {/* Formulario para enviar mensajes */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          {/* Input para escribir el mensaje */}
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md bg-neutral-100 input-success text-zinc-900 dark:bg-zinc-900"
            placeholder="Escribe una mensaje..."
            value={text} // Valor del texto del mensaje
            onChange={(e) => setText(e.target.value)} // Actualiza el texto del mensaje
          />
          {/* Input oculto para seleccionar una imagen */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef} // Referencia al input de archivo
            onChange={handleImageChange} // Maneja el cambio de imagen
          />

          {/* Botón para seleccionar una imagen */}
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border-none
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()} // Abre el selector de archivos
          >
            <Image size={20} /> {/* Ícono para seleccionar una imagen */}
          </button>
        </div>
        {/* Botón para enviar el mensaje */}
        <button
          type="submit"
          className="btn btn-md btn-circle bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border-none"
          disabled={!text.trim() && !imagePreview} // Deshabilita el botón si no hay texto ni imagen
        >
          <Send size={22} /> {/* Ícono para enviar el mensaje */}
        </button>
      </form>
    </div>
  );
}

export default Messageinput; // Exporta el componente para su uso en otras partes de la aplicación
