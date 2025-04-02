import axios from './axios.js'; // Importa la instancia de Axios configurada para realizar solicitudes HTTP

// Crea un nuevo intercambio
export const createExchange = (data) => axios.post('/exchanges', data);
// Realiza una solicitud POST a la ruta "/exchanges" para crear un nuevo intercambio
// `data` debe ser un objeto que contenga los detalles del intercambio (usuarios, productos, etc.)

// Cancela un intercambio por su ID
export const cancelExchange = (id, status) => axios.patch(`/exchanges/cancel/${id}`, { status });
// Realiza una solicitud PATCH a la ruta "/exchanges/cancel/:id" para cancelar un intercambio
// `status` indica el nuevo estado del intercambio (por ejemplo, "cancelado")

// Actualiza el estado de un intercambio por su ID
export const updateExchangeStatus = (id, status) => axios.patch(`/exchanges/${id}`, { status });
// Realiza una solicitud PATCH a la ruta "/exchanges/:id" para actualizar el estado de un intercambio
// `status` indica el nuevo estado del intercambio (por ejemplo, "completado")

// Obtiene intercambios relacionados con dos productos específicos
export const getExchangesByArticles = (idProductoOne, idProductoTwo) =>
  axios.get(`/exchanges/articles/${idProductoOne}/${idProductoTwo}`);
// Realiza una solicitud GET a la ruta "/exchanges/articles/:idProductoOne/:idProductoTwo"
// para obtener los intercambios relacionados con los productos especificados

// Obtiene todos los intercambios relacionados con un usuario específico
export const getExchangeByUserId = (id) => axios.get(`/exchanges/user/${id}`);
// Realiza una solicitud GET a la ruta "/exchanges/user/:id" para obtener los intercambios de un usuario

// Envía una notificación por correo electrónico relacionada con un intercambio
export const sendNotificationEmail = (data) => axios.post('/exchanges/sendNotification', data);
// Realiza una solicitud POST a la ruta "/exchanges/sendNotification" para enviar una notificación por correo
// `data` debe ser un objeto que contenga los detalles del correo (destinatario, asunto, mensaje, etc.)