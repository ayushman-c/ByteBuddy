require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const socketIO = require('socket.io');
const connectDB = require('./config/db');
const setupSocket = require('./socket/chat');

// Initialize Express
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIO(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Connect to MongoDB
connectDB();

// Initialize Firebase Admin (FIXED VERSION)
let firebaseInitialized = false;

// Only initialize if we have VALID credentials
if (process.env.FIREBASE_PROJECT_ID && 
    process.env.FIREBASE_PRIVATE_KEY && 
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY.includes('BEGIN PRIVATE KEY')) {
  
  try {
    const admin = require('firebase-admin');
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL
      })
    });
    firebaseInitialized = true;
    console.log('✅ Firebase Admin initialized');
  } catch (error) {
    console.error('❌ Firebase Admin initialization failed:', error.message);
  }
} else {
  console.warn('⚠️  Firebase Admin not initialized - running without authentication');
  console.warn('   The app will work but user authentication will be disabled');
}

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/gigs', require('./routes/gigs'));
app.use('/api/users', require('./routes/users'));
app.use('/api/gemini', require('./routes/gemini'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ByteBuddy API is running',
    firebase: firebaseInitialized ? 'connected' : 'disabled',
    timestamp: new Date().toISOString()
  });
});

// Setup Socket.io
setupSocket(io);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server (only in development)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 API URL: http://localhost:${PORT}/api`);
  });
}

// Export for Vercel serverless
module.exports = app;