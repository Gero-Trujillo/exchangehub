import { Router } from "express";
import {
  cancelExchange,
  createExchange,
  getExchangeById,
  getExchangeByStatus,
  getExchangeByUserId,
  getExchanges,
  getExchangesByProductos,
  updateExchange,
} from "../controllers/exchanges.controller.js";
import { sendNotificationEmail } from "../controllers/emailNotification.controller.js";

const router = Router();

router.get("/api/exchanges", getExchanges);
router.get("/api/exchanges/:id", getExchangeById);
router.get("/api/exchanges/user/:id", getExchangeByUserId);
router.get("/api/exchanges/status/:status", getExchangeByStatus);
router.post("/api/exchanges", createExchange);
router.patch("/api/exchanges/:id", updateExchange);
router.patch("/api/exchanges/cancel/:id", cancelExchange);
router.get("/api/exchanges/articles/:idProductoOne/:idProductoTwo", getExchangesByProductos);
router.post("/api/exchanges/sendNotification", sendNotificationEmail);

export default router;