const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: Number,
  type: String,
  category: String,
  date: Date
});

module.exports = mongoose.model('Transaction', transactionSchema);
