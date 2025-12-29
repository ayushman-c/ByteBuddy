const express = require('express');
const router = express.Router();
const { improveDescription } = require('../services/gemini');
const authenticate = require('../middleware/auth');

router.post('/improve-description', authenticate, async (req, res) => {
  try {
    const { description } = req.body;
    const improved = await improveDescription(description);
    res.json({ improved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;