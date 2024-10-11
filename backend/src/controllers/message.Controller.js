import messageModel from "../Models/messageModel.js";

// Create Message
const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;
    const newMessage = new messageModel({
        chatId,
        senderId,
        text
    });
    try {
        const message = await newMessage.save();
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json(error);
    }
}

// get Messages
const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await messageModel.find({chatId});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
}

// delete Message
const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        await messageModel.findByIdAndDelete(id);
        res.status(200).json('Message deleted');
    } catch (error) {
        res.status(500).json(error);
    }
}

export { createMessage, getMessages, deleteMessage };