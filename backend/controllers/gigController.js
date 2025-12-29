const Gig = require('../models/Gig');
const User = require('../models/User');

// Get all gigs
exports.getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().sort({ createdAt: -1 });
    res.json(gigs);
  } catch (error) {
    console.error('Get all gigs error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's gigs
exports.getUserGigs = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const gigs = await Gig.find({ userId: user._id }).sort({ createdAt: -1 });
    res.json(gigs);
  } catch (error) {
    console.error('Get user gigs error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create gig
exports.createGig = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    
    // Validate required fields
    if (!title || !description || price === undefined || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Ensure price is a number
    const priceNum = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(priceNum) || priceNum < 0) {
      return res.status(400).json({ message: 'Price must be a valid positive number' });
    }

    const user = await User.findOne({ firebaseUid: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const gig = new Gig({
      title,
      description,
      price: priceNum,
      category,
      userId: user._id,
      userName: user.displayName
    });

    const savedGig = await gig.save();
    res.status(201).json(savedGig);
  } catch (error) {
    console.error('Create gig error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete gig
exports.deleteGig = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Gig.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gig deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};