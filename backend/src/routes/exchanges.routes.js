import { Router } from "express"; // Importa el módulo Router de Express para definir rutas
import {
  cancelExchange,
  createExchange,
  getExchangeById,
  getExchangeByStatus,
  getExchangeByUserId,
  getExchanges,
  getExchangesByProductos,
  updateExchange,
} from "../controllers/exchanges.controller.js"; // Importa los controladores relacionados con los intercambios
import { sendNotificationEmail } from "../controllers/emailNotification.controller.js"; // Importa el controlador para enviar notificaciones por correo electrónico

const router = Router(); // Crea una instancia del enrutador de Express

// Rutas para manejar intercambios

// Obtiene todos los intercambios
router.get("/api/exchanges", getExchanges);

// Obtiene un intercambio específico por su ID
router.get("/api/exchanges/:id", getExchangeById);

// Obtiene todos los intercambios relacionados con un usuario específico
router.get("/api/exchanges/user/:id", getExchangeByUserId);

// Obtiene intercambios por su estado (completado, pendiente, cancelado, etc.)
router.get("/api/exchanges/status/:status", getExchangeByStatus);

// Crea un nuevo intercambio
router.post("/api/exchanges", createExchange);

// Actualiza un intercambio existente por su ID
router.patch("/api/exchanges/:id", updateExchange);

// Cancela un intercambio por su ID
router.patch("/api/exchanges/cancel/:id", cancelExchange);

// Obtiene intercambios relacionados con dos productos específicos
router.get("/api/exchanges/articles/:idProductoOne/:idProductoTwo", getExchangesByProductos);

// Envía una notificación por correo electrónico relacionada con un intercambio
router.post("/api/exchanges/sendNotification", sendNotificationEmail);

export default router; // Exporta el enrutador para usarlo en otras partes de la aplicación