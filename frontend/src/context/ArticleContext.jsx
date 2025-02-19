import { createContext, useContext, useEffect, useState } from "react";
import {
  createArticle,
  createArticleImage,
  getArticleImages,
  getArticles,
  getArticlesByCategory,
  getArticlesBySearch,
  getArticlesByUserId,
} from "../api/articles.js";

const ArticleContext = createContext();

export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within a ArticleProvider");
  }
  return context;
};

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [articlesFound, setArticlesFound] = useState([]);
  const [articlesCategory, setArticlesCategory] = useState([]);
  const [articleImgs, setArticleImgs] = useState([]);
  const [insertId, setInsertId] = useState();

  const getAllArticles = async () => {
    try {
      const res = await getArticles();
      setArticles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getArticlesOfUser = async (idUser) => {
    try {
      const res = await getArticlesByUserId(idUser);
      setArticles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createArticles = async (data) => {
    try {
      const res = await createArticle(data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createArticlesImage = async (data) => {
    try {
      const res = await createArticleImage(data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getArticlesImages = async (idArticle) => {
    try {
      const res = await getArticleImages(idArticle);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const searchArticles = async (search) => {
    try {
      const res = await getArticlesBySearch(search);
      console.log(res);
      setArticlesFound(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchCategory = async (category) => {
    try {
      const res = await getArticlesByCategory(category);
      setArticlesCategory(res.data)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ArticleContext.Provider
      value={{
        articles,
        insertId,
        articleImgs,
        articlesFound,
        articlesCategory,
        getAllArticles,
        getArticlesOfUser,
        createArticles,
        createArticlesImage,
        getArticlesImages,
        searchArticles,
        searchCategory,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext;
