import jwt from "jsonwebtoken"; // Importa la librería jsonwebtoken para manejar tokens JWT

// Clave secreta utilizada para firmar y verificar los tokens JWT
export const SECRET_KEY = "thisisasecretkeyforjsonwebtoken"; // **Nota:** En un entorno de producción, esta clave debe almacenarse en variables de entorno para mayor seguridad

/**
 * Función para crear un token de acceso JWT
 * @param {Object} payload - Los datos que se incluirán en el token
 * @returns {Promise<string>} - Una promesa que resuelve con el token generado
 */
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    // Genera un token JWT con el payload, la clave secreta y una expiración de 1 día
    jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err); // Rechaza la promesa si ocurre un error
      resolve(token); // Resuelve la promesa con el token generado
    });
  });
}