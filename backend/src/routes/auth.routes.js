import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/auth.controller";

const router = Router();

router.post("/api/login", loginUser)
router.post("/api/logout", logoutUser)