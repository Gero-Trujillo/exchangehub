import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import articleRoutes from './routes/articles.routes.js'
import messageRoutes from './routes/messages.routes.js'
import dashboard from './routes/dashboard.routes.js'
import express from "express";
import { app, server } from "./libs/socket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.use(authRoutes)
app.use(userRoutes)
app.use(articleRoutes)
app.use(messageRoutes)
app.use(dashboard)

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});