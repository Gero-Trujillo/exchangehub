import { Router } from "express";
import {
  getNotificationsByUserId,
  createNotification,
  markNotificationAsRead,
} from "../controllers/notifications.controller.js";

const router = Router();

router.get("/api/notifications/:id", getNotificationsByUserId);
router.post("/api/notifications", createNotification);
router.patch("/api/notifications/:id", markNotificationAsRead);

export default router;