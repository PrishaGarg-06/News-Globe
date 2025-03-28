const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
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

// Route to toggle bookmark status
router.post('/', authenticateToken, async (req, res) => {
  const { articleId, url } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Find if article is already bookmarked
    const bookmarkIndex = user.bookmarks.findIndex(
      (bookmark) => bookmark.url === url
    );

    let isBookmarked = false;

    if (bookmarkIndex === -1) {
      // Add bookmark if not exists
      user.bookmarks.push({ articleId, url });
      isBookmarked = true;
    } else {
      // Remove bookmark if exists
      user.bookmarks.splice(bookmarkIndex, 1);
      isBookmarked = false;
    }

    await user.save();

    res.status(200).json({ 
      message: isBookmarked ? 'Article bookmarked successfully.' : 'Article unbookmarked successfully.',
      isBookmarked 
    });
  } catch (error) {
    console.error('Error updating bookmark:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Route to retrieve bookmarked articles
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select('bookmarks');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Return array of bookmarked URLs with their status
    const bookmarks = user.bookmarks.map(bookmark => ({
      url: bookmark.url,
      isBookmarked: true
    }));

    res.status(200).json(bookmarks);
  } catch (error) {
    console.error('Error retrieving bookmarks:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Route to delete a bookmark
router.delete('/', authenticateToken, async (req, res) => {
  const { url } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Remove the bookmark
    const bookmarkIndex = user.bookmarks.findIndex(
      (bookmark) => bookmark.url === url
    );

    if (bookmarkIndex === -1) {
      return res.status(404).json({ 
        message: 'Bookmark not found.',
        isBookmarked: false 
      });
    }

    user.bookmarks.splice(bookmarkIndex, 1);
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