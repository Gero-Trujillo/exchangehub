import { pool } from "../db.js"; // Importa la conexión a la base de datos

// Controlador para obtener estadísticas de los intercambios
export const getEstadisticas = async (req, res) => {
  try {
    // Consulta todos los intercambios desde la base de datos
    const [rows] = await pool.query("SELECT * FROM exchanges");

    // Inicializa arreglos para clasificar los intercambios según su estado
    let exchangesDone = []; // Intercambios completados
    let exchangesCanceled = []; // Intercambios cancelados
    let exchangesPending = []; // Intercambios pendientes

    // Clasifica los intercambios según su estado
    rows.forEach((row) => {
      if (row.status === "completado") {
        exchangesDone.push(row); // Agrega a completados
      } else if (row.status === "pendiente") {
        exchangesPending.push(row); // Agrega a pendientes
      } else if (row.status === "cancelado") {
        exchangesCanceled.push(row); // Agrega a cancelados
      }
    });

    // Calcula el total de cada categoría
    const totalDone = exchangesDone.length; // Total de intercambios completados
    const totalCanceled = exchangesCanceled.length; // Total de intercambios cancelados
    const totalPending = exchangesPending.length; // Total de intercambios pendientes

    // Devuelve las estadísticas como respuesta en formato JSON
    res.status(200).json({
      cambios_hechos: totalDone, // Total de intercambios completados
      cambios_cancelados: totalCanceled, // Total de intercambios cancelados
      cambios_en_espera: totalPending, // Total de intercambios pendientes
    });
  } catch (error) {
    console.error(error); // Loguea el error en caso de fallo
    res.status(500).json({ message: "Error fetching statistics" }); // Devuelve un error 500 en caso de fallo
  }
};
