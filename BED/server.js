const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Import routes
const authRouter = require('./routes/auth');
const newsRouter = require('./routes/news');
const bookmarksRouter = require('./routes/bookmarks');

app.use('/api/auth', authRouter);
app.use('/api/news', newsRouter);
app.use('/api/bookmarks', bookmarksRouter);


require('./db');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ message: `Cannot ${req.method} ${req.url}` });
}); 