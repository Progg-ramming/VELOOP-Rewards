import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

export async function requireAuth(request, response, next) {
  try {
    if (env.nodeEnv !== 'production' && env.devAuthBypass) {
      const devUserId = request.get('x-dev-user-id');
      if (devUserId) {
        const devUser = await User.findOne({ externalId: devUserId, isActive: true });
        if (!devUser) throw new ApiError(401, 'AUTH_INVALID', 'The development user is not available.');
        request.user = devUser;
        return next();
      }
    }
    const header = request.get('authorization');
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new ApiError(401, 'AUTH_REQUIRED', 'Authentication is required.');
    const payload = jwt.verify(token, env.jwtSecret, { issuer: env.jwtIssuer });
    const user = await User.findOne({ externalId: payload.sub, isActive: true });
    if (!user) throw new ApiError(401, 'AUTH_INVALID', 'The authenticated user is not available.');
    request.user = user;
    next();
  } catch (error) { next(error instanceof ApiError ? error : new ApiError(401, 'AUTH_INVALID', 'Authentication failed.')); }
}

export function requireAdmin(request, response, next) {
  if (request.user?.role !== 'admin') return next(new ApiError(403, 'ADMIN_REQUIRED', 'Administrator access is required.'));
  return next();
}
