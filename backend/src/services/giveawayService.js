import { Giveaway } from '../models/Giveaway.js';
import { Prize } from '../models/Prize.js';
import { ApiError } from '../utils/ApiError.js';
import mongoose from 'mongoose';

export function effectiveStatus(giveaway, now = new Date()) {
  if (giveaway.status === 'ARCHIVED') return 'ARCHIVED';
  if (now < giveaway.startAt) return 'UPCOMING';
  if (now >= giveaway.endAt) return 'ENDED';
  return 'ACTIVE';
}

export async function getGiveawayOrThrow(idOrSlug) {
  const query = mongoose.isValidObjectId(idOrSlug) ? { $or: [{ _id: idOrSlug }, { slug: idOrSlug }] } : { slug: idOrSlug };
  const giveaway = await Giveaway.findOne(query).populate('prizes.prizeId');
  if (!giveaway) throw new ApiError(404, 'GIVEAWAY_NOT_FOUND', 'Giveaway not found.');
  return giveaway;
}

export function publicGiveaway(giveaway) {
  const item = giveaway.toObject ? giveaway.toObject() : giveaway;
  return { ...item, status: effectiveStatus(giveaway), prizes: item.prizes.map((item) => ({ ...item, prizeId: item.prizeId })) };
}

export async function getPrizeForParticipation(giveaway, prizeId) {
  const configured = giveaway.prizes.find((item) => item.prizeId._id.toString() === prizeId || item.prizeId.id === prizeId || item.prizeId.slug === prizeId);
  if (!configured) throw new ApiError(400, 'PRIZE_NOT_IN_GIVEAWAY', 'The selected prize is not configured for this giveaway.');
  return configured.prizeId;
}
