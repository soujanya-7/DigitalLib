require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(async () => {
    console.log('Connected to MongoDB to drop index...');
    
    try {
      const collection = mongoose.connection.collection('books');
      
      // List indexes to confirm
      const indexes = await collection.indexes();
      console.log('Current indexes in books collection:', indexes.map(i => i.name));
      
      if (indexes.find(i => i.name === 'isbn_1')) {
        console.log('Dropping isbn_1 index...');
        await collection.dropIndex('isbn_1');
        console.log('SUCCESS: isbn_1 index dropped.');
      } else {
        console.log('isbn_1 index not found. It might have been dropped already or named differently.');
      }
      
    } catch (error) {
      console.error('Error while dropping index:', error.message);
    } finally {
      process.exit(0);
    }
  })
  .catch(err => {
    console.error('Connection failed:', err);
    process.exit(1);
  });
