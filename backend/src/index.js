import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { app, server } from "./libs/socket.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import articleRoutes from "./routes/articles.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import exchangesRoutes from "./routes/exchanges.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Cargar documentación Swagger
const swaggerDocument = yaml.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:3000"],
    credentials: true,
  })
);

// Rutas de la aplicación
app.use(authRoutes);
app.use(userRoutes);
app.use(articleRoutes);
app.use(messageRoutes);
app.use(dashboardRoutes);
app.use(exchangesRoutes);
app.use(paymentRoutes);

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📄 Swagger Docs: http://localhost:${PORT}/api-docs`);
});
