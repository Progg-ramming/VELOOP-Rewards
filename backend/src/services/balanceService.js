import { ApiError } from '../utils/ApiError.js';

export function assertBalance(user, currency, amount) {
  const balanceBefore = user.balances[currency] ?? 0;
  if (balanceBefore < amount) throw new ApiError(409, 'INSUFFICIENT_BALANCE', `Insufficient ${currency} balance.`, { currency, required: amount, available: balanceBefore, shortfall: amount - balanceBefore });
  return balanceBefore;
}

export function deductBalance(user, currency, amount) {
  user.balances[currency] -= amount;
}
