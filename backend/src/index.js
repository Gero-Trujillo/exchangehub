import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import articleRoutes from './routes/articles.routes.js'
import messageRoutes from './routes/messages.routes.js'
import dashboard from './routes/dashboard.routes.js'
import express from "express";
import { app, server } from "./libs/socket.js";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(authRoutes)
app.use(userRoutes)
app.use(articleRoutes)
app.use(messageRoutes)
app.use(dashboard)

server.listen(3000, () => {
    console.log("Server running on port 3000");
});