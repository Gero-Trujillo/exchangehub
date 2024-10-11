import express from 'express';
import { createMessage, getMessages, deleteMessage } from '../controllers/message.Controller.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/:chatId', getMessages);
router.delete('/:id', deleteMessage);

export default router;