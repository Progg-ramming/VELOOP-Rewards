import { GiveawayParticipation } from '../models/GiveawayParticipation.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getGiveawayOrThrow } from '../services/giveawayService.js';
import { joinGiveaway } from '../services/participationService.js';
import { requireIdempotencyKey } from '../utils/idempotency.js';

export const getMyStatus = asyncHandler(async (request, response) => {
  const giveaway = await getGiveawayOrThrow(request.params.id);
  const participation = await GiveawayParticipation.findOne({ giveawayId: giveaway._id, userId: request.user._id }).populate('prizeId', 'name slug type claimType');
  response.json({ data: { participated: Boolean(participation), participation } });
});

export const join = asyncHandler(async (request, response) => {
  const giveaway = await getGiveawayOrThrow(request.params.id);
  const result = await joinGiveaway({ giveaway, user: request.user, request, requestedPrizeId: request.body?.prizeId, idempotencyKey: requireIdempotencyKey(request) });
  response.status(result.idempotent ? 200 : 201).json({ data: result });
});
