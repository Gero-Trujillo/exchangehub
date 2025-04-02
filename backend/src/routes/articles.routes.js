import { Router } from "express"; // Importa el módulo Router de Express para definir rutas
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
} from "../controllers/articles.controller.js"; // Importa los controladores relacionados con los artículos
import { authRequired } from "../middlewares/validateToken.js"; // Importa el middleware para validar el token de acceso

const router = Router(); // Crea una instancia del enrutador de Express

// Rutas para manejar artículos

// Obtiene todos los artículos
router.get("/api/articles", getArticles);

// Obtiene un artículo específico por su ID
router.get("/api/articles/:id", getArticleById);

// Obtiene todos los artículos de un usuario específico
router.get("/api/articles/user/:id", getArticleByUserId);

// Obtiene artículos por categoría
router.get("/api/articles/category/:category", getArticleByCategory);

// Busca artículos por nombre o término de búsqueda
router.get("/api/articles/search/:search", getArticleBySearch);

// Crea un nuevo artículo (requiere autenticación)
router.post("/api/articles", authRequired, createArticle);

// Actualiza un artículo existente por su ID (requiere autenticación)
router.put("/api/articles/:id", authRequired, updateArticle);

// Elimina un artículo por su ID (requiere autenticación)
router.delete("/api/articles/:id", authRequired, deleteArticle);

// Crea una nueva imagen para un artículo (requiere autenticación)
router.post("/api/articles/image", authRequired, createArticleImage);

// Obtiene las imágenes asociadas a un artículo por su ID
router.get("/api/articles/image/:id", getArticleImages);

// Elimina una imagen de un artículo por su ID (requiere autenticación)
router.delete("/api/articles/image/:id", authRequired, deleteArticleImage);

export default router; // Exporta el enrutador para usarlo en otras partes de la aplicación
