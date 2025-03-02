import { pool } from "../db.js";

export const getExchanges = async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM tblExchanges");
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
    }
}

export const getExchangeById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query(
            "SELECT * FROM tblExchanges WHERE idExchange = ?",
            [id]
        );
        res.json(response.rows);
    } catch (error) {
        console.log(error);
    }
}

export const getExchangeByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await pool.query(
            `SELECT 
                e.idExchange,
                CONCAT(u1.name, ' ', u1.lastname) AS userOneName,
                a1.name AS productOneName,
                CONCAT(u2.name, ' ', u2.lastname) AS userTwoName,
                a2.name AS productTwoName,
                e.status
            FROM exchanges e
            JOIN users u1 ON e.idUserOne = u1.idUser
            JOIN articles a1 ON e.idProductoOne = a1.idArticle
            JOIN users u2 ON e.idUserTwo = u2.idUser
            JOIN articles a2 ON e.idProductoTwo = a2.idArticle
            WHERE e.idUserOne = ? OR e.idUserTwo = ?`,
            [id, id]
        );
        res.json(rows);
    } catch (error) {
        console.log(error);
    }
}


export const createExchange = async (req, res) => {
    try {
        const { idUserOne, idUserTwo, idProductoOne, idProductoTwo, status } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO exchanges (idUserOne, idUserTwo, idProductoOne, idProductoTwo, status) VALUES (?, ?, ?, ?, ?)",
            [idUserOne, idUserTwo, idProductoOne, idProductoTwo, status]
        );
        res.status(201).json("Exchange created successfully");
    } catch (error) {
        console.log(error);
    }
}

export const updateExchange = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const [rows] = await pool.query(
            "UPDATE exchanges SET status = ? WHERE idExchange = ?",
            [status, id]
        );
        res.json("Exchange updated successfully");
    } catch (error) {
        console.log(error);
    }
}

export const cancelExchange = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const [rows] = await pool.query(
            "UPDATE exchanges SET status = ? WHERE idExchange = ?",
            [status, id]
        );
        res.json("Exchange updated successfully");
    } catch (error) {
        console.log(error);
    }
}

export const getExchangeByStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const response = await pool.query(
            "SELECT * FROM tblExchanges WHERE status = ?",
            [status]
        );
        res.json(response.rows);
    } catch (error) {
        console.log(error);
    }
}

export const getExchangesByProductos = async (req, res) => {
    try {
        const { idProductoOne, idProductoTwo } = req.params;
        const [rows] = await pool.query(
            "SELECT * FROM exchanges WHERE idProductoOne = ? OR idProductoTwo = ?",
            [idProductoOne, idProductoTwo]
        );
        res.json(rows[0]);
    } catch (error) {
        console.log(error);
    }
}