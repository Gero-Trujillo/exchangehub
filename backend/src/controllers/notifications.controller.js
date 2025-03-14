import { pool } from "../db.js";

export const getNotificationsByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM notifications WHERE idUser = ? ORDER BY createdAt DESC",
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

export const createNotification = async (req, res) => {
  const { idUser, idSender, message } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO notifications (idUser, idSender, message) VALUES (?, ?, ?)",
      [idUser, idSender, message]
    );
    res.json({ idNotification: result.insertId, idUser, idSender, message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating notification" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("UPDATE notifications SET isRead = TRUE WHERE idNotification = ?", [id]);
    res.json({ message: "Notification marked as read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error marking notification as read" });
  }
};