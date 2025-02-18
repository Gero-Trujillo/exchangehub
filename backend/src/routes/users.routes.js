import {
    addUser,
    consultUsers,
    consultUser,
    updateUser,
    deleteUserUpdateState,
    resetUserUpdateState,
    updateImage,
  } from "../controllers/users.controller.js";
  import { Router } from "express";
  
  const router = Router();
  router.post("/api/users", addUser);
  router.get("/api/users", consultUsers);
  router.get("/api/users/:idUser", consultUser);
  router.put("/api/users/:iduser", updateUser);
  router.delete("/api/users/:iduser", deleteUserUpdateState);
  router.post("/api/users/:iduser", resetUserUpdateState);
  router.patch("/api/users/:iduser/image", updateImage);
  
  export default router;