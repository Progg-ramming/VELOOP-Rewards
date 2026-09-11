import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  idempotencyKey: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  giveawayId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Giveaway' },
  prizeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Prize' },
  currency: { type: String, enum: ['VEs', 'SVEs', 'Tokens'], required: true },
  amount: { type: Number, required: true, min: 1 },
  type: { type: String, enum: ['ENTRY_FEE'], default: 'ENTRY_FEE' },
  status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED', 'REVERSED'], default: 'PENDING' },
  balanceBefore: { type: Number, required: true },
  balanceAfter: { type: Number, required: true },
}, { timestamps: true });

transactionSchema.index({ userId: 1, giveawayId: 1 });

export const GiveawayEntryTransaction = mongoose.model('GiveawayEntryTransaction', transactionSchema);
