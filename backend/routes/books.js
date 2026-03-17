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
    isbn: req.body.isbn,
    totalCopies: req.body.totalCopies || 1,
    availableCopies: req.body.totalCopies || 1
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Reserve a book (Any logged in user)
router.post('/:id/reserve', auth, async (req, res) => {
  try {
    const { memberId } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (!book.reservationQueue.includes(memberId)) {
       book.reservationQueue.push(memberId);
       await book.save();
    }
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
