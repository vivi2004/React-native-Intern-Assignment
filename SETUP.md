# Setup Guide

This guide will help you set up and run the AR Product Preview application.

## Prerequisites

- Node.js >= 18
- MongoDB (installed and running)
- React Native development environment
- Android Studio (for Android) or Xcode (for iOS)
- ARCore-enabled Android device or ARKit-enabled iOS device

## Step 1: Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Edit `.env` and set:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ar-product-preview
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

5. Start MongoDB:
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or use your preferred method
```

6. Start the backend server:
```bash
npm run dev
```

7. (Optional) Seed sample data:
```bash
npm run seed
```

The backend will run on `http://localhost:3000`

## Step 2: Frontend Setup

1. Navigate to the React Native app directory:
```bash
cd ARProductPreview
```

2. Install dependencies:
```bash
npm install
```

3. For iOS, install CocoaPods:
```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

4. Configure API URL:
   - Edit `src/config/api.ts`
   - For Android emulator: Already set to `http://10.0.2.2:3000/api`
   - For iOS simulator: Already set to `http://localhost:3000/api`
   - For physical devices: Replace with your computer's IP address (e.g., `http://192.168.1.XXX:3000/api`)

5. Start Metro bundler:
```bash
npm start
```

6. In a new terminal, run the app:
```bash
# Android
npm run android

# iOS
npm run ios
```

## Step 3: Testing

1. **Register a new account** or login
2. **Browse products** in the catalog
3. **Tap a product** to view it in AR
4. **Point camera** at a flat surface (floor/table)
5. **Tap to place** the model
6. **Interact with the model**:
   - Pinch to scale
   - Rotate with two fingers
   - Drag to move

## Troubleshooting

### Backend Issues

- **MongoDB not connecting**: Ensure MongoDB is running
- **Port already in use**: Change PORT in `.env` file
- **CORS errors**: Check that CORS is enabled in `server.js`

### Frontend Issues

- **API connection failed**: 
  - Verify backend is running
  - Check API URL in `src/config/api.ts`
  - For Android emulator, use `10.0.2.2` instead of `localhost`
  - For physical devices, ensure same network and use computer's IP

- **AR not working**:
  - Use a physical device (ARCore/ARKit required)
  - Check camera permissions
  - Ensure device supports AR

- **Model not loading**:
  - Verify model URL is accessible
  - Check model format (supports .glb, .gltf, .obj)
  - Check console for errors

### Common Errors

- **"Network request failed"**: Backend not running or wrong API URL
- **"Token is not valid"**: Logout and login again
- **"Model load error"**: Invalid model URL or format

## Next Steps

- Add your own 3D models to the database
- Customize the UI
- Deploy backend to a cloud service
- Build production APK/IPA

