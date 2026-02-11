import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, default: 'Invited' }
}, { timestamps: true });

export default mongoose.model('Guest', guestSchema);
