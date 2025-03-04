import { Router } from "express";
import {
  changeSpecialMessageStatus,
  getMessages,
  getUsersForSidebar,
  sendMessage,
  markMessagesAsRead
} from "../controllers/messages.controller.js";

const router = Router();

router.get("/api/messages/users/:id", getUsersForSidebar);
router.get("/api/messages/:idUser/:myId", getMessages);
router.post("/api/messages/send/:receiverId/:senderId", sendMessage);
router.patch("/api/messages/:idMessage", changeSpecialMessageStatus);
router.post("/api/messages/read/:idUser/:myId", markMessagesAsRead);

export default router;
