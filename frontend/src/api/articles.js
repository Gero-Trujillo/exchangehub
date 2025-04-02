import axios from "./axios.js"; // Importa la instancia de Axios configurada para realizar solicitudes HTTP

// Obtiene todos los artículos
export const getArticles = () => axios.get("/articles");
// Realiza una solicitud GET a la ruta "/articles" para obtener todos los artículos disponibles

// Obtiene todos los artículos de un usuario específico por su ID
export const getArticlesByUserId = (id) => axios.get(`/articles/user/${id}`);
// Realiza una solicitud GET a la ruta "/articles/user/:id" para obtener los artículos de un usuario

// Crea una nueva imagen para un artículo
export const createArticleImage = (data) => axios.post("/articles/image", data);
// Realiza una solicitud POST a la ruta "/articles/image" para subir una imagen asociada a un artículo

// Elimina una imagen de un artículo por su ID
export const deleteArticleImage = (id) => axios.delete(`/articles/image/${id}`);
// Realiza una solicitud DELETE a la ruta "/articles/image/:id" para eliminar una imagen específica

// Crea un nuevo artículo
export const createArticle = (data) => axios.post("/articles", data);
// Realiza una solicitud POST a la ruta "/articles" para crear un nuevo artículo con los datos proporcionados

// Obtiene las imágenes asociadas a un artículo por su ID
export const getArticleImages = (id) => axios.get(`/articles/image/${id}`);
// Realiza una solicitud GET a la ruta "/articles/image/:id" para obtener las imágenes de un artículo

// Elimina un artículo por su ID
export const deleteArticle = (id) => axios.delete(`/articles/${id}`);
// Realiza una solicitud DELETE a la ruta "/articles/:id" para eliminar un artículo específico

// Busca artículos por un término de búsqueda
export const getArticlesBySearch = (search) =>
  axios.get(`/articles/search/${search}`);
// Realiza una solicitud GET a la ruta "/articles/search/:search" para buscar artículos por un término

// Obtiene artículos por categoría
export const getArticlesByCategory = (category) =>
  axios.get(`/articles/category/${category}`);
// Realiza una solicitud GET a la ruta "/articles/category/:category" para obtener artículos de una categoría específica

// Obtiene un artículo específico por su ID
export const getArticleById = (id) => axios.get(`/articles/${id}`);
// Realiza una solicitud GET a la ruta "/articles/:id" para obtener los detalles de un artículo específico

// Actualiza un artículo existente por su ID
export const updateArticle = (articleId, data) =>
  axios.put(`/articles/${articleId}`, data);
// Realiza una solicitud PUT a la ruta "/articles/:articleId" para actualizar un artículo con los datos proporcionados