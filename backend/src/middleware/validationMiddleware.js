import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';

export function validate(request, response, next) {
  const result = validationResult(request);
  if (!result.isEmpty()) return next(new ApiError(422, 'VALIDATION_FAILED', 'The request could not be validated.', result.array()));
  return next();
}
