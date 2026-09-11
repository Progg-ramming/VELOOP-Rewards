import crypto from 'node:crypto';
import { env } from '../config/env.js';

export function getDeviceHash(request) {
  const source = [request.get('x-device-id') || '', request.ip || '', request.get('user-agent') || ''].join('|');
  return crypto.createHash('sha256').update(`${env.jwtSecret}:${source}`).digest('hex');
}
