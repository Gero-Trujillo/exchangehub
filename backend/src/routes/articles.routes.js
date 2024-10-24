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
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/api/articles", getArticles);
router.get("/api/articles/:id", authRequired, getArticleById);
router.get("/api/articles/user/:id", authRequired, getArticleByUserId);
router.get(
  "/api/articles/category/:category",
  authRequired,
  getArticleByCategory
);
router.get("/api/articles/search/:search", authRequired, getArticleBySearch);
router.post("/api/articles", authRequired, createArticle);
router.put("/api/articles/:id", authRequired, updateArticle);
router.delete("/api/articles/:id", authRequired, deleteArticle);

export default router;
