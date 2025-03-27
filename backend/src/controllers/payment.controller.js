import { pool } from "../db.js"; // Importa la conexión a la base de datos
import axios from "axios"; // Importa Axios para realizar solicitudes HTTP

// Controlador para verificar un pago con PayPal
export const verifyPayment = async (req, res) => {
  try {
    const { orderID } = req.body; // Obtiene el ID de la orden desde el cuerpo de la solicitud

    // Realiza una solicitud a la API de PayPal para verificar la transacción
    const response = await axios.get(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`, // URL de la API de PayPal para verificar la orden
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`, // Token de acceso de PayPal desde las variables de entorno
          "Content-Type": "application/json", // Tipo de contenido de la solicitud
        },
      }
    );

    const paymentData = response.data; // Almacena los datos de la respuesta de PayPal

    // Verifica si el estado del pago es "COMPLETED"
    if (paymentData.status === "COMPLETED") {
      const { id, purchase_units, payer } = paymentData; // Extrae los datos relevantes del pago
      const amount = purchase_units[0].amount.value; // Monto del pago
      const currency = purchase_units[0].amount.currency_code; // Moneda del pago
      const email = payer.email_address; // Correo electrónico del pagador

      // Inserta los datos del pago en la base de datos
      await pool.query(
        `
        INSERT INTO payment (transaction_id, user_id, amount, currency, status, payer_email)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
        [id, req.user.id, amount, currency, "completed", email]
      );

      // Devuelve una respuesta exitosa al cliente
      return res.json({ success: true, message: "Pago registrado correctamente" });
    } else {
      // Si el estado del pago no es "COMPLETED", devuelve un error 400
      return res.status(400).json({ success: false, message: "Pago no completado" });
    }
  } catch (error) {
    console.error("Error verificando el pago:", error); // Loguea el error en caso de fallo
    return res.status(500).json({ success: false, message: "Error en el servidor" }); // Devuelve un error 500 al cliente
  }
};

// Controlador para obtener todos los pagos completados
export const getPayments = async (req, res) => {
  try {
    // Consulta para obtener todos los pagos con estado "completed"
    const [rows] = await pool.query("SELECT * FROM payment WHERE status = 'completed'");
    return res.json(rows); // Devuelve los pagos en formato JSON
  } catch (error) {
    console.error("Error obteniendo los pagos:", error); // Loguea el error en caso de fallo
    return res.status(500).json({ success: false, message: "Error en el servidor" }); // Devuelve un error 500 al cliente
  }
};