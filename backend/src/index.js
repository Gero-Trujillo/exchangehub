import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.Route.js'
import chatRouter from './routes/chat.Route.js'
import messageRouter from './routes/message.Route.js'
import ratingRouter from './routes/rating.Route.js'
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import {Server}  from 'socket.io';


const app = express()
dotenv.config()

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(authRoutes)
app.use('/api/users', userRouter);
app.use('/api/chats', chatRouter);
app.use('/api/messages', messageRouter);
app.use('/api/ratings', ratingRouter);

//Routes
app.get('/', (req, res) => {
    res.send('Welcome to chat Cambialo API')
})

// Puerto y URI de la base de datos
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

const expressServer = app.listen(port, (req, res) =>{
    console.log(`Server running on port ${port}`)
})

// MongoDB connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected')
}).catch((err) => console.log(err))

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

const io = new Server(expressServer, { cors: {origin: process.env.CLIENT_URL}})

let onlineUsers = []

io.on("connection", (socket) => {
    console.log("new connection", socket.id)

    // listen to a connection
socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
        onlineUsers.push({
            userId,
            socketId: socket.id
        });

    console.log("onlineUsers", onlineUsers); 
    
    io.emit("getOnlineUsers", onlineUsers);
        
    });

    // add message
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find(user => user.userId === message.recipientId);

        if (user){
            io.to(user.socketId).emit("getMessage", message);
            io.to(user.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date()
            });
        }
    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);

        io.emit("getOnlineUsers", onlineUsers);
    })
})