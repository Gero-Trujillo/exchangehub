import { Router } from "express"; // Importa el módulo Router de Express para definir rutas
import { getEstadisticas } from "../controllers/dashboard.controller.js"; // Importa el controlador para manejar las estadísticas del dashboard

const router = Router(); // Crea una instancia del enrutador de Express

// Ruta para obtener estadísticas del dashboard
router.get("/estadisticas", getEstadisticas); 
// Maneja solicitudes GET a la ruta "/estadisticas"
// Llama al controlador `getEstadisticas` para obtener y devolver las estadísticas

export default router; // Exporta el enrutador para usarlo en otras partes de la aplicación
