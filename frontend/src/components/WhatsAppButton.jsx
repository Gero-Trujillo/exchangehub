import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+573104049506"; // Reemplaza con tu número de WhatsApp
    const message = "¡Hola! Necesito ayuda";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-20 md:bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none"
    >
      <FaWhatsapp size={24} />
    </button>
  );
};

export default WhatsAppButton;
