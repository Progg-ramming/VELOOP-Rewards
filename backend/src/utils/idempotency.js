import { ApiError } from './ApiError.js';

export function requireIdempotencyKey(request) {
  const key = request.get('Idempotency-Key')?.trim();
  if (!key || key.length < 16 || key.length > 128) throw new ApiError(400, 'IDEMPOTENCY_KEY_REQUIRED', 'A valid Idempotency-Key header is required.');
  return key;
}
