import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  actorUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  giveawayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Giveaway' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  currency: String,
  result: { type: String, required: true },
  requestId: String,
  ipHash: String,
  metadata: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
