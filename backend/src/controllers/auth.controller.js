import { pool } from "../db.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    if (user.rows.length === 0) {
      return res.status(400).json("Invalid Credentials");
    }
    res.cookie("accessToken", user.rows[0].idUser, {
      httpOnly: true,
    });
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
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