import axios from './axios.js'

export const getArticles = () => axios.get('/articles')