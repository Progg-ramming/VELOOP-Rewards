import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

export const apiRateLimit = rateLimit({ windowMs: env.rateLimitWindowMs, limit: env.rateLimitMax, standardHeaders: 'draft-8', legacyHeaders: false });
export const joinRateLimit = rateLimit({ windowMs: env.rateLimitWindowMs, limit: env.joinRateLimitMax, standardHeaders: 'draft-8', legacyHeaders: false, message: { code: 'JOIN_RATE_LIMITED', message: 'Too many participation attempts. Please try again later.' } });
