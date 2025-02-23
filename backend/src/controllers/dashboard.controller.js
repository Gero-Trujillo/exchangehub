import { pool } from "../db.js";

export const getEstadisticas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM exchanges");
    let exchangesDone = []
    let exchangesCanceled = []
    let exchangesPending = []
    rows.forEach(row => {
        if(row.status === "done"){
            exchangesDone.push(row)
        }else if (row.status === "pending"){
            exchangesPending.push(row)
        }else{
            exchangesCanceled.push(row)
        }
    });

    const totalDone = exchangesDone.length
    const totalCanceled = exchangesCanceled.length
    const totalPending = exchangesPending.length

    res.status(200).json({
        "cambios_hechos": totalDone,
        "cambios_cancelados": totalCanceled,
        "cambios_en_espera": totalPending
    })
  } catch (error) {}
};
