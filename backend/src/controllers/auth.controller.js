import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";
import { SECRET_KEY } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { transporter } from "../libs/nodemailer.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    if (rows[0].state === "inActive") {
      return res.status(401).json({ message: "Usuario inactivo" });
    }
    const token = await createAccessToken({ idUser: rows[0].idUser });
    res.cookie("accessToken", token);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const registerUser = async (req, res) => {
  const { name, lastname, email, address, cellphone, password, isPremium } =
    req.body;

  const state = "inActive";

  try {
    const exists = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (exists[0].length > 0) {
      return res.status(400).json({ message: "El email esta registrado" });
    }

    const [rows] = await pool.query(
      "INSERT INTO users (name, lastname, email, address, cellphone, password, state) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, lastname, email, address, cellphone, password, state]
    );

    const mailOptions = {
      from: '"Confirmacion de cuenta" <noresponder@exchangehub.com>',
      to: email,
      subject: "Confirmacion de cuenta",
      html: `
      <h1>Confirmacion de cuenta</h1>
      <p>Para confirmar tu cuenta da click en el siguiente enlace</p>
      <a href="http://localhost:5173/confirm/${rows.insertId}">Confirmar cuenta</a>
      `,
    };

    try {
      transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
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

export const confirmAccount = async (req, res) => {
  const { idUser } = req.params;

  try {
    const [rows] = await pool.query(
      "UPDATE users SET state = 'active' WHERE idUser = ?",
      [idUser]
    );
    res.status(200).json({ message: "OK" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
