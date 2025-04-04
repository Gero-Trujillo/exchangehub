import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { io, app, server } from "./libs/socket.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import articleRoutes from './routes/articles.routes.js'
import messageRoutes from './routes/messages.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import exchangesRoutes from './routes/exchanges.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import ratingsRoutes from './routes/ratings.routes.js'
import notificationsRoutes from './routes/notifications.routes.js'

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

app.set('socketio', io); // Guardar instancia de socket.io en app

// Rutas de la aplicación
app.use(authRoutes);
app.use(userRoutes);
app.use(articleRoutes);
app.use(messageRoutes);
app.use(dashboardRoutes);
app.use(exchangesRoutes);
app.use(paymentRoutes);
app.use(ratingsRoutes);
app.use(notificationsRoutes);

// Inicia el servidor
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`); // Loguea un mensaje indicando que el servidor está en ejecución
});