import mongoose from 'mongoose';

const giveawayPrizeSchema = new mongoose.Schema({
  prizeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Prize' },
  winnerCount: { type: Number, required: true, min: 1 },
  sortOrder: { type: Number, default: 0 },
}, { _id: false });

const giveawaySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['UPCOMING', 'ACTIVE', 'ENDED', 'ARCHIVED'], default: 'UPCOMING', index: true },
  startAt: { type: Date, required: true, index: true },
  endAt: { type: Date, required: true, index: true },
  rules: [{ type: String }],
  eligibility: { type: String, required: true },
  prizes: { type: [giveawayPrizeSchema], default: [] },
  participationSettings: {
    oneParticipationPerUser: { type: Boolean, default: true },
    allowAdditionalEntries: { type: Boolean, default: false },
  },
}, { timestamps: true });

giveawaySchema.index({ status: 1, startAt: 1, endAt: 1 });

export const Giveaway = mongoose.model('Giveaway', giveawaySchema);
