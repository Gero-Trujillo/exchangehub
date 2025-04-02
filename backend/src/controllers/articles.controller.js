import { pool } from "../db.js"; // Importa la conexión a la base de datos

// Controlador para obtener todos los artículos junto con el nombre del propietario
export const getArticles = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT articles.*, CONCAT(users.name, ' ', users.lastname) AS ownerName
      FROM articles
      JOIN users ON articles.idOwner = users.idUser
    `);
    res.status(200).json(rows); // Devuelve todos los artículos con el nombre del propietario
  } catch (error) {
    console.log(error); // Loguea el error en caso de fallo
  }
};

// Controlador para obtener un artículo por su ID
export const getArticleById = async (req, res) => {
  try {
    const id = req.params.id; // Obtiene el ID del artículo desde los parámetros de la solicitud
    const [rows] = await pool.query(
      "SELECT * FROM articles WHERE idArticle = ?",
      [id]
    );
    if (rows.length > 0) {
      res.json(rows[0]); // Devuelve el artículo si existe
    } else {
      res.status(404).json({ message: "Article not found" }); // Devuelve un error 404 si no se encuentra
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching article" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para obtener todos los artículos de un usuario específico
export const getArticleByUserId = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID del usuario desde los parámetros de la solicitud
    const [rows] = await pool.query(`
      SELECT articles.*, CONCAT(users.name, ' ', users.lastname) AS ownerName
      FROM articles
      JOIN users ON articles.idOwner = users.idUser
      WHERE articles.idOwner = ?
    `, [id]);
    res.status(200).json(rows); // Devuelve los artículos del usuario
  } catch (error) {
    console.log(error);
  }
};

// Controlador para obtener artículos por categoría
export const getArticleByCategory = async (req, res) => {
  try {
    const { category } = req.params; // Obtiene la categoría desde los parámetros de la solicitud
    const [rows] = await pool.query(
      "SELECT * FROM articles WHERE category = ?",
      [category]
    );
    res.json(rows); // Devuelve los artículos de la categoría especificada
  } catch (error) {
    console.log(error);
  }
};

// Controlador para crear un nuevo artículo
export const createArticle = async (req, res) => {
  try {
    const { name, description, category, idOwner } = req.body; // Obtiene los datos del artículo desde el cuerpo de la solicitud
    const [rows] = await pool.query(
      "INSERT INTO articles (name, description, category, idOwner) VALUES (?, ?, ?, ?)",
      [name, description, category, idOwner]
    );
    res.json(rows.insertId); // Devuelve el ID del artículo recién creado
  } catch (error) {
    console.log(error);
  }
};

// Controlador para actualizar un artículo existente
export const updateArticle = async (req, res) => {
  try {
    const id = req.params.id; // Obtiene el ID del artículo desde los parámetros de la solicitud
    const { name, description, category } = req.body; // Obtiene los datos actualizados desde el cuerpo de la solicitud
    const response = await pool.query(
      "UPDATE articles SET name = ?, description = ?, category = ? WHERE idArticle = ?",
      [name, description, category, id]
    );
    res.json({
      message: "Article updated successfully",
      body: {
        article: { name, description, category },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Controlador para eliminar un artículo
export const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id; // Obtiene el ID del artículo desde los parámetros de la solicitud
    const response = await pool.query(
      "DELETE FROM articles WHERE idArticle = ?",
      [id]
    );
    res.json({
      message: "Article deleted successfully",
      body: {
        article: { id },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Controlador para buscar artículos por nombre
export const getArticleBySearch = async (req, res) => {
  try {
    const { search } = req.params; // Obtiene el término de búsqueda desde los parámetros de la solicitud
    const [rows] = await pool.query(
      "SELECT * FROM articles WHERE name LIKE ?",
      ["%" + search + "%"]
    );
    res.json(rows); // Devuelve los artículos que coinciden con el término de búsqueda
  } catch (error) {
    console.log(error);
  }
};

// Controlador para agregar una imagen a un artículo
export const createArticleImage = async (req, res) => {
  try {
    const { idArticle, url, is_main } = req.body; // Obtiene los datos de la imagen desde el cuerpo de la solicitud
    const response = await pool.query(
      "INSERT INTO articlesImages (idArticle, url, is_main) VALUES (?, ?, ?)",
      [idArticle, url, is_main]
    );
    res.json({
      message: "Image created successfully",
      body: {
        image: { idArticle, url, is_main },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Controlador para obtener las imágenes de un artículo
export const getArticleImages = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID del artículo desde los parámetros de la solicitud
    const [rows] = await pool.query(
      "SELECT * FROM articlesimages WHERE idArticle = ?",
      [id]
    );
    res.json(rows); // Devuelve las imágenes del artículo
  } catch (error) {
    console.log(error);
  }
};

// Controlador para eliminar una imagen de un artículo
export const deleteArticleImage = async (req, res) => {
  try {
    const id = req.params.id; // Obtiene el ID de la imagen desde los parámetros de la solicitud
    const [rows] = await pool.query(
      "DELETE FROM articlesImages WHERE idImage = ?",
      [id]
    );
    res.json({
      message: "Image deleted successfully",
      body: {
        image: { id },
      },
    });
  } catch (error) {
    console.log(error);
  }
};