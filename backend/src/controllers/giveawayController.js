import { Giveaway } from '../models/Giveaway.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getGiveawayOrThrow, publicGiveaway } from '../services/giveawayService.js';

export const getCurrentGiveaway = asyncHandler(async (request, response) => {
  const giveaway = await Giveaway.findOne({ status: { $ne: 'ARCHIVED' } }).sort({ startAt: -1 }).populate('prizes.prizeId');
  response.json({ data: giveaway ? publicGiveaway(giveaway) : null });
});

export const getGiveaway = asyncHandler(async (request, response) => {
  const giveaway = await getGiveawayOrThrow(request.params.id);
  response.json({ data: publicGiveaway(giveaway) });
});

export const getPreviousGiveaways = asyncHandler(async (request, response) => {
  const giveaways = await Giveaway.find({ status: { $in: ['ENDED', 'ARCHIVED'] } }).sort({ endAt: -1 }).populate('prizes.prizeId');
  response.json({ data: giveaways.map(publicGiveaway) });
});
