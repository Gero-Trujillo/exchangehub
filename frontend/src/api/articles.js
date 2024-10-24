import axios from './axios.js'

export const getArticles = () => axios.get('/articles')
export const getArticlesByUserId = (id) => axios.get(`/articles/user/${id}`)