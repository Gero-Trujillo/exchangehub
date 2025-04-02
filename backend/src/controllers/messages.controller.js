import { pool } from "../db.js"; // Importa la conexión a la base de datos
import { getReceiverSocketId, io } from "../libs/socket.js"; // Importa funciones relacionadas con sockets para comunicación en tiempo real

// Controlador para obtener los usuarios con los que el usuario logueado ha interactuado
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.params.id; // Obtiene el ID del usuario logueado desde los parámetros de la solicitud

    // Consulta para obtener los IDs de los contactos con los que el usuario ha interactuado
    const [contactIds] = await pool.query(
      `SELECT DISTINCT 
        CASE 
          WHEN idSender = ? THEN idReceiver
          ELSE idSender
        END AS contactId
      FROM messages
      WHERE idSender = ? OR idReceiver = ?`,
      [loggedInUserId, loggedInUserId, loggedInUserId]
    );

    if (contactIds.length === 0) {
      // Si no hay contactos, devuelve un arreglo vacío
      return res.status(200).json([]);
    }

    // Consulta para obtener la información de los contactos desde la tabla `users`
    const [contacts] = await pool.query(
      `SELECT idUser, name, lastname, profileImageUrl 
       FROM users 
       WHERE idUser IN (?)`,
      [contactIds.map((contact) => contact.contactId)]
    );

    res.status(200).json(contacts); // Devuelve la información de los contactos
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
    res.status(500).json({ message: "Internal server error" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para obtener los mensajes entre dos usuarios
export const getMessages = async (req, res) => {
  try {
    const { idUser: userToChatId, myId } = req.params; // Obtiene los IDs de los usuarios desde los parámetros de la solicitud

    // Consulta para obtener los mensajes entre los dos usuarios
    const [rows] = await pool.query(
      `SELECT * FROM messages WHERE (idSender = ? AND idReceiver = ?) OR (idSender = ? AND idReceiver = ?)`,
      [myId, userToChatId, userToChatId, myId]
    );

    res.status(200).json(rows); // Devuelve los mensajes en formato JSON
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
    res.status(500).json({ message: "Internal server error" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para enviar un mensaje
export const sendMessage = async (req, res) => {
  try {
    const { text, image, isSpecial, offerDetails } = req.body; // Obtiene los datos del mensaje desde el cuerpo de la solicitud
    const { receiverId, senderId } = req.params; // Obtiene los IDs del remitente y receptor desde los parámetros de la solicitud

    // Inserta el mensaje en la base de datos
    const [rows] = await pool.query(
      `INSERT INTO messages (idSender, idReceiver, text, image, isSpecial, offerDetails) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        senderId,
        receiverId,
        text,
        image,
        isSpecial,
        JSON.stringify(offerDetails), // Convierte los detalles de la oferta a formato JSON
      ]
    );

    // Obtiene el socket ID del receptor para enviar el mensaje en tiempo real
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // Si el receptor está conectado, envía el mensaje en tiempo real
      io.to(receiverSocketId).emit("newMessage", {
        idSender: senderId,
        idReceiver: receiverId,
        text,
        image,
        isSpecial,
        offerDetails,
      });
    }

    // Crear una notificación para el receptor del mensaje
    const [notificationResult] = await pool.query(
      "INSERT INTO notifications (idUser, idSender, message) VALUES (?, ?, ?)",
      [receiverId, senderId, text]
    );

    const notification = {
      idNotification: notificationResult.insertId,
      idUser: receiverId,
      idSender: senderId,
      message: text,
      isRead: false,
      createdAt: new Date(),
    };

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newNotification", notification);
    } else {
      io.emit("newNotification", notification);
    }

    res.status(200).json(rows);
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
    res.status(500).json({ message: "Internal server error" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para cambiar el estado de un mensaje especial
export const changeSpecialMessageStatus = async (req, res) => {
  try {
    const { idMessage } = req.params; // Obtiene el ID del mensaje desde los parámetros de la solicitud

    // Actualiza el estado del mensaje especial en la base de datos
    const [rows] = await pool.query(
      `UPDATE messages SET isSpecial = false WHERE idMessage = ?`,
      [idMessage]
    );

    res.status(200).json(rows); // Devuelve el resultado de la actualización
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
    res.status(500).json({ message: "Internal server error" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para marcar mensajes como leídos
export const markMessagesAsRead = async (req, res) => {
  try {
    const { idUser, myId } = req.params; // Obtiene los IDs del remitente y receptor desde los parámetros de la solicitud

    // Actualiza el estado de los mensajes no leídos en la base de datos
    const [rows] = await pool.query(
      `UPDATE messages SET \`read\` = true WHERE idSender = ? AND idReceiver = ? AND \`read\` = false`,
      [idUser, myId]
    );

    res.status(200).json({ message: "Mensajes marcados como leídos" }); // Devuelve un mensaje de éxito
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
    res.status(500).json({ message: "Internal server error" }); // Devuelve un error 500 en caso de fallo
  }
};
