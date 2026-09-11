import mongoose from 'mongoose';

const prizeClaimSchema = new mongoose.Schema({
  winnerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'GiveawayWinner', unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  giveawayId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Giveaway' },
  prizeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Prize' },
  status: { type: String, enum: ['NOT_SUBMITTED', 'SUBMITTED', 'PROCESSING', 'COMPLETED', 'EXPIRED'], default: 'NOT_SUBMITTED' },
  details: { type: mongoose.Schema.Types.Mixed, select: false },
  submittedAt: Date,
}, { timestamps: true });

export const PrizeClaim = mongoose.model('PrizeClaim', prizeClaimSchema);
