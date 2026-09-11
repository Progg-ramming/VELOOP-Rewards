import { GiveawayParticipation } from '../models/GiveawayParticipation.js';
import { FraudEvent } from '../models/FraudEvent.js';
import { getDeviceHash } from '../utils/deviceHash.js';

export async function assessParticipationRisk({ user, giveaway, request }) {
  const deviceHash = getDeviceHash(request);
  const signals = [];
  let riskScore = 0;
  const existingDeviceParticipation = await GiveawayParticipation.exists({ giveawayId: giveaway._id, deviceHash, userId: { $ne: user._id } });
  if (existingDeviceParticipation) { riskScore += 55; signals.push('DEVICE_USED_BY_ANOTHER_ACCOUNT'); }
  const accountAgeDays = Math.max(0, (Date.now() - user.accountCreatedAt.getTime()) / 86400000);
  if (accountAgeDays < 1) { riskScore += 20; signals.push('NEW_ACCOUNT'); }
  const action = riskScore >= 80 ? 'BLOCKED' : riskScore >= 30 ? 'FLAGGED' : 'REVIEW';
  if (riskScore > 0) await FraudEvent.create({ userId: user._id, giveawayId: giveaway._id, deviceHash, riskScore, reason: 'Participation risk assessment', signals, action });
  return { deviceHash, riskScore, signals, action };
}
