import {Router} from 'express';
import { addRating, getRatingsByUserId } from '../controllers/ratings.controller.js';

const router = Router();

router.get('/api/ratings/:idUser', getRatingsByUserId)
router.post('/api/ratings', addRating)

export default router;