import mongoose from 'mongoose';

const balanceSchema = new mongoose.Schema({
  VEs: { type: Number, default: 0, min: 0 },
  SVEs: { type: Number, default: 0, min: 0 },
  Tokens: { type: Number, default: 0, min: 0 },
}, { _id: false });

const userSchema = new mongoose.Schema({
  externalId: { type: String, required: true, unique: true, index: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  accountCreatedAt: { type: Date, default: Date.now },
  balances: { type: balanceSchema, default: () => ({}) },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
