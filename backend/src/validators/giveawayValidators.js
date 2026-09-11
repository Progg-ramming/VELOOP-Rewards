import { param } from 'express-validator';

export const giveawayIdValidator = [param('id').isString().trim().isLength({ min: 1, max: 100 })];
