require('dotenv').config();
const mongoose = require('mongoose');
const Model = require('../models/Model');

// Sample 3D model data
// Note: Replace these URLs with actual hosted 3D model URLs
const sampleModels = [
  {
    name: 'Modern Chair',
    category: 'Furniture',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Chair/glTF-Binary/Chair.glb',
    thumbnail: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
    description: 'A modern comfortable chair',
    scale: 1.0,
  },
  {
    name: 'Coffee Table',
    category: 'Furniture',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb',
    thumbnail: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400',
    description: 'Stylish coffee table',
    scale: 1.0,
  },
  {
    name: 'Lamp',
    category: 'Home Decor',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb',
    thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    description: 'Decorative lamp',
    scale: 1.0,
  },
  {
    name: 'Robot Toy',
    category: 'Toys',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RobotExpressive/glTF-Binary/RobotExpressive.glb',
    thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400',
    description: 'Expressive robot toy',
    scale: 0.5,
  },
  {
    name: 'Smartphone',
    category: 'Electronics',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    description: 'Latest smartphone model',
    scale: 0.3,
  },
];

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ar-product-preview');
    console.log('Connected to MongoDB');

    // Clear existing models
    await Model.deleteMany({});
    console.log('Cleared existing models');

    // Insert sample models
    const inserted = await Model.insertMany(sampleModels);
    console.log(`Inserted ${inserted.length} sample models`);

    console.log('\nSample models created:');
    inserted.forEach((model) => {
      console.log(`- ${model.name} (${model.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();

