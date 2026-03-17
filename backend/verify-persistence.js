require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Member = require('./models/Member');

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(async () => {
    console.log('Connected to MongoDB for verification...');

    // 1. Add a test book
    const testBook = new Book({
      title: "The Art of Coding",
      author: "Antigravity",
      category: "Technology",
      availableCopies: 5,
      totalCopies: 5
    });
    
    const savedBook = await testBook.save();
    console.log('SUCCESS: Book added to MongoDB:', savedBook._id);

    // 2. Add a test member
    const testMember = new Member({
      name: "John Doe",
      email: `john.doe.${Date.now()}@example.com`,
      membershipId: `MEM-${Date.now()}`
    });

    const savedMember = await testMember.save();
    console.log('SUCCESS: Member added to MongoDB:', savedMember._id);

    // 3. Cleanup (optional, but let's keep them for the user to see in Atlas)
    console.log('Verification records kept in DB for manual inspection.');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Persistence Verification Failed:', err);
    process.exit(1);
  });
