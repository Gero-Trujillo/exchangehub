import axios from "axios"; // Importa la librería Axios para realizar solicitudes HTTP

// Crea una instancia de Axios con configuración predeterminada
const instance = axios.create({
  baseURL: "http://localhost:3000/api", // URL base para todas las solicitudes HTTP
  withCredentials: true, // Habilita el envío de cookies y credenciales en las solicitudes
});

export default instance; // Exporta la instancia configurada para usarla en otras partes de la aplicación