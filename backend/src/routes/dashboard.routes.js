import { Router } from "express";
import { getEstadisticas } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/estadisticas", getEstadisticas);

export default router;
