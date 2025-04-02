/**
 * Formatea una fecha para mostrar solo la hora y los minutos en formato de 24 horas.
 * @param {string|Date} date - La fecha que se desea formatear. Puede ser un objeto `Date` o una cadena de fecha válida.
 * @returns {string} - La hora formateada en formato "HH:mm".
 */
export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit", // Muestra la hora con dos dígitos (por ejemplo, "08" en lugar de "8")
    minute: "2-digit", // Muestra los minutos con dos dígitos
    hour12: false, // Usa el formato de 24 horas (por ejemplo, "14:30" en lugar de "2:30 PM")
  });
}
