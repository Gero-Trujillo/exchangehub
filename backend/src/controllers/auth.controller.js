import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";
import { SECRET_KEY } from "../libs/jwt.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = await createAccessToken({ idUser: rows[0].idUser });
    res.cookie("accessToken", token);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};

export const verifyToken = async (req, res) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  jwt.verify(accessToken, SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const [rows] = await pool.query("SELECT * FROM users WHERE idUser = ?", [
      user.idUser,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    return res.json(rows[0]);
  });
};
