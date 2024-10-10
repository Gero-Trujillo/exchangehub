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
        const response = await pool.query(
            "SELECT * FROM tblExchanges WHERE idUserOne = ? OR idUserTwo = ?",
            [id, id]
        );
        res.json(response.rows);
    } catch (error) {
        console.log(error);
    }
}


export const createExchange = async (req, res) => {
    try {
        const { idUserOne, idUserTwo, idProductoOne, idProductoTwo, status } = req.body;
        const response = await pool.query(
            "INSERT INTO tblExchanges (idUserOne, idUserTwo, idProductoOne, idProductoTwo, status) VALUES (?, ?, ?, ?, ?)",
            [idUserOne, idUserTwo, idProductoOne, idProductoTwo, status]
        );
        res.json({
            message: "Exchange created successfully",
            body: {
                exchange: { idUserOne, idUserTwo, category, description, status }
            },
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateExchange = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const response = await pool.query(
            "UPDATE tblExchanges SET status = ? WHERE idExchange = ?",
            [status, id]
        );
        res.json("Exchange updated successfully");
    } catch (error) {
        console.log(error);
    }
}

export const deleteExchange = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query(
            "DELETE FROM tblExchanges WHERE idExchange = ?",
            [id]
        );
        res.json("Exchange deleted successfully");
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