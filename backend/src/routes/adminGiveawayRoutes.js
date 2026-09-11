import { Router } from 'express';
import { archiveGiveaway, selectWinners } from '../controllers/adminGiveawayController.js';
import { requireAdmin, requireAuth } from '../middleware/authMiddleware.js';
import { giveawayIdValidator } from '../validators/giveawayValidators.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = Router();
router.use(requireAuth, requireAdmin);
router.post('/:id/select-winners', giveawayIdValidator, validate, selectWinners);
router.post('/:id/archive', giveawayIdValidator, validate, archiveGiveaway);
export default router;
