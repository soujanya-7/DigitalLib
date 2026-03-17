const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  availableCopies: { type: Number, required: true, default: 0 },
  totalCopies: { type: Number, required: true, default: 0 }
}, { timestamps: true });

bookSchema.index({ title: 'text', author: 'text', category: 'text' });

module.exports = mongoose.model('Book', bookSchema);
