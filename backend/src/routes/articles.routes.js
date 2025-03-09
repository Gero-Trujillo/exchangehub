import { Router } from "express";
import {
  createArticle,
  createArticleImage,
  deleteArticle,
  deleteArticleImage,
  getArticleByCategory,
  getArticleById,
  getArticleBySearch,
  getArticleByUserId,
  getArticleImages,
  getArticles,
  updateArticle,
} from "../controllers/articles.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/api/articles", getArticles);
router.get("/api/articles/:id", getArticleById);
router.get("/api/articles/user/:id", getArticleByUserId);
router.get("/api/articles/category/:category", getArticleByCategory);
router.get("/api/articles/search/:search", getArticleBySearch);
router.post("/api/articles", authRequired, createArticle);
router.put("/api/articles/:id", authRequired, updateArticle);
router.delete("/api/articles/:id", authRequired, deleteArticle);
router.post("/api/articles/image", authRequired, createArticleImage);
router.get("/api/articles/image/:id", getArticleImages);
router.delete("/api/articles/image/:id", authRequired, deleteArticleImage);

export default router;
