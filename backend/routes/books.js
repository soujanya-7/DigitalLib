const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Get all books or search (Any logged in user)
router.get('/', auth, async (req, res) => {
  try {
    const { q } = req.query;
    let books;
    if (q) {
      books = await Book.find({ $text: { $search: q } }).sort({ score: { $meta: "textScore" } });
    } else {
      books = await Book.find();
    }
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new book (Librarian/Admin only)
router.post('/', auth, role(['admin', 'librarian']), async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    totalCopies: req.body.totalCopies || 0,
    availableCopies: req.body.availableCopies || req.body.totalCopies || 0
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Reservation logic removed to match the provided schema

module.exports = router;
