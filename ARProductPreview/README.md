# AR Product Preview App

A React Native application that allows users to preview 3D products in augmented reality. Users can browse products from a backend API, place them in their real environment using AR, and interact with them using gestures.

## Features

- **Augmented Reality Product Preview**: Place 3D models in real-world environments using ARCore (Android) and ARKit (iOS)
- **Dynamic Model Loading**: Fetch 3D models from a backend API (not hardcoded)
- **Touch Controls**: 
  - Pinch to scale models
  - Rotate with two fingers
  - Drag to move/reposition models
- **User Authentication**: JWT-based login/signup system
- **Favorites**: Save and manage favorite products
- **Product Catalog**: Browse products by category

## Tech Stack

### Frontend
- React Native 0.77.1
- ViroReact (@viro-community/react-viro) for AR functionality
- React Navigation for routing
- AsyncStorage for token persistence
- Axios for API calls

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- JWT for authentication
- RESTful API

## Prerequisites

- Node.js >= 18
- MongoDB installed and running
- React Native development environment set up
- Android Studio (for Android) or Xcode (for iOS)
- ARCore-enabled Android device/emulator or ARKit-enabled iOS device

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ar-product-preview
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

5. Start MongoDB (if not running):
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or use your preferred method
```

6. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the React Native app directory:
```bash
cd ARProductPreview
```

2. Install dependencies:
```bash
npm install
```

3. For iOS, install CocoaPods dependencies:
```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

4. Update API configuration:
   - Edit `src/config/api.ts` to point to your backend URL
   - For Android emulator, use `http://10.0.2.2:3000/api` instead of `localhost`
   - For iOS simulator, use `http://localhost:3000/api`
   - For physical devices, use your computer's IP address

5. Start Metro bundler:
```bash
npm start
```

6. Run the app:
```bash
# Android
npm run android

# iOS
npm run ios
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Models
- `GET /api/models` - Get all models (optional query: `?category=categoryName`)
- `GET /api/models/:id` - Get single model
- `POST /api/models` - Create a new model (Protected)
- `PUT /api/models/:id` - Update a model (Protected)
- `DELETE /api/models/:id` - Delete a model (Protected)

### Favorites
- `GET /api/favorites` - Get user's favorites (Protected)
- `POST /api/favorites/:modelId` - Add model to favorites (Protected)
- `DELETE /api/favorites/:modelId` - Remove model from favorites (Protected)
- `GET /api/favorites/check/:modelId` - Check if model is favorite (Protected)

## Adding Sample Data

You can add sample 3D models to the database using the API. Example:

```bash
curl -X POST http://localhost:3000/api/models \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Modern Chair",
    "category": "Furniture",
    "modelUrl": "https://example.com/models/chair.glb",
    "thumbnail": "https://example.com/thumbnails/chair.jpg",
    "description": "A modern comfortable chair"
  }'
```

**Note**: You'll need to host your 3D model files (.glb, .gltf, or .obj format) and provide URLs to them. Free hosting options include:
- GitHub (for public repos)
- AWS S3
- Firebase Storage
- Any CDN

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Products**: View available products in the catalog
3. **View in AR**: Tap on a product to open it in AR mode
4. **Place Model**: Point your camera at a flat surface (floor/table) and tap to place
5. **Interact**: 
   - Pinch to scale
   - Rotate with two fingers
   - Drag to move
6. **Add to Favorites**: Tap the favorite button to save products

## Troubleshooting

### AR Not Working
- Ensure you're using an ARCore-enabled Android device (API 24+) or ARKit-enabled iOS device (iPhone 6s or later)
- Check camera permissions are granted
- For Android emulator, ARCore may not work - use a physical device

### API Connection Issues
- Verify backend server is running
- Check API URL in `src/config/api.ts`
- For Android emulator, use `10.0.2.2` instead of `localhost`
- For physical devices, ensure device and computer are on the same network

### Model Loading Issues
- Verify model URLs are accessible
- Ensure models are in supported formats (.glb, .gltf, .obj)
- Check CORS settings if hosting models on a different domain

## Development Notes

- ViroReact requires native code compilation
- AR features only work on physical devices (not all emulators/simulators)
- Ensure proper camera permissions are set in both Android and iOS

## License

This project is for educational/demonstration purposes.
