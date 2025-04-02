import { pool } from "../db.js"; // Importa la conexión a la base de datos

// Controlador para obtener las calificaciones de un usuario específico
export const getRatingsByUserId = async (req, res) => {
  const { idUser } = req.params; // Obtiene el ID del usuario desde los parámetros de la solicitud
  try {
    // Consulta para obtener todas las calificaciones asociadas al usuario
    const [rows] = await pool.query("SELECT * FROM ratings WHERE idUser = ?", [
      idUser,
    ]);
    res.status(200).json(rows); // Devuelve las calificaciones en formato JSON
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
    res.status(500).json({ message: "Error fetching ratings" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para agregar una nueva calificación
export const addRating = async (req, res) => {
  const { idUser, rating, idExchange, idUserToRate } = req.body; // Obtiene los datos necesarios desde el cuerpo de la solicitud
  try {
    // Inserta la calificación en la tabla `ratings`
    const [rows] = await pool.query(
      "INSERT INTO ratings (idUser, rating) VALUES (?, ?)",
      [idUserToRate, rating]
    );

    // Consulta para obtener los datos del intercambio asociado
    const [response] = await pool.query(
      "SELECT idUserOne, idUserTwo FROM exchanges WHERE idExchange = ?",
      [idExchange]
    );

    if (response.length === 0) {
      // Si no se encuentra el intercambio, devuelve un error 404
      return res.status(404).json({ message: "Exchange not found" });
    }

    const exchange = response[0]; // Obtiene los datos del intercambio

    // Determina qué campo actualizar según el usuario que calificó
    let fieldToUpdate = null;
    console.log(exchange); // Loguea los datos del intercambio para depuración
    console.log("userID", idUser); // Loguea el ID del usuario que está calificando
    if (exchange.idUserOne === idUser) {
      fieldToUpdate = "ratedByUserOne"; // Usuario 1 está calificando
    } else if (exchange.idUserTwo === idUser) {
      fieldToUpdate = "ratedByUserTwo"; // Usuario 2 está calificando
    } else {
      // Si el usuario no forma parte del intercambio, devuelve un error 400
      return res
        .status(400)
        .json({ message: "User not part of this exchange" });
    }

    // Actualiza el campo correspondiente en la tabla `exchanges`
    const [updateResult] = await pool.query(
      `UPDATE exchanges SET ${fieldToUpdate} = 1 WHERE idExchange = ?`,
      [idExchange]
    );

    if (updateResult.affectedRows === 0) {
      // Si no se actualizó ningún registro, devuelve un error 400
      return res
        .status(400)
        .json({ message: "Failed to update rating status" });
    }

    res.json({ message: "Rating status updated successfully" }); // Devuelve un mensaje de éxito
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
    res.status(500).json({ message: "Internal server error" }); // Devuelve un error 500 en caso de fallo
  }
};
