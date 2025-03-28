const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  console.log('\n--- Auth Middleware ---');
  console.log('Headers:', req.headers);
  
  const authHeader = req.headers['authorization'];
  console.log('Auth header:', authHeader);
  
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Extracted token:', token ? 'exists' : 'missing');

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = decoded;
    console.log('User set on request:', req.user);
    next();
  } catch (error) {
    console.error('Token verification error:', {
      error,
      message: error.message,
      stack: error.stack
    });
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
  console.log('--- End Auth Middleware ---\n');
};

module.exports = authenticateToken;
