import { pool } from "../db.js"; // Importa la conexión a la base de datos
import { createAccessToken } from "../libs/jwt.js"; // Importa la función para crear tokens JWT
import { SECRET_KEY } from "../libs/jwt.js"; // Importa la clave secreta para verificar tokens
import jwt from "jsonwebtoken"; // Importa la librería JWT para manejar tokens
import { transporter } from "../libs/nodemailer.js"; // Importa el transportador de nodemailer para enviar correos electrónicos

// Controlador para iniciar sesión de un usuario
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // Obtiene las credenciales del cuerpo de la solicitud
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      // Si no se encuentra el usuario, devuelve un error 401
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    if (rows[0].state === "inActive") {
      // Si el usuario está inactivo, devuelve un error 401
      return res.status(401).json({ message: "Usuario inactivo" });
    }

    // Genera un token de acceso para el usuario autenticado
    const token = await createAccessToken({ idUser: rows[0].idUser });

    // Guarda el token en una cookie
    res.cookie("accessToken", token);

    // Devuelve los datos del usuario autenticado
    res.json(rows[0]);
  } catch (err) {
    console.error(err); // Loguea el error en caso de fallo
    res.status(500).send("Server error"); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para registrar un nuevo usuario
export const registerUser = async (req, res) => {
  const { name, lastname, email, address, cellphone, password } = req.body; // Obtiene los datos del usuario desde el cuerpo de la solicitud
  const state = "inActive"; // El estado inicial del usuario es "inactivo"

  try {
    // Verifica si el correo ya está registrado
    const exists = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (exists[0].length > 0) {
      // Si el correo ya está registrado, devuelve un error 400
      return res.status(400).json({ message: "El email esta registrado" });
    }

    // Inserta el nuevo usuario en la base de datos
    const [rows] = await pool.query(
      "INSERT INTO users (name, lastname, email, address, cellphone, password, state) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, lastname, email, address, cellphone, password, state]
    );

    // Configuración del correo de confirmación
    const mailOptions = {
      from: '"Confirmacion de cuenta" <noresponder@exchangehub.com>', // Remitente del correo
      to: email, // Destinatario del correo
      subject: "Confirmacion de cuenta", // Asunto del correo
      html: `
      <h1>Confirmacion de cuenta</h1>
      <p>Para confirmar tu cuenta da click en el siguiente enlace</p>
      <a href="http://localhost:5173/confirm/${rows.insertId}">Confirmar cuenta</a>
      `, // Contenido HTML del correo
    };

    try {
      // Envía el correo de confirmación
      transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error); // Loguea el error si el envío del correo falla
    }

    res.json(rows[0]); // Devuelve los datos del usuario recién registrado
  } catch (err) {
    console.error(err); // Loguea el error en caso de fallo
    res.status(500).send("Server error"); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para cerrar sesión de un usuario
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken"); // Elimina la cookie del token de acceso
    return res.status(200).json({ message: "User logged out successfully" }); // Devuelve un mensaje de éxito
  } catch (error) {
    return res.status(500).json({ message: "Error" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para verificar el token de acceso de un usuario
export const verifyToken = async (req, res) => {
  const { accessToken } = req.cookies; // Obtiene el token de acceso desde las cookies

  if (!accessToken) {
    // Si no hay token, devuelve un error 401
    return res.status(401).json({ message: "User not authenticated" });
  }

  // Verifica el token usando la clave secreta
  jwt.verify(accessToken, SECRET_KEY, async (err, user) => {
    if (err) {
      // Si el token no es válido, devuelve un error 401
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Busca al usuario en la base de datos
    const [rows] = await pool.query("SELECT * FROM users WHERE idUser = ?", [
      user.idUser,
    ]);

    if (rows.length === 0) {
      // Si el usuario no existe, devuelve un error 401
      return res.status(401).json({ message: "User not authenticated" });
    }

    return res.json(rows[0]); // Devuelve los datos del usuario autenticado
  });
};

// Controlador para confirmar la cuenta de un usuario
export const confirmAccount = async (req, res) => {
  const { idUser } = req.params; // Obtiene el ID del usuario desde los parámetros de la solicitud

  try {
    // Actualiza el estado del usuario a "activo"
    const [rows] = await pool.query(
      "UPDATE users SET state = 'active' WHERE idUser = ?",
      [idUser]
    );
    res.status(200).json({ message: "OK" }); // Devuelve un mensaje de éxito
  } catch (err) {
    console.error(err); // Loguea el error en caso de fallo
    res.status(500).send("Server error"); // Devuelve un error 500 en caso de fallo
  }
};
