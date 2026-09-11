import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import { GiveawayEntryTransaction } from '../models/GiveawayEntryTransaction.js';
import { GiveawayParticipation } from '../models/GiveawayParticipation.js';
import { ApiError } from '../utils/ApiError.js';
import { effectiveStatus, getPrizeForParticipation } from './giveawayService.js';
import { assertBalance, deductBalance } from './balanceService.js';
import { assessParticipationRisk } from '../middleware/fraudMiddleware.js';
import { canParticipate } from './fraudService.js';
import { audit } from './auditService.js';

export async function joinGiveaway({ giveaway, user, request, idempotencyKey, requestedPrizeId }) {
  const priorTransaction = await GiveawayEntryTransaction.findOne({ userId: user._id, idempotencyKey });
  if (priorTransaction) return { idempotent: true, transaction: priorTransaction };
  if (effectiveStatus(giveaway) !== 'ACTIVE') throw new ApiError(409, 'GIVEAWAY_NOT_ACTIVE', 'This giveaway is not accepting participation.');
  const configuredPrize = await getPrizeForParticipation(giveaway, requestedPrizeId || giveaway.prizes[0].prizeId._id.toString());
  const fee = configuredPrize.entry;
  const risk = await assessParticipationRisk({ user, giveaway, request });
  const fraudDecision = canParticipate(risk);
  if (!fraudDecision.allowed) {
    await audit({ actorUserId: user._id, userId: user._id, giveawayId: giveaway._id, action: 'FRAUD_FLAGGED', result: risk.action, requestId: idempotencyKey, ip: request.ip, metadata: { signals: risk.signals, riskScore: risk.riskScore } });
    throw new ApiError(403, fraudDecision.code, fraudDecision.message);
  }
  const session = await mongoose.startSession();
  try {
    let result;
    await session.withTransaction(async () => {
      const lockedUser = await user.constructor.findById(user._id).session(session);
      const existing = await GiveawayParticipation.findOne({ userId: user._id, giveawayId: giveaway._id }).session(session);
      if (existing) throw new ApiError(409, 'ALREADY_PARTICIPATING', 'Participation already exists for this giveaway.');
      const balanceBefore = assertBalance(lockedUser, fee.currency, fee.amount);
      deductBalance(lockedUser, fee.currency, fee.amount);
      const balanceAfter = lockedUser.balances[fee.currency];
      await lockedUser.save({ session });
      const [participation] = await GiveawayParticipation.create([{ userId: user._id, giveawayId: giveaway._id, prizeId: configuredPrize._id, deviceHash: risk.deviceHash, riskScore: risk.riskScore, status: 'RECORDED' }], { session });
      const [transaction] = await GiveawayEntryTransaction.create([{ transactionId: randomUUID(), idempotencyKey, userId: user._id, giveawayId: giveaway._id, prizeId: configuredPrize._id, currency: fee.currency, amount: fee.amount, status: 'SUCCESS', balanceBefore, balanceAfter }], { session });
      await audit({ actorUserId: user._id, userId: user._id, giveawayId: giveaway._id, amount: fee.amount, currency: fee.currency, action: 'JOIN_GIVEAWAY', result: 'SUCCESS', requestId: idempotencyKey, ip: request.ip });
      result = { participation, transaction };
    });
    return result;
  } catch (error) {
    if (error?.code === 11000) {
      const existingTransaction = await GiveawayEntryTransaction.findOne({ userId: user._id, idempotencyKey });
      if (existingTransaction) return { idempotent: true, transaction: existingTransaction };
      throw new ApiError(409, 'ALREADY_PARTICIPATING', 'Participation already exists for this giveaway.');
    }
    throw error;
  } finally { await session.endSession(); }
}
