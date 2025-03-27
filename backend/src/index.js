import cookieParser from "cookie-parser"; // Middleware para analizar cookies en las solicitudes
import dotenv from "dotenv"; // Carga las variables de entorno desde un archivo .env
import cors from "cors"; // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
import express from "express"; // Framework para manejar solicitudes HTTP
import { app, server } from "./libs/socket.js"; // Importa la instancia de Express y el servidor HTTP configurado con Socket.IO
import authRoutes from "./routes/auth.routes.js"; // Rutas relacionadas con la autenticación
import userRoutes from "./routes/users.routes.js"; // Rutas relacionadas con los usuarios
import articleRoutes from './routes/articles.routes.js'; // Rutas relacionadas con los artículos
import messageRoutes from './routes/messages.routes.js'; // Rutas relacionadas con los mensajes
import dashboardRoutes from './routes/dashboard.routes.js'; // Rutas relacionadas con el dashboard
import exchangesRoutes from './routes/exchanges.routes.js'; // Rutas relacionadas con los intercambios
import paymentRoutes from './routes/payment.routes.js'; // Rutas relacionadas con los pagos
import ratingsRoutes from './routes/ratings.routes.js'; // Rutas relacionadas con las calificaciones

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const PORT = process.env.PORT || 3000; // Puerto en el que se ejecutará el servidor
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"; // URL del frontend permitida para CORS

// Middlewares globales
app.use(express.json()); // Middleware para analizar cuerpos JSON en las solicitudes
app.use(cookieParser()); // Middleware para analizar cookies
app.use(cors({
  origin: [FRONTEND_URL, "http://localhost:3000"], // Permite solicitudes desde estas URLs
  credentials: true, // Habilita el envío de cookies y credenciales
}));

// Rutas de la aplicación
app.use(authRoutes); // Rutas de autenticación
app.use(userRoutes); // Rutas de usuarios
app.use(articleRoutes); // Rutas de artículos
app.use(messageRoutes); // Rutas de mensajes
app.use(dashboardRoutes); // Rutas del dashboard
app.use(exchangesRoutes); // Rutas de intercambios
app.use(paymentRoutes); // Rutas de pagos
app.use(ratingsRoutes); // Rutas de calificaciones

// Inicia el servidor
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`); // Loguea un mensaje indicando que el servidor está en ejecución
});