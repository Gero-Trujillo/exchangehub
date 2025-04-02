import { Router } from "express"; // Importa el módulo Router de Express para definir rutas
import {
  confirmAccount,
  loginUser,
  logoutUser,
  registerUser,
  verifyToken,
} from "../controllers/auth.controller.js"; // Importa los controladores relacionados con la autenticación

const router = Router(); // Crea una instancia del enrutador de Express

// Rutas para manejar la autenticación

// Inicia sesión de un usuario
router.post("/api/login", loginUser);

// Registra un nuevo usuario
router.post("/api/register", registerUser);

// Cierra la sesión de un usuario
router.post("/api/logout", logoutUser);

// Verifica el token de acceso del usuario
router.get("/api/verify", verifyToken);

// Confirma la cuenta de un usuario por su ID
router.patch("/api/confirm/:idUser", confirmAccount);

export default router; // Exporta el enrutador para usarlo en otras partes de la aplicación