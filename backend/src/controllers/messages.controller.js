import { pool } from "../db.js";
import { getReceiverSocketId, io } from "../libs/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.params.id;

    // Obtener los IDs de los contactos con los que el usuario ha interactuado
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
      return res.status(200).json([]);
    }

    // Obtener la información de los contactos desde la tabla `users`
    const [contacts] = await pool.query(
      `SELECT idUser, name, lastname, profileImageUrl 
       FROM users 
       WHERE idUser IN (?)`,
      [contactIds.map((contact) => contact.contactId)]
    );

    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { idUser: userToChatId, myId } = req.params;

    const [rows] = await pool.query(
      `SELECT * FROM messages WHERE (idSender = ? AND idReceiver = ?) OR (idSender = ? AND idReceiver = ?)`,
      [myId, userToChatId, userToChatId, myId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image, isSpecial, offerDetails } = req.body;
    const { receiverId, senderId } = req.params;

    const [rows] = await pool.query(
      `INSERT INTO messages (idSender, idReceiver, text, image, isSpecial, offerDetails) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        senderId,
        receiverId,
        text,
        image,
        isSpecial,
        JSON.stringify(offerDetails),
      ]
    );

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        idSender: senderId,
        idReceiver: receiverId,
        text,
        image,
        isSpecial,
        offerDetails,
      });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const changeSpecialMessageStatus = async (req, res) => {
  try {
    const { idMessage } = req.params;

    const [rows] = await pool.query(
      `UPDATE messages SET isSpecial = false WHERE idMessage = ?`,
      [idMessage]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const markMessagesAsRead = async (req, res) => {
  try {
    const { idUser, myId } = req.params;

    const [rows] = await pool.query(
      `UPDATE messages SET \`read\` = true WHERE idSender = ? AND idReceiver = ? AND \`read\` = false`,
      [idUser, myId]
    );

    res.status(200).json({ message: "Mensajes marcados como leídos" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
