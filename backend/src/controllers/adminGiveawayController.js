import { GiveawayWinner } from '../models/GiveawayWinner.js';
import { Giveaway } from '../models/Giveaway.js';
import { GiveawayParticipation } from '../models/GiveawayParticipation.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getGiveawayOrThrow, effectiveStatus } from '../services/giveawayService.js';
import { ApiError } from '../utils/ApiError.js';
import { audit } from '../services/auditService.js';

export const selectWinners = asyncHandler(async (request, response) => {
  const giveaway = await getGiveawayOrThrow(request.params.id);
  if (effectiveStatus(giveaway) !== 'ENDED') throw new ApiError(409, 'GIVEAWAY_NOT_ENDED', 'Winners can only be selected after the server-side end time.');
  const selected = [];
  for (const configured of giveaway.prizes) {
    const currentCount = await GiveawayWinner.countDocuments({ giveawayId: giveaway._id, prizeId: configured.prizeId._id });
    const slots = Math.max(0, configured.winnerCount - currentCount);
    if (!slots) continue;
    const participants = await GiveawayParticipation.aggregate([{ $match: { giveawayId: giveaway._id, prizeId: configured.prizeId._id, status: 'RECORDED' } }, { $sample: { size: slots } }]);
    if (participants.length) {
      const winners = await GiveawayWinner.insertMany(participants.map((participant) => ({ giveawayId: giveaway._id, prizeId: configured.prizeId._id, userId: participant.userId, selectionMethod: 'RANDOM_SERVER_SIDE' })), { ordered: false });
      selected.push(...winners);
    }
  }
  await audit({ actorUserId: request.user._id, giveawayId: giveaway._id, action: 'WINNER_SELECTED', result: 'SUCCESS', requestId: request.id, metadata: { count: selected.length } });
  response.status(201).json({ data: { selected: selected.length } });
});

export const archiveGiveaway = asyncHandler(async (request, response) => {
  const giveaway = await Giveaway.findByIdAndUpdate(request.params.id, { status: 'ARCHIVED' }, { new: true });
  if (!giveaway) throw new ApiError(404, 'GIVEAWAY_NOT_FOUND', 'Giveaway not found.');
  response.json({ data: giveaway });
});
