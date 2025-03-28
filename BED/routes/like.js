const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: 'No token provided. Unauthorized.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// Router-based Middleware
router.post('/', authenticateToken, async (req, res) => {
    const { articleId, title, url } = req.body;
    const userId = req.user.id;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Check if the article is already liked
      if (!user.likedArticles.some((article) => article.articleId === articleId)) {
        user.likedArticles.push({ articleId,title, url });
        await user.save();
      }
  
      res.status(200).json({ message: 'Article liked successfully' });
    } catch (error) {
      console.error('Error liking article:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
 
  
  module.exports = router;