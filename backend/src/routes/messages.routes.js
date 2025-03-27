import { Router } from "express"; // Importa el módulo Router de Express para definir rutas
import {
  changeSpecialMessageStatus,
  getMessages,
  getUsersForSidebar,
  sendMessage,
  markMessagesAsRead,
} from "../controllers/messages.controller.js"; // Importa los controladores relacionados con los mensajes

const router = Router(); // Crea una instancia del enrutador de Express

// Rutas para manejar mensajes

// Obtiene los usuarios con los que el usuario logueado ha interactuado
router.get("/api/messages/users/:id", getUsersForSidebar);

// Obtiene los mensajes entre dos usuarios específicos
router.get("/api/messages/:idUser/:myId", getMessages);

// Envía un mensaje de un usuario a otro
router.post("/api/messages/send/:receiverId/:senderId", sendMessage);

// Cambia el estado de un mensaje especial (por ejemplo, marcarlo como no especial)
router.patch("/api/messages/:idMessage", changeSpecialMessageStatus);

// Marca los mensajes como leídos entre dos usuarios
router.post("/api/messages/read/:idUser/:myId", markMessagesAsRead);

export default router; // Exporta el enrutador para usarlo en otras partes de la aplicación
