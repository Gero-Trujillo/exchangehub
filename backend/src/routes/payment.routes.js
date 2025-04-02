import express from "express"; // Importa Express para manejar rutas
import { getPayments, verifyPayment } from "../controllers/payment.controller.js"; // Importa los controladores relacionados con los pagos

const router = express.Router(); // Crea una instancia del enrutador de Express

// Rutas para manejar pagos

// Verifica un pago realizado por el usuario
router.post("/api/payments/verify", verifyPayment);
// Maneja solicitudes POST a la ruta "/api/payments/verify"
// Llama al controlador `verifyPayment` para validar y registrar un pago

// Obtiene todos los pagos completados
router.get("/api/payments", getPayments);
// Maneja solicitudes GET a la ruta "/api/payments"
// Llama al controlador `getPayments` para obtener una lista de pagos completados

export default router; // Exporta el enrutador para usarlo en otras partes de la aplicación
