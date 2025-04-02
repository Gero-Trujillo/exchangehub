import axios from './axios.js'; // Importa la instancia de Axios configurada para realizar solicitudes HTTP

// Agrega una nueva calificación
export const addRating = (data) => axios.post('/ratings', data);
// Realiza una solicitud POST a la ruta "/ratings" para agregar una nueva calificación
// `data` debe ser un objeto que contenga los detalles de la calificación (por ejemplo, idUser, rating, idExchange, etc.)

// Obtiene todas las calificaciones de un usuario específico por su ID
export const getRatingsByUserId = (idUser) => axios.get(`/ratings/${idUser}`);
// Realiza una solicitud GET a la ruta "/ratings/:idUser" para obtener las calificaciones asociadas a un usuario
// `idUser` es el ID del usuario cuyas calificaciones se desean obtener