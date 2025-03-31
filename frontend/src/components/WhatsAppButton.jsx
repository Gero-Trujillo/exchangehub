import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  // Función para manejar el clic en el botón de WhatsApp
  const handleWhatsAppClick = () => {
    const phoneNumber = "+573104049506"; // Número de teléfono de WhatsApp (reemplazar con el número deseado)
    const message = "¡Hola! Necesito ayuda"; // Mensaje predeterminado que se enviará
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`; // Construye la URL de WhatsApp con el número y el mensaje
    window.open(url, "_blank"); // Abre la URL en una nueva pestaña
  };

  return (
    // Botón flotante para abrir WhatsApp
    <button
      onClick={handleWhatsAppClick} // Llama a la función al hacer clic
      className="fixed bottom-20 md:bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none"
    >
      {/* Ícono de WhatsApp */}
      <FaWhatsapp size={24} />
    </button>
  );
};

export default WhatsAppButton;
