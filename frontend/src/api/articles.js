import axios from "./axios.js";

export const getArticles = () => axios.get("/articles");
export const getArticlesByUserId = (id) => axios.get(`/articles/user/${id}`);
export const createArticleImage = (data) => axios.post("/articles/image", data);
export const deleteArticleImage = (id) => axios.delete(`/articles/image/${id}`);
export const createArticle = (data) => axios.post("/articles", data);
export const getArticleImages = (id) => axios.get(`/articles/image/${id}`);
export const deleteArticle = (id) => axios.delete(`/articles/${id}`)
export const getArticlesBySearch = (search) =>
  axios.get(`/articles/search/${search}`);
export const getArticlesByCategory = (category) =>
  axios.get(`/articles/category/${category}`);
export const getArticleById = (id) => axios.get(`/articles/${id}`);
export const updateArticle = (articleId, data) => axios.put(`/articles/${articleId}`, data);