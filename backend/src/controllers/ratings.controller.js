import { pool } from "../db.js";

export const getRatingsByUserId = async (req, res) => {
  const { idUser } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM ratings WHERE idUser = ?", [
      idUser,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const addRating = async (req, res) => {
  const { idUser, rating, idExchange, idUserToRate } = req.body;
  try {
    // Insertar la calificación en la tabla ratings
    const [rows] = await pool.query(
      "INSERT INTO ratings (idUser, rating) VALUES (?, ?)",
      [idUserToRate, rating]
    );

    // Obtener los datos del intercambio para verificar los usuarios
    const [response] = await pool.query(
      "SELECT idUserOne, idUserTwo FROM exchanges WHERE idExchange = ?",
      [idExchange]
    );

    if (response.length === 0) {
      return res.status(404).json({ message: "Exchange not found" });
    }

    const exchange = response[0];

    // Determinar qué campo actualizar según el usuario que calificó
    let fieldToUpdate = null;
    console.log(exchange)
    console.log("userID", idUser)
    if (exchange.idUserOne === idUser) {
      fieldToUpdate = "ratedByUserOne"; // Usuario 1 está calificando
    } else if (exchange.idUserTwo === idUser) {
      fieldToUpdate = "ratedByUserTwo"; // Usuario 2 está calificando
    } else {
      return res
        .status(400)
        .json({ message: "User not part of this exchange" });
    }

    // Actualizar el campo correspondiente
    const [updateResult] = await pool.query(
      `UPDATE exchanges SET ${fieldToUpdate} = 1 WHERE idExchange = ?`,
      [idExchange]
    );

    if (updateResult.affectedRows === 0) {
      return res
        .status(400)
        .json({ message: "Failed to update rating status" });
    }

    res.json({ message: "Rating status updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
