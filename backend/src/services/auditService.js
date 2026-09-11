import crypto from 'node:crypto';
import { AuditLog } from '../models/AuditLog.js';
import { env } from '../config/env.js';

export async function audit(data) {
  const ipHash = data.ip ? crypto.createHash('sha256').update(`${env.jwtSecret}:${data.ip}`).digest('hex') : undefined;
  return AuditLog.create({ ...data, ip: undefined, ipHash });
}
