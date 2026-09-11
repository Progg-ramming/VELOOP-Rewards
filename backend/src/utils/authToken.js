import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function createAccessToken(externalId, role = 'user') {
  return jwt.sign({ role }, env.jwtSecret, { subject: externalId, issuer: env.jwtIssuer, expiresIn: '15m' });
}
