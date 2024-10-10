import { pool } from "../db.js";

export const getArticles = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM tblArticles");
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

export const getArticleById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query(
      "SELECT * FROM tblArticles WHERE idArticle = ?",
      [id]
    );
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

export const getArticleByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query(
      "SELECT * FROM tblArticles WHERE idOwner = ?",
      [id]
    );
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

export const getArticleByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const response = await pool.query(
      "SELECT * FROM tblArticles WHERE category = ?",
      [category]
    );
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

export const createArticle = async (req, res) => {
  try {
    const { name, description, category, idOwner } = req.body;
    const response = await pool.query(
      "INSERT INTO tblArticles (name, description, category, idOwner) VALUES (?, ?, ?, ?)",
      [name, description, category, idOwner]
    );
    res.json({
      message: "Article created successfully",
      body: {
        article: { name, description, category, idOwner },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, category } = req.body;
    const response = await pool.query(
      "UPDATE tblArticles SET name = ?, description = ?, category = ? WHERE idArticle = ?",
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
      "DELETE FROM tblArticles WHERE idArticle = ?",
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
    const search = req.params.search;
    const response = await pool.query(
      "SELECT * FROM tblArticles WHERE name LIKE ?",
      ["%" + search + "%"]
    );
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
};
