import { body } from 'express-validator';

export const claimValidator = [body().custom((value) => value && typeof value === 'object').withMessage('Claim details are required.')];
