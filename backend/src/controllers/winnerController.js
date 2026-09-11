import { GiveawayWinner } from '../models/GiveawayWinner.js';
import { Giveaway } from '../models/Giveaway.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getGiveawayOrThrow } from '../services/giveawayService.js';

function publicWinner(winner) { return { id: winner._id, giveawayId: winner.giveawayId, prize: winner.prizeId?.name, prizeId: winner.prizeId?._id, displayId: winner.userId?.externalId ? `${winner.userId.externalId.slice(0, 2)}••••${winner.userId.externalId.slice(-2)}` : 'VELOOP member', status: winner.status, selectedAt: winner.selectedAt }; }

export const getWinners = asyncHandler(async (request, response) => {
  const giveaway = await getGiveawayOrThrow(request.params.id);
  const winners = await GiveawayWinner.find({ giveawayId: giveaway._id }).populate('prizeId', 'name').populate('userId', 'externalId');
  response.json({ data: winners.map(publicWinner) });
});

export const getPreviousWinners = asyncHandler(async (request, response) => {
  const giveaways = await Giveaway.find({ status: { $in: ['ENDED', 'ARCHIVED'] } }).select('_id title endAt');
  const winners = await GiveawayWinner.find({ giveawayId: { $in: giveaways.map((item) => item._id) } }).populate('prizeId', 'name type').populate('userId', 'externalId');
  response.json({ data: winners.map(publicWinner) });
});
