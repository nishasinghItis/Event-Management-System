import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
  membershipNumber: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  duration: { type: String, enum: ['6 months', '1 year', '2 years'], required: true },
  startDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('Membership', membershipSchema);
