// Importación de SECRET_KEY y jwt
import { SECRET_KEY } from "../libs/jwt.js"; // Clave secreta utilizada para verificar los tokens JWT
import jwt from "jsonwebtoken"; // Librería para manejar y verificar tokens JWT

// Middleware para validar el token de acceso
export const authRequired = async (req, res, next) => {
  // Obtenemos el token de acceso de las cookies
  const { accessToken } = req.cookies;

  // Si no existe el token de acceso, retornamos un error 401 (Unauthorized)
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verificamos el token de acceso utilizando la clave secreta
    jwt.verify(accessToken, SECRET_KEY, (err, user) => {
      if (err) {
        // Si el token no es válido o ha expirado, retornamos un error 401
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Si el token es válido, continuamos con la ejecución del código
      // Puedes agregar el usuario decodificado al objeto `req` para usarlo en las siguientes rutas
      req.user = user;

      next(); // Llama al siguiente middleware o controlador
    });
  } catch (err) {
    // Si ocurre un error inesperado, retornamos un error 401
    return res.status(401).json({ message: "Unauthorized" });
  }
};
