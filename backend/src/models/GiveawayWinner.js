import mongoose from 'mongoose';

const winnerSchema = new mongoose.Schema({
  giveawayId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Giveaway' },
  prizeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Prize' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  selectionMethod: { type: String, enum: ['RANDOM_SERVER_SIDE', 'ADMIN_OVERRIDE'], required: true },
  selectedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['WINNER', 'CLAIMED', 'EXPIRED'], default: 'WINNER' },
}, { timestamps: true });

winnerSchema.index({ giveawayId: 1, prizeId: 1, userId: 1 }, { unique: true });
export const GiveawayWinner = mongoose.model('GiveawayWinner', winnerSchema);
