const express = require('express');
const router = express.Router();
const gigController = require('../controllers/gigController');
const authenticate = require('../middleware/auth');

router.get('/', gigController.getAllGigs);
router.get('/my-gigs', authenticate, gigController.getUserGigs);
router.post('/', authenticate, gigController.createGig);
router.delete('/:id', authenticate, gigController.deleteGig);

module.exports = router;