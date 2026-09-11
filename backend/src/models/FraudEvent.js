import mongoose from 'mongoose';

const fraudEventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  giveawayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Giveaway' },
  deviceHash: String,
  riskScore: { type: Number, min: 0, max: 100, required: true },
  reason: { type: String, required: true },
  signals: { type: [String], default: [] },
  action: { type: String, enum: ['FLAGGED', 'BLOCKED', 'REVIEW'], required: true },
}, { timestamps: true });

export const FraudEvent = mongoose.model('FraudEvent', fraudEventSchema);
