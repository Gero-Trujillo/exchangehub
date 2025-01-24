import { Router } from "express";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/messages.controller.js";

const router = Router();

router.get("/api/messages/users/:id", getUsersForSidebar);
router.get("/api/messages/:idUser/:myId", getMessages);
router.post("/api/messages/send/:receiverId/:senderId", sendMessage);

export default router;
