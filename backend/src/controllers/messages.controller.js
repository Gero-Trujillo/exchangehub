import { pool } from "../db.js";
import { getReceiverSocketId, io } from "../libs/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.params.id;
    console.log(loggedInUserId);
    const [rows] = await pool.query("SELECT * FROM users WHERE idUser != ?", [
      loggedInUserId,
    ]);
    res.status(200).json(rows);
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
    const { text, image } = req.body;
    const { receiverId, senderId } = req.params;

    const [rows] = await pool.query(
      `INSERT INTO messages (idSender, idReceiver, text, image) VALUES (?, ?, ?, ?)`,
      [senderId, receiverId, text, image]
    );

    console.log("receiverId", receiverId);
    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log(`Receiver socket id: ${receiverSocketId}`);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        idSender: senderId,
        idReceiver: receiverId,
        text,
        image,
      });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
