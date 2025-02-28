import { pool } from "../db.js";

export const getArticles = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT articles.*, CONCAT(users.name, ' ', users.lastname) AS ownerName
      FROM articles
      JOIN users ON articles.idOwner = users.idUser
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getArticleById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query(
      "SELECT * FROM articles WHERE idArticle = ?",
      [id]
    );
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

export const getArticleByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT articles.*, CONCAT(users.name, ' ', users.lastname) AS ownerName
      FROM articles
      JOIN users ON articles.idOwner = users.idUser
      WHERE articles.idOwner = ?
    `, [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getArticleByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM articles WHERE category = ?",
      [category]
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const createArticle = async (req, res) => {
  try {
    const { name, description, category, idOwner } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO articles (name, description, category, idOwner) VALUES (?, ?, ?, ?)",
      [name, description, category, idOwner]
    );
    res.json(rows.insertId);
  } catch (error) {
    console.log(error);
  }
};

export const updateArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, category } = req.body;
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

export const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;
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

export const getArticleBySearch = async (req, res) => {
  try {
    const { search } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM articles WHERE name LIKE ?",
      ["%" + search + "%"]
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const createArticleImage = async (req, res) => {
  try {
    const { idArticle, url, is_main } = req.body;
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

export const getArticleImages = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM articlesimages WHERE idArticle = ?",
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};
