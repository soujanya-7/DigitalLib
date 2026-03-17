require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  credentials: true
}));
app.use(express.json());

app.use('/api/books', require('./routes/books'));
app.use('/api/members', require('./routes/members'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/auth', require('./routes/auth'));

require('./jobs/fineCalculation');

app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/digital_library';
process.on('unhandledRejection', (reason, promise) => {
  console.error('CRITICAL UNHANDLED REJECTION:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('CRITICAL UNCAUGHT EXCEPTION:', err);
});
app.listen(PORT, () => {
  console.log(`[V3.0] ATHENA BACKEND STARTING ON PORT ${PORT}`);
  
  mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => {
      console.error('CRITICAL: MongoDB connection error:', err);
      process.exit(1);
    });
});
