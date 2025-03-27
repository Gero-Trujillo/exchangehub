import {
  addUser,
  consultUsers,
  consultUser,
  updateUser,
  deleteUserUpdateState,
  resetUserUpdateState,
  updateImage,
  updateUserState,
} from "../controllers/users.controller.js"; // Importa los controladores relacionados con los usuarios
import { Router } from "express"; // Importa el módulo Router de Express para definir rutas

const router = Router(); // Crea una instancia del enrutador de Express

// Rutas para manejar usuarios

// Agrega un nuevo usuario
router.post("/api/users", addUser);
// Maneja solicitudes POST a la ruta "/api/users"
// Llama al controlador `addUser` para registrar un nuevo usuario

// Obtiene todos los usuarios
router.get("/api/users", consultUsers);
// Maneja solicitudes GET a la ruta "/api/users"
// Llama al controlador `consultUsers` para obtener una lista de todos los usuarios

// Obtiene un usuario específico por su ID
router.get("/api/users/:idUser", consultUser);
// Maneja solicitudes GET a la ruta "/api/users/:idUser"
// Llama al controlador `consultUser` para obtener los datos de un usuario específico

// Actualiza los datos de un usuario por su ID
router.put("/api/users/:iduser", updateUser);
// Maneja solicitudes PUT a la ruta "/api/users/:iduser"
// Llama al controlador `updateUser` para actualizar los datos de un usuario

// Desactiva un usuario (cambia su estado a inactivo)
router.delete("/api/users/:iduser", deleteUserUpdateState);
// Maneja solicitudes DELETE a la ruta "/api/users/:iduser"
// Llama al controlador `deleteUserUpdateState` para desactivar un usuario

// Reactiva un usuario (cambia su estado a activo)
router.post("/api/users/:iduser", resetUserUpdateState);
// Maneja solicitudes POST a la ruta "/api/users/:iduser"
// Llama al controlador `resetUserUpdateState` para reactivar un usuario

// Actualiza la imagen de perfil de un usuario
router.patch("/api/users/:iduser/image", updateImage);
// Maneja solicitudes PATCH a la ruta "/api/users/:iduser/image"
// Llama al controlador `updateImage` para actualizar la imagen de perfil de un usuario

// Actualiza el estado de un usuario (activo o inactivo)
router.patch("/api/users/:id/state", updateUserState);
// Maneja solicitudes PATCH a la ruta "/api/users/:id/state"
// Llama al controlador `updateUserState` para cambiar el estado de un usuario

export default router; // Exporta el enrutador para usarlo en otras partes de la aplicación