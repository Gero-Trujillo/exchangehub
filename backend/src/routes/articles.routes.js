import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getArticleByCategory,
  getArticleById,
  getArticleBySearch,
  getArticleByUserId,
  getArticles,
  updateArticle,
} from "../controllers/articles.controller.js";

const router = Router();

router.get("/api/articles", getArticles);
router.get("/api/articles/:id", getArticleById);
router.get("/api/articles/user/:id", getArticleByUserId);
router.get("/api/articles/category/:category", getArticleByCategory);
router.get("/api/articles/search/:search", getArticleBySearch);
router.post("/api/articles", createArticle);
router.put("/api/articles/:id", updateArticle);
router.delete("/api/articles/:id", deleteArticle);

export default router;
