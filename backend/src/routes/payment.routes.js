import express from "express";
import { getPayments, verifyPayment } from "../controllers/payment.controller.js";

const router = express.Router();
router.post("/api/payments/verify", verifyPayment);
router.get("/api/payments", getPayments);

export default router;
