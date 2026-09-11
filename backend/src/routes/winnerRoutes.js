import { Router } from 'express';
import { getPreviousWinners } from '../controllers/winnerController.js';

const router = Router();
router.get('/previous/winners', getPreviousWinners);
export default router;
