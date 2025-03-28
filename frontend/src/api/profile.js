import axios from './axios.js'; // Importa la instancia de Axios configurada para realizar solicitudes HTTP

// Sube una nueva imagen de perfil para un usuario
export const uploadImage = (iduser, image) => axios.patch(`/users/${iduser}/image`, image);
// Realiza una solicitud PATCH a la ruta "/users/:iduser/image" para actualizar la imagen de perfil de un usuario
// `iduser` es el ID del usuario y `image` debe ser un objeto que contenga los datos de la imagen

// Actualiza los datos de un usuario
export const updateUser = (iduser, user) => axios.put(`/users/${iduser}`, user);
// Realiza una solicitud PUT a la ruta "/users/:iduser" para actualizar los datos de un usuario
// `iduser` es el ID del usuario y `user` debe ser un objeto que contenga los datos actualizados del usuario
