const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Get all members (Librarian/Admin only)
router.get('/', auth, role(['admin', 'librarian']), async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new member (Librarian/Admin only)
router.post('/', auth, role(['admin', 'librarian']), async (req, res) => {
  const member = new Member({
    name: req.body.name,
    email: req.body.email,
    membershipId: req.body.membershipId,
    joinedDate: req.body.joinedDate || new Date(),
    fineBalance: req.body.fineBalance || 0
  });
  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
