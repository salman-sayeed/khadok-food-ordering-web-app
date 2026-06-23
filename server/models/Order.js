const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  food:     { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  customer:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:         [orderItemSchema],
  totalAmount:   { type: Number, required: true },
  status:        { type: String, enum: ['pending', 'preparing', 'delivered', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  paymentId:     { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Khadokorder', orderSchema);