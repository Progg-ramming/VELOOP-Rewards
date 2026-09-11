import mongoose from 'mongoose';

const participationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  giveawayId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Giveaway' },
  prizeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Prize' },
  deviceHash: { type: String, required: true },
  status: { type: String, enum: ['RECORDED', 'FLAGGED', 'BLOCKED', 'CANCELLED'], default: 'RECORDED' },
  riskScore: { type: Number, min: 0, max: 100, default: 0 },
  joinedAt: { type: Date, default: Date.now },
}, { timestamps: true });

participationSchema.index({ userId: 1, giveawayId: 1 }, { unique: true });
participationSchema.index({ deviceHash: 1, giveawayId: 1 });

export const GiveawayParticipation = mongoose.model('GiveawayParticipation', participationSchema);
