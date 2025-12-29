const authenticate = async (req, res, next) => {
  try {
    // Check if Firebase Admin is available
    const admin = require('firebase-admin');
    
    if (!admin.apps.length) {
      // Firebase not initialized, skip auth for development
      console.warn('⚠️  Authentication skipped - Firebase not configured');
      req.user = { uid: 'dev-user-123' }; // Mock user for development
      return next();
    }

    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    
    // For development, allow requests to pass through
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  Authentication error - allowing for development');
      req.user = { uid: 'dev-user-123' };
      return next();
    }
    
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticate;