import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export function notFound(request, response, next) { next(new ApiError(404, 'NOT_FOUND', 'The requested resource was not found.')); }

export function errorHandler(error, request, response, next) {
  request.log?.error({ err: error }, 'request failed');
  if (error?.name === 'CastError') return response.status(404).json({ code: 'NOT_FOUND', message: 'The requested resource was not found.' });
  if (error?.code === 11000) return response.status(409).json({ code: 'DUPLICATE_RESOURCE', message: 'This resource already exists.' });
  const status = error instanceof ApiError ? error.statusCode : 500;
  const body = { code: error instanceof ApiError ? error.code : 'INTERNAL_ERROR', message: status === 500 && env.nodeEnv === 'production' ? 'An unexpected error occurred.' : error.message };
  if (error instanceof ApiError && error.details) body.details = error.details;
  return response.status(status).json(body);
}
