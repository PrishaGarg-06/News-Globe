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
    console.log("Token: ", token)
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token
    console.log("decoded; ", decoded)
    req.user = { id: decoded.userId }; // Attach user ID to request object
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// Route to add a bookmarked article
router.post('/', authenticateToken, async (req, res) => {
  const { articleId, title, url } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found.' });

    const alreadyBookmarked = user.bookmarks.some(
      (bookmark) => bookmark.url === url
    );

    if (alreadyBookmarked) {
      return res.status(200).json({ 
        message: 'Article already bookmarked.',
        isBookmarked: true 
      });
    }

    user.bookmarks.push({ articleId, title, url });
    await user.save();

    res.status(200).json({ 
      message: 'Article bookmarked successfully.',
      isBookmarked: true
    });
  } catch (error) {
    console.error('Error saving bookmark:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select('bookmarks');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.status(200).json(user.bookmarks);
  } catch (error) {
    console.error('Error retrieving bookmarks:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.delete('/', authenticateToken, async (req, res) => {
  const { url } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found.' });

    const bookmarkExists = user.bookmarks.some(bookmark => bookmark.url === url);
    
    if (!bookmarkExists) {
      return res.status(200).json({ 
        message: 'Article was not bookmarked.',
        isBookmarked: false 
      });
    }

    user.bookmarks = user.bookmarks.filter(bookmark => bookmark.url !== url);
    await user.save();

    res.status(200).json({ 
      message: 'Bookmark removed successfully.',
      isBookmarked: false
    });
  } catch (error) {
    console.error('Error removing bookmark:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
