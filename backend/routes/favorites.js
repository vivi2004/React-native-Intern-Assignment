const express = require('express');
const User = require('../models/User');
const Model = require('../models/Model');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/favorites
// @desc    Get user's favorites
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/favorites/:modelId
// @desc    Add model to favorites
// @access  Private
router.post('/:modelId', auth, async (req, res) => {
  try {
    const model = await Model.findById(req.params.modelId);
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }

    const user = await User.findById(req.user._id);
    if (user.favorites.includes(req.params.modelId)) {
      return res.status(400).json({ message: 'Model already in favorites' });
    }

    user.favorites.push(req.params.modelId);
    await user.save();

    res.json({ message: 'Model added to favorites', favorites: user.favorites });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/favorites/:modelId
// @desc    Remove model from favorites
// @access  Private
router.delete('/:modelId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(
      (fav) => fav.toString() !== req.params.modelId
    );
    await user.save();

    res.json({ message: 'Model removed from favorites', favorites: user.favorites });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/favorites/check/:modelId
// @desc    Check if model is in favorites
// @access  Private
router.get('/check/:modelId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const isFavorite = user.favorites.some(
      (fav) => fav.toString() === req.params.modelId
    );
    res.json({ isFavorite });
  } catch (error) {
    console.error('Check favorite error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

