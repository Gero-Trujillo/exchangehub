import axios from './axios.js';

export const uploadImage = (iduser, image) => axios.patch(`/users/${iduser}/image`, image);