import { pool } from "../db.js";

export const getRatingsByUserId = async (req, res) => {
    const {idUser} = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM ratings WHERE idUser = ?', [idUser]);
        res.status(200).json(rows);
    } catch (error) {
        console.log(error)
    }
}

export const addRating = async (req, res) => {
    const {idUser, rating} = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO ratings (idUser, rating) VALUES (?, ?)', [idUser, rating]);
        res.status(200).json(rows);
    } catch (error) {
        console.log(error)
    }
}