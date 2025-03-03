import { pool } from "../db.js";
import axios from "axios";

export const verifyPayment = async (req, res) => {
  try {
    const { orderID } = req.body;

    // Verifica la transacción con PayPal
    const response = await axios.get(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentData = response.data;

    if (paymentData.status === "COMPLETED") {
      const { id, purchase_units, payer } = paymentData;
      const amount = purchase_units[0].amount.value;
      const currency = purchase_units[0].amount.currency_code;
      const email = payer.email_address;

      await pool.query(`
        INSERT INTO payment (transaction_id, user_id, amount, currency, status, payer_email)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [id, req.user.id, amount, currency, "completed", email]);

      return res.json({ success: true, message: "Pago registrado correctamente" });
    } else {
      return res.status(400).json({ success: false, message: "Pago no completado" });
    }
  } catch (error) {
    console.error("Error verificando el pago:", error);
    return res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};

export const getPayments = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM payment");
    return res.json(rows);
  } catch (error) {
    console.error("Error obteniendo los pagos:", error);
    return res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};