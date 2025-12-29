const User = require('../models/User');

// Get or create user
exports.getOrCreateUser = async (req, res) => {
  try {
    const { firebaseUid, email, displayName, photoURL } = req.body;

    let user = await User.findOne({ firebaseUid });

    if (!user) {
      user = new User({
        firebaseUid,
        email,
        displayName,
        photoURL
      });
      await user.save();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};