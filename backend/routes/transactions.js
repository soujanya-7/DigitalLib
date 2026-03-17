const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const Member = require('../models/Member');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Issue book (Librarian/Admin only)
router.post('/issue', auth, role(['admin', 'librarian']), async (req, res) => {
  const { bookId, memberId, days } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.availableCopies < 1) return res.status(400).json({ message: 'No copies available' });
    
    book.availableCopies -= 1;
    await book.save();

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (days || 14)); // default 14 days
    
    const transaction = new Transaction({
      bookId: bookId,
      memberId: memberId,
      dueDate
    });
    
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Return book (Librarian/Admin only)
router.post('/return/:id', auth, role(['admin', 'librarian']), async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    if (transaction.status === 'returned') return res.status(400).json({ message: 'Book already returned' });

    transaction.status = 'returned';
    transaction.returnDate = new Date();
    
    const book = await Book.findById(transaction.bookId);
    book.availableCopies += 1;
    await book.save();
    await transaction.save();

    res.json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all transactions (Authenticated users)
router.get('/', auth, async (req, res) => {
    try {
        const trs = await Transaction.find().populate('bookId').populate('memberId');
        res.json(trs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
