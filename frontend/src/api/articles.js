import axios from './axios.js'

export const getArticles = () => axios.get('/articles')
export const getArticlesByUserId = (id) => axios.get(`/articles/user/${id}`)
export const createArticleimage = (data) => axios.post('/articles/image', data)
export const createArticle = (data) => axios.post('/articles', data)