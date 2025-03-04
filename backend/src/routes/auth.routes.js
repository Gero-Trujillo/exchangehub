import { Router } from "express";
import { confirmAccount, loginUser, logoutUser, registerUser, verifyToken } from "../controllers/auth.controller.js";

const router = Router();

router.post("/api/login", loginUser)
router.post("/api/register", registerUser)
router.post("/api/logout", logoutUser)
router.get("/api/verify", verifyToken)
router.patch("/api/confirm/:idUser", confirmAccount)

export default router;