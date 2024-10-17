import { pool } from "../db.js";

// Obtener todas las calificaciones
const getAllRatings = (req, res) => {
    const query = 'SELECT * FROM ratings';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  };
  
  // Obtener una calificación por ID
  const getRatingById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM ratings WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Rating not found' });
      }
      res.json(results[0]);
    });
  };
  
  // Crear una nueva calificación
  const createRating = (req, res) => {
    const { idUser, rating } = req.body;
    const query = 'INSERT INTO ratings (idUser, rating) VALUES (?, ?)';
    db.query(query, [idUser, rating], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId, idUser, rating });
    });
  };
  
  // Actualizar una calificación existente
  const updateRating = (req, res) => {
    const { id } = req.params;
    const { idUser, rating } = req.body;
    const query = 'UPDATE ratings SET idUser = ?, rating = ? WHERE id = ?';
    db.query(query, [idUser, rating, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Rating not found' });
      }
      res.json({ message: 'Rating updated successfully' });
    });
  };
  
  // Eliminar una calificación
  const deleteRating = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM ratings WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Rating not found' });
      }
      res.json({ message: 'Rating deleted successfully' });
    });
  };