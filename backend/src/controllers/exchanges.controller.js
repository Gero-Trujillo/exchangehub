import { pool } from "../db.js"; // Importa la conexión a la base de datos

// Controlador para obtener todos los intercambios
export const getExchanges = async (req, res) => {
  try {
    // Consulta para obtener todos los intercambios junto con los nombres de los usuarios y productos involucrados
    const [rows] = await pool.query(`
            SELECT 
                e.idExchange,
                CONCAT(u1.name, ' ', u1.lastname) AS userOneName,
                u1.idUser AS userOneId,
                a1.name AS productOneName,
                a1.idArticle AS productOneId,
                CONCAT(u2.name, ' ', u2.lastname) AS userTwoName,
                u2.idUser AS userTwoId,
                a2.name AS productTwoName,
                a2.idArticle AS productTwoId,
                e.status,
                e.exchangeDate
            FROM exchanges e
            JOIN users u1 ON e.idUserOne = u1.idUser
            JOIN articles a1 ON e.idProductoOne = a1.idArticle
            JOIN users u2 ON e.idUserTwo = u2.idUser
            JOIN articles a2 ON e.idProductoTwo = a2.idArticle
        `);
    res.status(200).json(rows); // Devuelve todos los intercambios en formato JSON
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
    res.status(500).json({ message: "Error retrieving exchanges" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para obtener un intercambio por su ID
export const getExchangeById = async (req, res) => {
  try {
    const id = req.params.id; // Obtiene el ID del intercambio desde los parámetros de la solicitud
    const response = await pool.query(
      "SELECT * FROM tblExchanges WHERE idExchange = ?",
      [id]
    );
    res.json(response.rows); // Devuelve el intercambio correspondiente
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
  }
};

// Controlador para obtener intercambios relacionados con un usuario específico
export const getExchangeByUserId = async (req, res) => {
  try {
    const id = req.params.id; // Obtiene el ID del usuario desde los parámetros de la solicitud
    const [rows] = await pool.query(
      `SELECT 
          e.idExchange,
          e.idUserOne,
          e.idUserTwo,
          CONCAT(u1.name, ' ', u1.lastname) AS userOneName,
          a1.name AS productOneName,
          CONCAT(u2.name, ' ', u2.lastname) AS userTwoName,
          a2.name AS productTwoName,
          e.status,
          e.ratedByUserOne,
          e.ratedByUserTwo
       FROM exchanges e
       JOIN users u1 ON e.idUserOne = u1.idUser
       JOIN articles a1 ON e.idProductoOne = a1.idArticle
       JOIN users u2 ON e.idUserTwo = u2.idUser
       JOIN articles a2 ON e.idProductoTwo = a2.idArticle
       WHERE e.idUserOne = ? OR e.idUserTwo = ?`,
      [id, id]
    );
    res.json(rows); // Devuelve los intercambios relacionados con el usuario
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
    res.status(500).json({ message: "Error retrieving exchanges by user ID" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para crear un nuevo intercambio
export const createExchange = async (req, res) => {
  try {
    const { idUserOne, idUserTwo, idProductoOne, idProductoTwo, status } =
      req.body; // Obtiene los datos del intercambio desde el cuerpo de la solicitud
    const [rows] = await pool.query(
      "INSERT INTO exchanges (idUserOne, idUserTwo, idProductoOne, idProductoTwo, status) VALUES (?, ?, ?, ?, ?)",
      [idUserOne, idUserTwo, idProductoOne, idProductoTwo, status]
    );
    res.status(201).json("Exchange created successfully"); // Devuelve un mensaje de éxito
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
  }
};

// Controlador para actualizar el estado de un intercambio
export const updateExchange = async (req, res) => {
  try {
    const id = req.params.id; // Obtiene el ID del intercambio desde los parámetros de la solicitud
    const { status } = req.body; // Obtiene el nuevo estado desde el cuerpo de la solicitud
    const [rows] = await pool.query(
      "UPDATE exchanges SET status = ? WHERE idExchange = ?",
      [status, id]
    );
    res.json("Exchange updated successfully"); // Devuelve un mensaje de éxito
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
  }
};

// Controlador para cancelar un intercambio
export const cancelExchange = async (req, res) => {
  try {
    const id = req.params.id; // Obtiene el ID del intercambio desde los parámetros de la solicitud
    const { status } = req.body; // Obtiene el nuevo estado desde el cuerpo de la solicitud
    const [rows] = await pool.query(
      "UPDATE exchanges SET status = ? WHERE idExchange = ?",
      [status, id]
    );
    res.json("Exchange updated successfully"); // Devuelve un mensaje de éxito
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
  }
};

// Controlador para obtener intercambios por estado
export const getExchangeByStatus = async (req, res) => {
  try {
    const status = req.params.status; // Obtiene el estado desde los parámetros de la solicitud
    const response = await pool.query(
      "SELECT * FROM tblExchanges WHERE status = ?",
      [status]
    );
    res.json(response.rows); // Devuelve los intercambios con el estado especificado
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
  }
};

// Controlador para obtener intercambios relacionados con productos específicos
export const getExchangesByProductos = async (req, res) => {
  try {
    const { idProductoOne, idProductoTwo } = req.params; // Obtiene los IDs de los productos desde los parámetros de la solicitud
    const [rows] = await pool.query(
      "SELECT * FROM exchanges WHERE idProductoOne = ? OR idProductoTwo = ?",
      [idProductoOne, idProductoTwo]
    );
    res.json(rows[0]); // Devuelve el intercambio relacionado con los productos
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
  }
};
