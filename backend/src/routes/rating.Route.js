import { getRatingById, createRating, deleteRating, getAllRatings, updateRating } from "../controllers/rating.Controller.js";
import express from 'express';


const router = express.Router();


// Definir las rutas
router.get('/ratings', getAllRatings);
router.get('/ratings/:id', getRatingById);
router.post('/ratings', createRating);
router.put('/ratings/:id', updateRating);
router.delete('/ratings/:id', deleteRating);

export default router;