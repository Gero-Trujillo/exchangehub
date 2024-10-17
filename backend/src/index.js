import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './Routes/userRoute.js'
import chatRouter from './Routes/chatRoute.js'
import messageRouter from './Routes/messageRoute.js'
import ratingRouter from './Routes/ratingRoute.js'

const app = express()
dotenv.config()

// Middleware
app.use(express.json())
app.use(cors())
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

app.listen(port, (req, res) =>{
    console.log(`Server running on port ${port}`)
})

// MongoDB connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected')
}).catch((err) => console.log(err))
