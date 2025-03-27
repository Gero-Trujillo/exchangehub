import { Router } from "express"; // Importa el módulo Router de Express para definir rutas
import { addRating, getRatingsByUserId } from "../controllers/ratings.controller.js"; // Importa los controladores relacionados con las calificaciones

const router = Router(); // Crea una instancia del enrutador de Express

// Rutas para manejar calificaciones

// Obtiene todas las calificaciones de un usuario específico
router.get("/api/ratings/:idUser", getRatingsByUserId);
// Maneja solicitudes GET a la ruta "/api/ratings/:idUser"
// Llama al controlador `getRatingsByUserId` para obtener las calificaciones asociadas al usuario

// Agrega una nueva calificación
router.post("/api/ratings", addRating);
// Maneja solicitudes POST a la ruta "/api/ratings"
// Llama al controlador `addRating` para registrar una nueva calificación

export default router; // Exporta el enrutador para usarlo en otras partes de la aplicación