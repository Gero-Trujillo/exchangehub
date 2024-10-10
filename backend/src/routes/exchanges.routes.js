import { Router } from "express";
import {
  createExchange,
  deleteExchange,
  getExchangeById,
  getExchangeByStatus,
  getExchangeByUserId,
  getExchanges,
  updateExchange,
} from "../controllers/exchanges.controller.js";

const router = Router();

router.get("/api/exchanges", getExchanges);
router.get("/api/exchanges/:id", getExchangeById);
router.get("/api/exchanges/user/:id", getExchangeByUserId);
router.get("/api/exchanges/status/:status", getExchangeByStatus);
router.post("/api/exchanges", createExchange);
router.put("/api/exchanges/:id", updateExchange);
router.delete("/api/exchanges/:id", deleteExchange);
