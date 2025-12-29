const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/auth');

router.post('/auth', userController.getOrCreateUser);
router.get('/profile', authenticate, userController.getUserProfile);

module.exports = router;