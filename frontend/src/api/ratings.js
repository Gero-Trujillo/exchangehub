import axios from './axios.js'

export const addRating = (data) => axios.post('/ratings', data);
export const getRatingsByUserId = (idUser) => axios.get(`/ratings/${idUser}`);