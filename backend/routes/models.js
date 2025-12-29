const express = require('express');
const { body, validationResult } = require('express-validator');
const Model = require('../models/Model');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/models
// @desc    Get all models
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const models = await Model.find(query).sort({ createdAt: -1 });
    res.json(models);
  } catch (error) {
    console.error('Get models error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/models/:id
// @desc    Get single model
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.json(model);
  } catch (error) {
    console.error('Get model error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/models
// @desc    Create a new model
// @access  Private (Admin - for demo purposes, we'll allow authenticated users)
router.post(
  '/',
  auth,
  [
    body('name').trim().notEmpty(),
    body('category').trim().notEmpty(),
    body('modelUrl').isURL(),
    body('thumbnail').isURL(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const model = new Model(req.body);
      await model.save();
      res.status(201).json(model);
    } catch (error) {
      console.error('Create model error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT /api/models/:id
// @desc    Update a model
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const model = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.json(model);
  } catch (error) {
    console.error('Update model error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/models/:id
// @desc    Delete a model
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const model = await Model.findByIdAndDelete(req.params.id);
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.json({ message: 'Model deleted successfully' });
  } catch (error) {
    console.error('Delete model error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

