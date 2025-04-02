import { createContext, useContext, useEffect, useState } from "react";
import {
  createArticle,
  createArticleImage,
  deleteArticleImage,
  getArticleById,
  getArticleImages,
  getArticles,
  getArticlesByCategory,
  getArticlesBySearch,
  getArticlesByUserId,
  updateArticle,
} from "../api/articles.js"; // Importa las funciones de la API relacionadas con los artículos

const ArticleContext = createContext(); // Crea un contexto para manejar el estado relacionado con los artículos

// Hook personalizado para usar el contexto de artículos
export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within a ArticleProvider");
  }
  return context;
};

// Proveedor del contexto de artículos
export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]); // Estado para almacenar todos los artículos
  const [article, setArticle] = useState({}); // Estado para un artículo específico
  const [articlesFound, setArticlesFound] = useState([]); // Estado para los artículos encontrados en una búsqueda
  const [articlesCategory, setArticlesCategory] = useState([]); // Estado para los artículos filtrados por categoría
  const [articleImgs, setArticleImgs] = useState([]); // Estado para las imágenes de un artículo
  const [insertId, setInsertId] = useState(); // Estado para almacenar el ID del artículo recién creado

  // Obtiene todos los artículos
  const getAllArticles = async () => {
    try {
      const res = await getArticles();
      setArticles(res.data); // Actualiza el estado con los artículos obtenidos
    } catch (error) {
      console.log(error); // Loguea el error si ocurre
    }
  };

  // Obtiene los artículos de un usuario específico
  const getArticlesOfUser = async (idUser) => {
    try {
      const res = await getArticlesByUserId(idUser);
      setArticles(res.data); // Actualiza el estado con los artículos del usuario
    } catch (error) {
      console.log(error);
    }
  };

  // Crea un nuevo artículo
  const createArticles = async (data) => {
    try {
      const res = await createArticle(data);
      return res.data; // Devuelve los datos del artículo creado
    } catch (error) {
      console.log(error);
    }
  };

  // Crea una nueva imagen para un artículo
  const createArticlesImage = async (data) => {
    try {
      const res = await createArticleImage(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Obtiene las imágenes de un artículo específico
  const getArticlesImages = async (idArticle) => {
    try {
      const res = await getArticleImages(idArticle);
      return res.data; // Devuelve las imágenes del artículo
    } catch (error) {
      console.log(error);
    }
  };

  // Busca artículos por un término de búsqueda
  const searchArticles = async (search) => {
    try {
      const res = await getArticlesBySearch(search);
      setArticlesFound(res.data); // Actualiza el estado con los artículos encontrados
    } catch (error) {
      console.log(error);
    }
  };

  // Filtra artículos por categoría
  const searchCategory = async (category) => {
    try {
      const res = await getArticlesByCategory(category);
      setArticlesCategory(res.data); // Actualiza el estado con los artículos de la categoría
    } catch (error) {
      console.log(error);
    }
  };

  // Obtiene un artículo específico por su ID
  const getArticle = async (id) => {
    try {
      const res = await getArticleById(id);
      setArticle(res.data); // Actualiza el estado con los datos del artículo
      return res.data; // Devuelve los datos del artículo
    } catch (error) {
      console.log(error);
    }
  };

  // Actualiza un artículo existente
  const editArticle = async (articleId, data) => {
    try {
      const res = await updateArticle(articleId, data);
    } catch (error) {
      console.log(error);
    }
  };

  // Elimina una imagen de un artículo
  const deleteImages = async (id) => {
    try {
      await deleteArticleImage(id);
    } catch (error) {
      console.log(error);
    }
  };

  // Proveedor del contexto que expone las funciones y estados
  return (
    <ArticleContext.Provider
      value={{
        articles,
        insertId,
        articleImgs,
        articlesFound,
        articlesCategory,
        article,
        getAllArticles,
        getArticlesOfUser,
        createArticles,
        createArticlesImage,
        getArticlesImages,
        searchArticles,
        searchCategory,
        getArticle,
        editArticle,
        deleteImages,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext;
