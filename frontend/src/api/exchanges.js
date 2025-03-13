import axios from './axios.js';

export const createExchange = (data) => axios.post('/exchanges', data);
export const cancelExchange = (id, status) => axios.patch(`/exchanges/cancel/${id}`, { status });
export const updateExchangeStatus = (id, status) => axios.patch(`/exchanges/${id}`, { status });
export const getExchangesByArticles = (idProductoOne, idProductoTwo) => axios.get(`/exchanges/articles/${idProductoOne}/${idProductoTwo}`);
export const getExchangeByUserId = (id) => axios.get(`/exchanges/user/${id}`);
export const sendNotificationEmail = (data) => axios.post('/exchanges/sendNotification', data);