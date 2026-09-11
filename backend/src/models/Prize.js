import mongoose from 'mongoose';

const prizeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, enum: ['PHYSICAL', 'GIFT_CARD', 'DIGITAL'], required: true },
  claimType: { type: String, enum: ['DELIVERY_DETAILS', 'EMAIL', 'ACCOUNT_EMAIL'], required: true },
  winnerCount: { type: Number, required: true, min: 1 },
  entry: {
    currency: { type: String, enum: ['VEs', 'SVEs', 'Tokens'], required: true },
    amount: { type: Number, required: true, min: 1 },
  },
  valueLabel: String,
}, { timestamps: true });

export const Prize = mongoose.model('Prize', prizeSchema);
