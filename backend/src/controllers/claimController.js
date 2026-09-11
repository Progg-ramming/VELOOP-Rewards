import sanitizeHtml from 'sanitize-html';
import { GiveawayWinner } from '../models/GiveawayWinner.js';
import { PrizeClaim } from '../models/PrizeClaim.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getGiveawayOrThrow } from '../services/giveawayService.js';
import { ApiError } from '../utils/ApiError.js';
import { audit } from '../services/auditService.js';

function clean(value) { return typeof value === 'string' ? sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim() : value; }
function validateClaim(prize, body) {
  const details = Object.fromEntries(Object.entries(body || {}).map(([key, value]) => [key, clean(value)]));
  if (prize.type === 'GIFT_CARD') {
    if (!/^\S+@\S+\.\S+$/.test(details.email || '')) throw new ApiError(422, 'CLAIM_EMAIL_INVALID', 'A valid email address is required.');
    return { email: details.email };
  }
  const required = ['fullName', 'phone', 'address', 'city', 'state', 'pin'];
  if (required.some((field) => !details[field])) throw new ApiError(422, 'CLAIM_DETAILS_REQUIRED', 'All delivery details are required.');
  return Object.fromEntries(required.map((field) => [field, details[field]]));
}

export const submitClaim = asyncHandler(async (request, response) => {
  const giveaway = await getGiveawayOrThrow(request.params.id);
  const winner = await GiveawayWinner.findOne({ giveawayId: giveaway._id, userId: request.user._id }).populate('prizeId');
  if (!winner) throw new ApiError(403, 'NOT_A_WINNER', 'Only the authenticated winner can claim this prize.');
  if (winner.status === 'EXPIRED') throw new ApiError(409, 'CLAIM_EXPIRED', 'The prize claim window has expired.');
  const details = validateClaim(winner.prizeId, request.body);
  const claim = await PrizeClaim.findOneAndUpdate({ winnerId: winner._id }, { winnerId: winner._id, userId: request.user._id, giveawayId: giveaway._id, prizeId: winner.prizeId._id, details, status: 'SUBMITTED', submittedAt: new Date() }, { upsert: true, new: true, setDefaultsOnInsert: true });
  await audit({ actorUserId: request.user._id, userId: request.user._id, giveawayId: giveaway._id, action: 'CLAIM_SUBMITTED', result: 'SUCCESS', requestId: request.id });
  response.status(201).json({ data: { id: claim._id, status: claim.status, submittedAt: claim.submittedAt } });
});

export const getMyClaim = asyncHandler(async (request, response) => {
  const giveaway = await getGiveawayOrThrow(request.params.id);
  const claim = await PrizeClaim.findOne({ giveawayId: giveaway._id, userId: request.user._id }).select('status submittedAt createdAt prizeId');
  response.json({ data: claim });
});
