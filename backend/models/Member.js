const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  membershipId: { type: String, required: true, unique: true },
  joinedDate: { type: Date, default: Date.now },
  fineBalance: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
