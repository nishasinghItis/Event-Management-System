import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'UPI'], required: true },
  status: { type: String, enum: ['Received', 'Ready for Shipping', 'Out for Delivery', 'Delivered'], default: 'Received' },
  shippingAddress: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
