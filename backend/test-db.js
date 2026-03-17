require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

console.log('Testing connection to:', uri.replace(/:([^@]+)@/, ':****@')); // Mask password

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log('SUCCESS: Connected to MongoDB Atlas!');
  process.exit(0);
})
.catch(err => {
  console.error('FAILURE: Could not connect to MongoDB Atlas.');
  console.error('Error Name:', err.name);
  console.error('Error Message:', err.message);
  if (err.reason) {
    console.error('Reason:', JSON.stringify(err.reason, null, 2));
  }
  process.exit(1);
});
